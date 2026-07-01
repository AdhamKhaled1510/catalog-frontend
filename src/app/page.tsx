'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-emerald-600">CatalogAI</h1>
          <Link
            href="/dashboard"
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            ابدأ مجاناً
          </Link>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-2xl">
          <div className="text-5xl mb-6">📱</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            الكتالوج الديجيتال
            <br />
            <span className="text-emerald-600">في ٣٠ ثانية</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
            الصق رسالة واتساب أو ارفع ملف إكسيل، وخلال ثواني هيكون عندك كتالوج منتظم
            تقدر تشاركه مع زبائنك وتحمله كملف إكسيل.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              ابدأ الآن - مجاناً
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-white p-6 rounded-xl shadow-sm border text-right">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-bold text-lg mb-2">الصق النص</h3>
            <p className="text-gray-500 text-sm">انسخ رسالة الواتساب والصقها، والذكاء الاصطناعي يستخرج المنتجات تلقائياً</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border text-right">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-lg mb-2">ارفع إكسيل</h3>
            <p className="text-gray-500 text-sm">ارفع ملف Excel موجود وبنحوله لكatalog منظم خلال ثواني</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border text-right">
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="font-bold text-lg mb-2">شارك الكتالوج</h3>
            <p className="text-gray-500 text-sm">الزبون يفتح اللينك ويشوف المنتجات مرتبة ويقدر يحملها إكسيل</p>
          </div>
        </div>
      </section>

      <footer className="border-t py-6 text-center text-gray-400 text-sm">
        © 2024 CatalogAI
      </footer>
    </main>
  )
}
