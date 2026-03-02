import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthHashHandler } from "@/components/AuthHashHandler";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.qore.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "QORE — Control de Asistencia Inteligente para Empresas",
    template: "%s | QORE",
  },
  description:
    "Plataforma B2B de control de asistencia con validación QR y geolocalización GPS en tiempo real. Elimina el fraude, automatiza reportes y simplifica la nómina.",
  keywords: [
    "control de asistencia",
    "QR",
    "GPS",
    "gestión de personal",
    "SaaS",
    "B2B",
    "nómina",
    "geolocalización",
    "recursos humanos",
  ],
  openGraph: {
    title: "QORE — Control de Asistencia Inteligente para Empresas",
    description:
      "Valida asistencia en tiempo real con QR y GPS. La plataforma que elimina el fraude y simplifica la operación de tu equipo.",
    type: "website",
    locale: "es_ES",
    siteName: "QORE",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "QORE — Control de Asistencia con QR y GPS",
    description:
      "Plataforma B2B de asistencia inteligente. Validación QR + GPS en tiempo real.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grain`}
      >
        <AuthHashHandler />
        {children}
      </body>
    </html>
  );
}
