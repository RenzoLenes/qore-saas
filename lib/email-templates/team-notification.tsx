import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
} from '@react-email/components';
import * as React from 'react';
import type { WaitlistFormData } from '@/lib/validations';

interface TeamNotificationEmailProps extends WaitlistFormData {
  submittedAt: string;
}

export const TeamNotificationEmail: React.FC<TeamNotificationEmailProps> = ({
  email,
  company_name,
  company_size,
  industry,
  submittedAt,
}) => (
  <Html>
    <Head />
    <Preview>Nuevo Lead: {company_name} - Tamaño {company_size}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>Nuevo Lead - Waitlist</Heading>
        </Section>

        <Section style={content}>
          <Section style={badge}>
            <Text style={badgeText}>NUEVA SOLICITUD DE DEMO</Text>
          </Section>

          <Section style={dataTable}>
            <Section style={row}>
              <Text style={label}>Email:</Text>
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Section>

            <Section style={row}>
              <Text style={label}>Empresa:</Text>
              <Text style={value}>{company_name}</Text>
            </Section>

            <Section style={row}>
              <Text style={label}>Tamaño:</Text>
              <Text style={value}>{company_size} empleados</Text>
            </Section>

            <Section style={row}>
              <Text style={label}>Rubro:</Text>
              <Text style={value}>{industry || 'No especificado'}</Text>
            </Section>

            <Section style={rowLast}>
              <Text style={label}>Fecha:</Text>
              <Text style={value}>
                {new Date(submittedAt).toLocaleString('es-ES', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}
              </Text>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Este lead ha sido guardado automáticamente en Supabase con status: <strong>new</strong>
            </Text>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#0f2023',
  padding: '20px',
};

const headerTitle = {
  color: '#00d4ff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  padding: '30px 20px',
  backgroundColor: '#ffffff',
};

const badge = {
  marginBottom: '20px',
};

const badgeText = {
  backgroundColor: '#00d4ff',
  color: '#ffffff',
  padding: '10px 15px',
  borderRadius: '6px',
  display: 'inline-block',
  fontWeight: 'bold',
  fontSize: '14px',
  margin: '0',
};

const dataTable = {
  marginTop: '20px',
};

const row = {
  borderBottom: '1px solid #e2e8f0',
  padding: '12px 0',
  display: 'flex',
  justifyContent: 'space-between',
};

const rowLast = {
  padding: '12px 0',
  display: 'flex',
  justifyContent: 'space-between',
};

const label = {
  fontWeight: 'bold',
  color: '#475569',
  margin: '0',
  width: '40%',
};

const value = {
  color: '#0f2023',
  margin: '0',
  width: '60%',
};

const link = {
  color: '#00d4ff',
  textDecoration: 'underline',
};

const footer = {
  marginTop: '30px',
  padding: '15px',
  backgroundColor: '#f1f5f9',
  borderRadius: '6px',
  textAlign: 'center' as const,
};

const footerText = {
  margin: '0',
  color: '#475569',
  fontSize: '14px',
};
