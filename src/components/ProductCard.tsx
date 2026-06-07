import type { Product } from '../types'

interface Props {
  product: Product
  onSelect: (product: Product) => void
}

const coverClass: Record<string, string> = {
  green: 'cov-g',
  sand: 'cov-c',
  dark: 'cov-d',
}

const typeLabel: Record<string, string> = {
  ebook: 'E-book',
  canva: 'Canva',
  carousel: 'Carousel',
}

export default function ProductCard({ product, onSelect }: Props) {
  const isSand = product.cover_color === 'sand'
  const lineClass = isSand ? 'rc-cover-line rc-cover-line-dark' : 'rc-cover-line'

  return (
    <div className="rc" onClick={() => onSelect(product)}>
      <div className={`rc-cover ${coverClass[product.cover_color] || 'cov-g'}`}>
        <div className={`rc-type-pill ${isSand ? 'rc-type-pill-dark' : ''}`}>
          {typeLabel[product.type] || product.type}
        </div>
        <div className={lineClass} />
        <div
          className="rc-cover-title"
          style={isSand ? { color: 'var(--green)' } : undefined}
        >
          {product.name}
        </div>
        <div className={lineClass} />
        <div
          className="rc-cover-sub"
          style={isSand ? { color: 'var(--green)' } : undefined}
        >
          StayGuided
        </div>
      </div>
      <div className="rc-body">
        <div className="rc-title">{product.name}</div>
        <div className="rc-desc">{product.description}</div>
        <div className="rc-foot">
          <span className="rc-price">${(product.price / 100).toFixed(2).replace(/\.00$/, '')}</span>
          <span className="rc-arrow">→</span>
        </div>
      </div>
    </div>
  )
}
