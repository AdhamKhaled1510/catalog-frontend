'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getCatalog, getDownloadUrl } from '@/lib/api'
import type { Catalog } from '@/lib/api'
import ProductCard from '@/components/ProductCard'

export default function CatalogPage() {
  const params = useParams()
  const [catalog, setCatalog] = useState<Catalog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    if (!params.id) return
    setLoading(true)
    getCatalog(params.id as string)
      .then(setCatalog)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [params.id])

  const categories = catalog?.products
    ? Array.from(new Set(catalog.products.map(p => p.category).filter(Boolean) as string[]))
    : []

  const filteredProducts = catalog?.products
    ? categoryFilter
      ? catalog.products.filter(p => p.category === categoryFilter)
      : catalog.products
    : []

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">📋</div>
          <p className="text-gray-500">جاري تحميل الكتالوج...</p>
        </div>
      </main>
    )
  }

  if (error || !catalog) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">الكتالوج غير موجود</h2>
          <p className="text-gray-500">تأكد من الرابط أو تواصل مع التاجر</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{catalog.title}</h1>
              {catalog.description && (
                <p className="text-gray-500 mt-1">{catalog.description}</p>
              )}
              <p className="text-sm text-gray-400 mt-1">
                {catalog.products.length} منتج
              </p>
            </div>
            <div className="flex gap-2">
              {catalog.merchant_phone && (
                <a
                  href={`https://wa.me/${catalog.merchant_phone.replace(/^0+/, '').replace(/[^\d]/g, '')}?text=${encodeURIComponent('السلام عليكم، عندي استفسار عن الكتالوج')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-100 text-emerald-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors flex items-center gap-2"
                >
                  💬 تواصل مع التاجر
                </a>
              )}
              <a
                href={getDownloadUrl(catalog.id)}
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                ⬇ تحميل إكسيل
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {categories.length > 0 && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setCategoryFilter('')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${!categoryFilter ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
            >
              الكل
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c!)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${categoryFilter === c ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                description={p.description}
                category={p.category}
                imageUrl={p.image_url}
                whatsappPhone={catalog.merchant_phone}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-400">الكتالوج فارغ حالياً</p>
          </div>
        )}
      </div>
    </main>
  )
}
