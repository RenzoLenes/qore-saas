import { NextRequest, NextResponse, after } from 'next/server';
import * as React from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { resend } from '@/lib/resend';
import { waitlistSchema } from '@/lib/validations';
import { LeadConfirmationEmail } from '@/lib/email-templates/lead-confirmation';
import { TeamNotificationEmail } from '@/lib/email-templates/team-notification';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit: 5 requests per minute per IP
  const limited = rateLimit(request, { max: 5, windowSec: 60 });
  if (limited) return limited;

  try {
    // 1. Parse and validate request body
    const body = await request.json();
    const validatedData = waitlistSchema.parse(body);

    // 2. Insert lead into Supabase
    const { data: lead, error: dbError } = await supabaseAdmin
      .from('waitlist_leads')
      .insert({
        email: validatedData.email,
        company_name: validatedData.company_name,
        company_size: validatedData.company_size,
        industry: validatedData.industry || null,
        contact_consent: validatedData.contact_consent,
        status: 'new',
        source: 'landing',
      })
      .select()
      .single();

    if (dbError) {
      // Handle duplicate email error
      if (dbError.code === '23505') {
        return NextResponse.json(
          {
            error: 'Ya existe una solicitud con este email. Te contactaremos pronto.',
            code: 'DUPLICATE_EMAIL'
          },
          { status: 409 }
        );
      }

      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Error al guardar la información. Por favor intenta nuevamente.' },
        { status: 500 }
      );
    }

    // 3. Send emails non-blocking using after()
    after(async () => {
      await Promise.allSettled([
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: validatedData.email,
          subject: '¡Gracias por tu interés en QORE!',
          react: React.createElement(LeadConfirmationEmail, {
            companyName: validatedData.company_name,
          }),
        }).catch((error) => {
          console.error('Failed to send lead confirmation email:', error);
        }),
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: process.env.RESEND_TEAM_EMAIL!,
          subject: `Nuevo Lead: ${validatedData.company_name} Tamaño (${validatedData.company_size})`,
          react: React.createElement(TeamNotificationEmail, {
            ...validatedData,
            submittedAt: lead.created_at,
          }),
        }).catch((error) => {
          console.error('Failed to send team notification email:', error);
        }),
      ]);
    });

    // 4. Return success response immediately
    return NextResponse.json(
      {
        success: true,
        message: 'Tu solicitud ha sido recibida. Te contactaremos pronto.',
      },
      { status: 201 }
    );

  } catch (error) {
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Datos inválidos. Por favor verifica los campos.',
          details: error,
        },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    console.error('Unexpected error in waitlist API:', error);
    return NextResponse.json(
      { error: 'Error inesperado. Por favor intenta nuevamente.' },
      { status: 500 }
    );
  }
}
