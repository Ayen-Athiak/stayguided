import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Download, Product } from '../types'

export default function DownloadPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const token = params.get('token')

  const [download, setDownload] = useState<Download | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [status, setStatus] = useState<'loading' | 'valid' | 'expired' | 'invalid'>('loading')

  useEffect(() => {
    if (!token) { setStatus('invalid'); return }

    async function validateToken() {
      const { data, error } = await supabase
        .from('downloads')
        .select('*, products(*)')
        .eq('token', token)
        .single()

      if (error || !data) { setStatus('invalid'); return }

      const dl = data as Download & { products: Product }
      const now = new Date()
      const expires = new Date(dl.expires_at)

      if (now > expires || dl.downloaded_count >= dl.max_downloads) {
        setStatus('expired'); return
      }

      setDownload(dl)
      setProduct(dl.products)
      setStatus('valid')
    }

    validateToken()
  }, [token])

  async function handleDownload() {
    if (!download || !product?.file_url) return

    await supabase
      .from('downloads')
      .update({ downloaded_count: download.downloaded_count + 1 })
      .eq('id', download.id)

    const { data } = await supabase.storage
      .from('products')
      .createSignedUrl(product.file_url, 60)

    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank')
    }
  }

  if (status === 'loading') {
    return (
      <div className="download-page">
        <div className="download-card">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div className="spinner" style={{ borderTopColor: 'var(--green)', borderColor: 'var(--border2)' }} />
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{'Validating your download link...'}</p>
        </div>
      </div>
    )
  }

  if (status === 'expired') {
    return (
      <div className="download-page">
        <div className="download-card">
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{'⏱'}</div>
          <h1 className="download-title">{'Link expired'}</h1>
          <p className="download-body">
            {'This download link has expired or reached its download limit. If you need a new one, reply to your confirmation email and we will sort it out.'}
          </p>
          <button className="btn-download" onClick={() => navigate('/')}>{'Back to StayGuided'}</button>
        </div>
      </div>
    )
  }

  if (status === 'invalid') {
    return (
      <div className="download-page">
        <div className="download-card">
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{'✕'}</div>
          <h1 className="download-title">{'Invalid link'}</h1>
          <p className="download-body">
            {'This download link is not valid. Please check your email for the correct link. If you are still having trouble, reply to your receipt email and we will help.'}
          </p>
          <button className="btn-download" onClick={() => navigate('/')}>{'Back to StayGuided'}</button>
        </div>
      </div>
    )
  }

  const remaining = download ? download.max_downloads - download.downloaded_count : 0
  const expires = download ? new Date(download.expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

  return (
    <div className="download-page">
      <div className="download-card">
        <div
          style={{
            background: 'var(--green)', color: 'var(--cream)',
            fontFamily: 'Fraunces, serif', fontSize: '1.1rem',
            padding: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.4,
          }}
        >
          {product?.name}
        </div>

        <h1 className="download-title">{'Your download is ready'}</h1>
        <p className="download-body">
          {'Click below to download your file. Save it somewhere you will actually find it.'}
        </p>

        <button className="btn-download" onClick={handleDownload}>
          {'Download now'}
        </button>

        <p className="download-meta">
          {remaining} {'download'}{remaining !== 1 ? 's' : ''} {'remaining, expires'} {expires}
        </p>
      </div>
    </div>
  )
}
