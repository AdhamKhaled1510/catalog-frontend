const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/+$/, '')

export interface Product {
  id: string
  catalog_id: string
  name: string
  price: number | null
  description: string | null
  category: string | null
  image_url: string | null
  sort_order: number
}

export interface Catalog {
  id: string
  title: string
  description: string | null
  merchant_id: string
  merchant_phone: string | null
  is_public: boolean
  products: Product[]
}

export async function login(phone: string, name: string): Promise<{merchant_id: string; name: string; phone: string}> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, name }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function createCatalog(
  merchantName: string,
  merchantPhone: string,
  catalogTitle: string
): Promise<Catalog> {
  const res = await fetch(`${API_URL}/catalogs/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merchant_name: merchantName,
      merchant_phone: merchantPhone,
      catalog_title: catalogTitle,
    }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function pasteText(catalogId: string, merchantId: string, text: string) {
  const res = await fetch(`${API_URL}/catalogs/${catalogId}/paste`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ merchant_id: merchantId, catalog_id: catalogId, text }),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function uploadExcel(catalogId: string, file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_URL}/catalogs/${catalogId}/upload-excel`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getCatalog(catalogId: string): Promise<Catalog> {
  const res = await fetch(`${API_URL}/catalogs/${catalogId}`)
  if (!res.ok) throw new Error('Catalog not found')
  return res.json()
}

export function getDownloadUrl(catalogId: string): string {
  return `${API_URL}/catalogs/${catalogId}/download`
}

export async function updateProduct(productId: string, data: Partial<Product>) {
  const res = await fetch(`${API_URL}/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteProduct(productId: string) {
  const res = await fetch(`${API_URL}/products/${productId}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function uploadImage(file: File): Promise<{image_url: string}> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_URL}/upload-image`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/^0+/, '').replace(/[^\d]/g, '')
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`
}
