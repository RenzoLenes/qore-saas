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

interface WorkerInvitationEmailProps {
  workerName: string;
  companyName: string;
  inviteUrl: string;
}

export const WorkerInvitationEmail: React.FC<WorkerInvitationEmailProps> = ({
  workerName,
  companyName,
  inviteUrl,
}) => (
  <Html>
    <Head />
    <Preview>Te han invitado a QORE — marca tu asistencia desde tu celular</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>QORE</Heading>
        </Section>

        <Section style={content}>
          <Heading style={title}>Bienvenido a QORE</Heading>

          <Text style={paragraph}>
            Hola <strong>{workerName}</strong>,
          </Text>

          <Text style={paragraph}>
            <strong>{companyName}</strong> te ha invitado a usar QORE para marcar tu
            asistencia. Con QORE puedes registrar tu entrada y salida directamente
            desde tu celular.
          </Text>

          <Section style={box}>
            <Heading as="h3" style={boxTitle}>
              Para comenzar:
            </Heading>
            <ol style={list}>
              <li style={listItem}>
                Haz clic en el boton de abajo para crear tu contraseña
              </li>
              <li style={listItem}>
                Inicia sesion con tu email y nueva contraseña
              </li>
              <li style={listItem}>
                Marca tu asistencia escaneando el QR o con GPS
              </li>
            </ol>
          </Section>

          <Section style={buttonContainer}>
            <Link href={inviteUrl} style={button}>
              Crear mi contraseña
            </Link>
          </Section>

          <Text style={smallText}>
            Si el boton no funciona, copia y pega este enlace en tu navegador:
            <br />
            {inviteUrl}
          </Text>

          <Text style={paragraph}>
            Saludos,
            <br />
            <strong>El equipo de QORE</strong>
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            © 2026 QORE Systems. Todos los derechos reservados.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f5f8f8',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#00d4ff',
  padding: '20px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  padding: '40px 20px',
  backgroundColor: '#f5f8f8',
};

const title = {
  color: '#0f2023',
  fontSize: '24px',
  fontWeight: 'bold',
  marginTop: '0',
};

const paragraph = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const box = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
  borderLeft: '4px solid #00d4ff',
};

const boxTitle = {
  color: '#0f2023',
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '0',
};

const list = {
  color: '#334155',
  paddingLeft: '20px',
  margin: '12px 0',
};

const listItem = {
  marginBottom: '10px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#00d4ff',
  color: '#0f172a',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '14px 32px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-block',
};

const smallText = {
  color: '#94a3b8',
  fontSize: '12px',
  lineHeight: '1.6',
  margin: '16px 0',
  wordBreak: 'break-all' as const,
};

const footer = {
  padding: '20px',
  textAlign: 'center' as const,
  backgroundColor: '#0f2023',
};

const footerText = {
  color: '#64748b',
  fontSize: '14px',
  margin: '0',
};
