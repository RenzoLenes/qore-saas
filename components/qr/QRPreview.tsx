'use client';

import { QRCodeSVG } from 'qrcode.react';

interface QRPreviewProps {
  token: string;
  size?: number;
}

const QR_BASE_URL = `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.qore.io'}/scan`;

export default function QRPreview({ token, size = 128 }: QRPreviewProps) {
  return (
    <QRCodeSVG
      value={`${QR_BASE_URL}/${token}`}
      size={size}
      level="M"
      bgColor="#ffffff"
      fgColor="#0f172a"
      marginSize={2}
    />
  );
}
