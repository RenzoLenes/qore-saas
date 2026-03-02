import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://c5ebf09b6c31af5156423ee4a746a1b0@o4510970284212224.ingest.us.sentry.io/4510970285916160',

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  enabled: process.env.NODE_ENV === 'production',
});
