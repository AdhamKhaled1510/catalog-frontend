'use client'

import { useState } from 'react'
import { createCatalog, pasteText, uploadExcel, getCatalog, getDownloadUrl } from '@/lib/api'
import type { Catalog } from '@/lib/api'
import ProductCard from '@/components/ProductCard'

export default function Dashboard() {
  const [step, setStep] = useState<'create' | 'add' | 'view'>('create')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [catalog, setCatalog] = useState<Catalog | null>(null)

  const [merchantName, setMerchantName] = useState('')
  const [merchantPhone, setMerchantPhone] = useState('')
  const [catalogTitle, setCatalogTitle] = useState('')
  const [pasteTextContent, setPasteTextContent] = useState('')

  async function handleCreate() {
    if (!merchantName.trim()) return
    setLoading(true)
    setError('')
    try {
      const c = await createCatalog(merchantName, merchantPhone, catalogTitle || 'My Catalog')
      setCatalog(c)
      setStep('add')
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  async function handlePaste() {
    if (!catalog || !pasteTextContent.trim()) return
    setLoading(true)
    setError('')
    try {
      await pasteText(catalog.id, catalog.merchant_id, pasteTextContent)
      const updated = await getCatalog(catalog.id)
      setCatalog(updated)
      setPasteTextContent('')
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  async function handleExcel(e: React.ChangeEvent<HTMLInputElement>) {
    if (!catalog || !e.target.files?.[0]) return
    setLoading(true)
    setError('')
    try {
      await uploadExcel(catalog.id, e.target.files[0])
      const updated = await getCatalog(catalog.id)
      setCatalog(updated)
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  async function refreshCatalog() {
    if (!catalog) return
    const updated = await getCatalog(catalog.id)
    setCatalog(updated)
  }

  if (step === 'create') {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">إنشاء كتالوج جديد</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم التاجر</label>
              <input
                type="text"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="مثال: أحمد علي"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الواتساب (اختياري)</label>
              <input
                type="text"
                value={merchantPhone}
                onChange={(e) => setMerchantPhone(e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="مثال: 01001234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم الكتالوج</label>
              <input
                type="text"
                value={catalogTitle}
                onChange={(e) => setCatalogTitle(e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="مثال: تشكيلة شتاء 2024"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleCreate}
              disabled={loading || !merchantName.trim()}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'جاري الإنشاء...' : 'إنشاء الكتالوج'}
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{catalog?.title}</h1>
            <p className="text-gray-500 text-sm">مرحباً، {merchantName}</p>
          </div>
          <div className="flex gap-3">
            {catalog && (
              <a
                href={getDownloadUrl(catalog.id)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                ⬇ تحميل إكسيل
              </a>
            )}
            {catalog && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/catalog/${catalog.id}`)
                  alert('تم نسخ اللينك!')
                }}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                🔗 نسخ اللينك
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-bold text-lg mb-3">📝 الصق رسالة واتساب</h2>
            <textarea
              value={pasteTextContent}
              onChange={(e) => setPasteTextContent(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 h-32 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
              placeholder="الصق رسالة الواتساب هنا ..."
            />
            <button
              onClick={handlePaste}
              disabled={loading || !pasteTextContent.trim()}
              className="mt-3 w-full bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'جاري المعالجة...' : '🪄 استخراج المنتجات'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-bold text-lg mb-3">📊 رفع ملف إكسيل</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">📁</div>
              <p className="text-gray-500 mb-4">اسحب الملف أو اضغط للاختيار</p>
              <label className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium cursor-pointer hover:bg-gray-200 transition-colors inline-block">
                اختيار ملف
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleExcel}
                  disabled={loading}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              المنتجات ({catalog?.products?.length || 0})
            </h2>
            <button
              onClick={refreshCatalog}
              className="text-emerald-600 text-sm font-medium hover:text-emerald-700"
            >
              🔄 تحديث
            </button>
          </div>

          {catalog?.products && catalog.products.length > 0 ? (
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
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">📭</div>
              <p>لا توجد منتجات بعد. أضف منتجات بالنص أو الإكسيل!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
