import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { trackEvent } from '../lib/analytics'
import { captureError } from '../lib/errorTracking'
import type { Product } from '../types'

interface Props {
  product: Product
  onClose: () => void
}

const coverClass: Record<string, string> = {
  green: 'cov-g',
  sand: 'cov-c',
  dark: 'cov-d',
}

export default function CheckoutModal({ product, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin

  async function handleCheckout() {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    setLoading(true)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-checkout', {
        body: {
          product_id: product.id,
          customer_email: email,
          customer_name: name,
          success_url: `${siteUrl}/success`,
          cancel_url: `${siteUrl}/`,
        },
      })

      if (fnError || !data?.url) {
        throw new Error(fnError?.message || 'Could not start checkout. Please try again.')
      }

      trackEvent('checkout_started', {
        product_id: product.id,
        product_name: product.name,
        product_type: product.type,
        price: product.price / 100,
      })

      // Redirect to Lemon Squeezy checkout
      window.location.href = data.url

    } catch (err) {
      captureError(err, { product_id: product.id, customer_email: email })
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className={`modal-cover ${coverClass[product.cover_color] || 'cov-g'}`}>
          {product.name}
        </div>

        <div className="modal-body">
          <div className="modal-type">{product.type.toUpperCase()}</div>
          <h2 className="modal-name">{product.name}</h2>
          <p className="modal-desc">{product.description}</p>

          <div className="modal-price-row">
            <span className="modal-price-label">One-time payment</span>
            <span className="modal-price-val">${(product.price / 100).toFixed(0)}</span>
          </div>

          <div className="modal-includes">
            <span>Instant download after payment</span>
            <span>Download link sent to your email</span>
            <span>Lifetime access, no subscription</span>
          </div>

          <div className="modal-form">
            <div className="form-row">
              <input
                className="form-input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                className="form-input"
                type="email"
                placeholder="Email address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <div className="modal-error">{error}</div>}

            <button
              className="btn-checkout"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Redirecting to checkout...
                </>
              ) : (
                <>Get this for ${(product.price / 100).toFixed(0)}</>
              )}
            </button>

            <p className="modal-note">
              Secure checkout powered by Lemon Squeezy. Your card details are never stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
