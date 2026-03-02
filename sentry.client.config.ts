import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://c5ebf09b6c31af5156423ee4a746a1b0@o4510970284212224.ingest.us.sentry.io/4510970285916160',

  // Performance monitoring: sample 10% of transactions in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session replay: capture 5% of sessions, 100% on error
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration(),
  ],

  // Don't send errors in development
  enabled: process.env.NODE_ENV === 'production',
});
