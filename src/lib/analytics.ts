import posthog from 'posthog-js'

export function initAnalytics() {
  posthog.init('phc_qCq8uTQV9Yxx2NL3TNtWoQ7xz22zNovbwuMuiDegqqYQ', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  })
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  posthog.capture(event, properties)
}

export function trackPageView(path: string) {
  posthog.capture('$pageview', { $current_url: path })
}
