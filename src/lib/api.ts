const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface Product {
  id: string
  catalog_id: string
  name: string
  price: number | null
  description: string | null
  image_url: string | null
}

export interface Catalog {
  id: string
  title: string
  description: string | null
  merchant_id: string
  is_public: boolean
  products: Product[]
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
