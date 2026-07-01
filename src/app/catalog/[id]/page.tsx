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

  useEffect(() => {
    if (!params.id) return
    setLoading(true)
    getCatalog(params.id as string)
      .then(setCatalog)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [params.id])

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{catalog.title}</h1>
              {catalog.description && (
                <p className="text-gray-500 mt-1">{catalog.description}</p>
              )}
              <p className="text-sm text-gray-400 mt-1">
                {catalog.products.length} منتج
              </p>
            </div>
            <a
              href={getDownloadUrl(catalog.id)}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              ⬇ تحميل إكسيل
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {catalog.products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {catalog.products.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                description={p.description}
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
