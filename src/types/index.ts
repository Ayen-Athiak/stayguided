export interface Product {
  id: string
  name: string
  description: string
  price: number // in cents
  type: 'ebook' | 'canva' | 'carousel'
  cover_color: 'green' | 'sand' | 'dark'
  file_url: string | null
  stripe_price_id: string | null
  active: boolean
  created_at: string
}

export interface Order {
  id: string
  product_id: string
  customer_email: string
  customer_name: string | null
  stripe_payment_intent_id: string | null
  stripe_session_id: string | null
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  amount_paid: number | null
  created_at: string
  paid_at: string | null
}

export interface Download {
  id: string
  order_id: string
  product_id: string
  token: string
  expires_at: string
  downloaded_count: number
  max_downloads: number
  created_at: string
}

export interface CheckoutPayload {
  product_id: string
  customer_email: string
  customer_name: string
  success_url: string
  cancel_url: string
}
