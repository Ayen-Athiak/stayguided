import * as Sentry from '@sentry/react'

export function initErrorTracking() {
  Sentry.init({
    dsn: 'https://0bb338bd30421ebdb5e6d6aa6806e59c@o4511503728574464.ingest.us.sentry.io/4511503737487360',
    environment: import.meta.env.MODE, // 'development' or 'production'
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Capture 100% of transactions in dev, 20% in production
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
    // Capture replays only on errors
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}

export function captureError(error: unknown, context?: Record<string, unknown>) {
  Sentry.captureException(error, { extra: context })
}
