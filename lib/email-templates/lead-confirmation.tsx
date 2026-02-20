import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
} from '@react-email/components';
import * as React from 'react';

interface LeadConfirmationEmailProps {
  companyName: string;
}

export const LeadConfirmationEmail: React.FC<LeadConfirmationEmailProps> = ({
  companyName,
}) => (
  <Html>
    <Head />
    <Preview>¡Gracias por tu interés en QORE! Te contactaremos pronto.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>QORE</Heading>
        </Section>

        <Section style={content}>
          <Heading style={title}>¡Gracias por tu interés en QORE!</Heading>

          <Text style={paragraph}>
            Hola equipo de <strong>{companyName}</strong>,
          </Text>

          <Text style={paragraph}>
            Hemos recibido tu solicitud para conocer más sobre nuestra plataforma de
            asistencia con QR y GPS. Estamos emocionados de ayudarte a modernizar
            el control de personal en tu empresa.
          </Text>

          <Section style={box}>
            <Heading as="h3" style={boxTitle}>
              Próximos pasos:
            </Heading>
            <ol style={list}>
              <li style={listItem}>
                Nuestro equipo revisará tu solicitud en las próximas 24-48 horas
              </li>
              <li style={listItem}>
                Te contactaremos para agendar una demo personalizada
              </li>
              <li style={listItem}>
                Evaluaremos juntos cómo QORE puede adaptarse a tus necesidades
              </li>
            </ol>
          </Section>

          <Text style={paragraph}>
            Mientras tanto, si tienes alguna pregunta urgente, no dudes en responder
            a este correo.
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
  backgroundColor: '#2dd4ff',
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
  borderLeft: '4px solid #2dd4ff',
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
