import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://qore.senelstudio.me';

export const LeadConfirmationEmail: React.FC = () => (
  <Html>
    <Head />
    <Preview>¡Gracias por tu interés en QORE! Te contactaremos en menos de 24 h.</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header (Navy gradient) */}
        <Section style={header}>
          <Row>
            <Column>
              <Img
                src={`${BASE_URL}/logo-white.png`}
                alt="QORE"
                width="100"
                height="26"
                style={logoImg}
              />
            </Column>
            <Column align="right">
              <Text style={badge}>CONFIRMADO</Text>
            </Column>
          </Row>
        </Section>

        {/* Hero Title */}
        <Section style={heroSection}>
          <Heading style={heroTitle}>
            ¡Gracias por tu interés en{' '}
            <span style={heroItalic}>QORE</span>!
          </Heading>
          <Text style={heroSub}>
            Recibimos tu solicitud para conocer cómo nuestra plataforma puede modernizar el control
            de asistencia en tu empresa. Nos pondremos en contacto contigo muy pronto.
          </Text>
        </Section>

        {/* Steps */}
        <Section style={stepsSection}>
          <Text style={eyebrow}>PRÓXIMOS PASOS</Text>

          <Section style={stepCard}>
            <Row>
              <Column style={stepNumCol}>
                <Text style={stepNum}>1</Text>
              </Column>
              <Column style={stepContent}>
                <Text style={stepTitle}>Revisión de tu solicitud</Text>
                <Text style={stepDesc}>
                  Nuestro equipo revisa tu solicitud en las próximas 24 horas hábiles.
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={stepCard}>
            <Row>
              <Column style={stepNumCol}>
                <Text style={stepNum}>2</Text>
              </Column>
              <Column style={stepContent}>
                <Text style={stepTitle}>Demo personalizada</Text>
                <Text style={stepDesc}>
                  Te contactamos para agendar una demo de 20 minutos donde te mostramos QORE en
                  acción con tus casos reales.
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={stepCard}>
            <Row>
              <Column style={stepNumCol}>
                <Text style={stepNum}>3</Text>
              </Column>
              <Column style={stepContent}>
                <Text style={stepTitle}>Configuración de tu primera sede</Text>
                <Text style={stepDesc}>
                  Te acompañamos 1-a-1 en la configuración inicial. En 30 minutos tu equipo ya está
                  marcando asistencia.
                </Text>
              </Column>
            </Row>
          </Section>
        </Section>

        {/* Trust Strip */}
        <Section style={trustWrap}>
          <Section style={trustBox}>
            <Text style={trustText}>
              <strong style={{ color: '#000d2a' }}>Demo gratuita</strong> · Respuesta &lt; 24 h ·
              Sin compromiso
            </Text>
          </Section>
        </Section>

        {/* Closing */}
        <Section style={closing}>
          <Text style={closingP}>
            ¿Tienes una pregunta urgente? Responde directamente a este correo o escríbenos a{' '}
            <Link href="mailto:contacto@senelstudio.me" style={mailLink}>
              contacto@senelstudio.me
            </Link>
            .
          </Text>
          <Text style={signature}>
            Saludos,
            <br />
            <strong>El equipo de QORE</strong>
          </Text>
        </Section>

        <Hr style={divider} />

        {/* Footer */}
        <Section style={footer}>
          <Row>
            <Column>
              <Text style={footerText}>
                &copy; 2026 Senel Studio. Todos los derechos reservados.
              </Text>
            </Column>
            <Column align="right">
              <Link href={`${BASE_URL}/privacidad`} style={footerLink}>
                Privacidad
              </Link>
              <Link href={`${BASE_URL}/terminos`} style={{ ...footerLink, marginLeft: '16px' }}>
                Términos
              </Link>
            </Column>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
);

const fontStack =
  "-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif";

const main = {
  margin: '0',
  padding: '24px',
  backgroundColor: '#f1f5f9',
  fontFamily: fontStack,
  color: '#0f172a',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  overflow: 'hidden' as const,
  boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,13,42,0.06)',
};

const header = {
  backgroundImage: 'linear-gradient(180deg,#001338 0%,#000d2a 100%)',
  backgroundColor: '#000d2a',
  padding: '40px 48px 32px 48px',
};

const logoImg = {
  display: 'block',
  height: '26px',
  width: 'auto',
  border: '0',
};

const badge = {
  display: 'inline-block',
  margin: '0',
  padding: '5px 12px',
  backgroundColor: 'rgba(45,212,255,0.12)',
  border: '1px solid rgba(45,212,255,0.25)',
  borderRadius: '999px',
  fontSize: '11px',
  fontWeight: 600,
  color: '#2dd4ff',
  letterSpacing: '1.5px',
  fontFamily: "'SF Mono',Menlo,Consolas,monospace",
};

const heroSection = {
  padding: '48px 48px 24px 48px',
};

const heroTitle = {
  margin: '0 0 20px 0',
  fontSize: '32px',
  lineHeight: '1.15',
  fontWeight: 800,
  letterSpacing: '-1px',
  color: '#0f172a',
};

const heroItalic = {
  fontFamily: "Georgia,'Times New Roman',serif",
  fontStyle: 'italic' as const,
  fontWeight: 400,
};

const heroSub = {
  margin: '0',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#475569',
};

const stepsSection = {
  padding: '0 48px 16px 48px',
};

const eyebrow = {
  margin: '24px 0 16px 0',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '1.8px',
  color: '#2dd4ff',
  fontFamily: "'SF Mono',Menlo,Consolas,monospace",
};

const stepCard = {
  marginBottom: '12px',
  padding: '18px 20px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
};

const stepNumCol = {
  width: '44px',
  verticalAlign: 'top' as const,
};

const stepNum = {
  display: 'inline-block',
  width: '32px',
  height: '32px',
  borderRadius: '999px',
  backgroundImage: 'linear-gradient(180deg,#2dd4ff 0%,#1ab8e0 100%)',
  backgroundColor: '#2dd4ff',
  textAlign: 'center' as const,
  lineHeight: '32px',
  fontSize: '13px',
  fontWeight: 700,
  color: '#000d2a',
  margin: '0',
};

const stepContent = {
  verticalAlign: 'top' as const,
};

const stepTitle = {
  margin: '0 0 4px 0',
  fontSize: '14px',
  fontWeight: 600,
  color: '#0f172a',
};

const stepDesc = {
  margin: '0',
  fontSize: '13px',
  lineHeight: '1.55',
  color: '#64748b',
};

const trustWrap = {
  padding: '24px 48px 8px 48px',
};

const trustBox = {
  padding: '16px 20px',
  backgroundColor: '#f0fdff',
  border: '1px solid #cffafe',
  borderRadius: '12px',
};

const trustText = {
  margin: '0',
  fontSize: '13px',
  lineHeight: '1.55',
  color: '#0c5e74',
};

const closing = {
  padding: '24px 48px 8px 48px',
};

const closingP = {
  margin: '0 0 16px 0',
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#475569',
};

const mailLink = {
  color: '#0891b2',
  textDecoration: 'none',
  fontFamily: "'SF Mono',Menlo,Consolas,monospace",
  fontSize: '14px',
};

const signature = {
  margin: '24px 0 0 0',
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#0f172a',
};

const divider = {
  margin: '24px 48px 0 48px',
  borderTop: '1px solid #e2e8f0',
  borderBottom: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  width: 'auto',
};

const footer = {
  padding: '24px 48px 32px 48px',
};

const footerText = {
  margin: '0',
  fontSize: '12px',
  color: '#94a3b8',
};

const footerLink = {
  fontSize: '12px',
  color: '#94a3b8',
  textDecoration: 'none',
};
