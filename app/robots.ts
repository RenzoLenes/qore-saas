import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.qore.io';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/worker/', '/onboarding/', '/api/', '/settings/', '/billing/', '/locations/', '/workers/', '/payroll/', '/qr/', '/scan/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
