import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import CheckoutModal from '../components/CheckoutModal'
import Testimonials from '../components/Testimonials'
import { trackEvent } from '../lib/analytics'
import type { Product } from '../types'

const FILTERS = ['all', 'ebook', 'canva', 'carousel'] as const
type Filter = typeof FILTERS[number]

const filterLabel: Record<Filter, string> = {
  all: 'All',
  ebook: 'E-books',
  canva: 'Canva',
  carousel: 'Carousels',
}

const LogoMark = ({ color = '#3a5a40' }: { color?: string }) => (
  <svg width="22" height="24" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="24" height="26" rx="2" stroke={color} strokeWidth="1"/>
    <path d="M8 18 L13 10 L18 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="10" y1="16" x2="16" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Product | null>(null)
  const [newsletter, setNewsletter] = useState('')
  const [newsletterMsg, setNewsletterMsg] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const { products, loading } = useProducts(filter)

  function handleNewsletterSubmit() {
    if (!newsletter || !newsletter.includes('@')) {
      setNewsletterMsg('Please enter a valid email address.')
      return
    }
    trackEvent('newsletter_signup', { email: newsletter })
    setNewsletterMsg('Welcome to StayGuided. Watch your inbox.')
    setNewsletter('')
  }

  const navLinks = [
    { href: '#mission', label: 'Our mission' },
    { href: '#resources', label: 'Resources' },
    { href: '#voices', label: 'Voices' },
    { href: '#letter', label: 'Newsletter' },
  ]

  const menuLinkStyle: React.CSSProperties = {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    fontSize: '0.8rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(245,240,232,0.7)',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <>
      {selected && (
        <CheckoutModal product={selected} onClose={() => setSelected(null)} />
      )}

      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'var(--green3)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '2rem',
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute', top: '1.2rem', right: '1.5rem',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--cream)', fontSize: '1.8rem', lineHeight: '1',
              padding: '0.5rem', minWidth: '44px', minHeight: '44px',
            }}
          >
            {'x'}
          </button>
          <div style={{
            fontFamily: 'Fraunces, serif',
            fontSize: '1.5rem', color: 'var(--cream)', fontWeight: 300,
            marginBottom: '1rem',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <LogoMark color="#f5f0e8" />
            {'StayGuided'}
          </div>
          {navLinks.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => { setMenuOpen(false); window.location.href = href; }}
              style={menuLinkStyle}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); window.location.href = '#resources'; }}
            style={{
              marginTop: '1rem',
              background: 'var(--cream)',
              color: 'var(--green)',
              padding: '0.85rem 2.5rem',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 500,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {'Explore resources'}
          </button>
        </div>
      )}

      <nav>
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LogoMark />
          {'Stay'}<span style={{ marginLeft: 0 }}>{'Guided'}</span>
        </div>
        <ul className="nav-links">
          {navLinks.map(({ href, label }) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>
        <a href="#resources" className="nav-pill nav-pill-desktop">{'Explore resources'}</a>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />
        <div>
          <p className="hero-eyebrow">{'AI · Digital Tools · Tech Clarity'}</p>
          <h1 className="hero-title">
            {'Elevate your'}<br />
            <em>{'knowledge.'}</em><br />
            <strong>{'Stay guided.'}</strong>
          </h1>
          <p className="hero-body">
            {'The digital world moves fast. StayGuided exists to slow it down for you, with clear, honest resources on AI, tech, and digital tools that actually make sense.'}
          </p>
          <div className="btn-row">
            <a href="#resources" className="btn-cream">{'Explore resources'}</a>
            <a href="#mission" className="btn-ghost">{'Our mission'}</a>
          </div>
          <div className="scroll-hint">
            <span className="scroll-line" />
            {'Scroll to explore'}
          </div>
        </div>
        <div className="hero-right">
          <div className="stat-mosaic">
            <div className="sm"><div className="sm-n">{'AI'}</div><div className="sm-l">{'Focused'}</div></div>
            <div className="sm"><div className="sm-n">{'3+'}</div><div className="sm-l">{'Resource types'}</div></div>
            <div className="sm"><div className="sm-n">{'100%'}</div><div className="sm-l">{'Practical'}</div></div>
            <div className="sm"><div className="sm-n">{'∞'}</div><div className="sm-l">{'Yours forever'}</div></div>
          </div>
          <div className="hero-live">
            <div className="live-dot" />
            <div className="live-text">
              <b>{'New resources available'}</b>
              {'AI guides & carousel packs'}
            </div>
          </div>
        </div>
      </section>

      <section className="mission" id="mission">
        <div className="mission-body">
          <p className="ey">{'Why StayGuided exists'}</p>
          <h2 className="st">{'Knowledge is the only edge that '}<em>{'compounds'}</em></h2>
          <p className="lead">{'"Most people consume information. We help you understand it."'}</p>
          <p>{'AI, automation, and digital tools are reshaping everything: how we work, how we learn, how we earn. But for most people, it all moves too fast and sounds too complex.'}</p>
          <p>{'StayGuided cuts through the noise. Every resource here is built to give you clarity, not overwhelm. No jargon. No fluff. Just the things you need to know, explained the way they should be.'}</p>
        </div>
        <div>
          <div className="pillar-list">
            <div className="pillar">
              <div className="pillar-sq">
                <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <div className="pb">
                <strong>{'AI & tech e-books'}</strong>
                <span>{'In-depth yet accessible guides on artificial intelligence, automation, and the tools rewriting the rules.'}</span>
              </div>
            </div>
            <div className="pillar">
              <div className="pillar-sq">
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              </div>
              <div className="pb">
                <strong>{'Canva digital templates'}</strong>
                <span>{'Polished, ready-to-use design kits that make your digital presence look as good as your ideas.'}</span>
              </div>
            </div>
            <div className="pillar">
              <div className="pillar-sq">
                <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              </div>
              <div className="pb">
                <strong>{'Carousel content packs'}</strong>
                <span>{'Structured slides that help you share complex digital ideas with clarity, confidence, and style.'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="resources" id="resources">
        <div className="res-head">
          <div>
            <p className="ey">{'What we have built for you'}</p>
            <h2 className="st">{'Knowledge resources'}</h2>
          </div>
          <div className="filter-row">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`tab ${filter === f ? 'active' : ''}`}
                onClick={() => {
                  setFilter(f)
                  trackEvent('filter_changed', { filter: f })
                }}
              >
                {filterLabel[f]}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="rc-loading">
            <div className="spinner" style={{ borderTopColor: 'var(--green)', borderColor: 'var(--border2)', width: 28, height: 28, borderWidth: 3 }} />
          </div>
        ) : (
          <div className="res-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => {
                  setSelected(p)
                  trackEvent('product_clicked', {
                    product_id: p.id,
                    product_name: p.name,
                    product_type: p.type,
                    price: p.price / 100,
                  })
                }}
              />
            ))}
          </div>
        )}
      </section>

      <div className="divider" />

      <section className="community">
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="comm-ey">{'The StayGuided way'}</p>
          <h2 className="comm-title">{'Not just a product.'}<br />{'A '}<em>{'perspective.'}</em></h2>
          <p className="comm-body">{'Every resource we create comes from one place: a genuine belief that understanding the digital world is one of the most important things you can do right now. These are not just downloads. They are starting points.'}</p>
        </div>
        <div className="comm-cards">
          <div className="cc">
            <div className="cc-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg></div>
            <div className="cc-text"><strong>{'Always relevant'}</strong><span>{'Updated to reflect how AI and tech actually work today'}</span></div>
          </div>
          <div className="cc">
            <div className="cc-icon"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></div>
            <div className="cc-text"><strong>{'Clarity first'}</strong><span>{'No jargon. Complex ideas explained in plain language'}</span></div>
          </div>
          <div className="cc">
            <div className="cc-icon"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></div>
            <div className="cc-text"><strong>{'Built to be used'}</strong><span>{'Every resource is made to move you forward, not sit in a folder'}</span></div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <Testimonials />

      <section className="letter" id="letter">
        <div className="letter-inner">
          <div className="letter-body">
            <p className="ey">{'Stay in the loop'}</p>
            <h2 className="st">{'The StayGuided '}<em>{'newsletter'}</em></h2>
            <p>{'New AI tool breakdowns, digital guides, and honest takes on what is actually worth your attention. Straight to your inbox. No noise. Just signal.'}</p>
          </div>
          <div>
            <div className="email-wrap">
              <input
                type="email"
                className="email-in"
                placeholder="your@email.com"
                value={newsletter}
                onChange={e => setNewsletter(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNewsletterSubmit()}
              />
              <button className="email-sub" onClick={handleNewsletterSubmit}>{'Join the list'}</button>
            </div>
            <p className="fn" style={newsletterMsg.startsWith('W') ? { color: 'var(--green)' } : { color: 'var(--text-dim)' }}>
              {newsletterMsg || 'No spam, ever. Unsubscribe any time.'}
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="fl" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LogoMark color="#f5f0e8" />
          {'Stay'}<span>{'Guided'}</span>
        </div>
        <ul className="flinks">
          <li><a href="#mission">{'Mission'}</a></li>
          <li><a href="#resources">{'Resources'}</a></li>
          <li><a href="#voices">{'Voices'}</a></li>
          <li><a href="#letter">{'Newsletter'}</a></li>
        </ul>
        <p className="fc">{'© 2026 StayGuided. All rights reserved.'}</p>
      </footer>
    </>
  )
}
