import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { trackEvent } from '../lib/analytics'

export default function SuccessPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)
  const sessionId = params.get('session_id')

  useEffect(() => {
    trackEvent('checkout_completed', { session_id: sessionId })
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">{'✓'}</div>
        <h1 className="success-title">{'Payment confirmed'}</h1>
        <p className="success-body">
          {'Thank you for your purchase. Your download link is on its way to your inbox. Check your spam folder if it does not arrive within a few minutes.'}
        </p>
        {sessionId && (
          <div className="success-note">
            {'Reference: '}<code style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{sessionId.slice(0, 24)}{'...'}</code>
          </div>
        )}
        <div className="success-note">
          {'Your email includes a personal download link valid for 48 hours and up to 5 downloads. Save the file once downloaded.'}
        </div>
        <button
          className="btn-checkout"
          onClick={() => navigate('/')}
          style={{ width: 'auto', padding: '0.8rem 2rem', marginTop: '0.5rem' }}
        >
          {`Back to StayGuided (${countdown}s)`}
        </button>
      </div>
    </div>
  )
}
