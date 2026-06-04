import { BrowserRouter, Routes, Route } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'
import DownloadPage from './pages/DownloadPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Sentry.withErrorBoundary(App, {
  fallback: (
    <div style={{
      minHeight: '100vh',
      background: '#3a5a40',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Jost, sans-serif',
    }}>
      <div style={{
        background: '#faf8f4',
        padding: '3rem',
        maxWidth: '420px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#1e2e22', marginBottom: '1rem' }}>
          Something went wrong
        </p>
        <p style={{ fontSize: '0.88rem', color: '#7a8c7e', marginBottom: '1.5rem', lineHeight: 1.8 }}>
          We have been notified and are looking into it. Please refresh the page to try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: '#3a5a40', color: '#f5f0e8',
            border: 'none', padding: '0.85rem 2rem',
            fontSize: '0.75rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          Refresh page
        </button>
      </div>
    </div>
  ),
})
