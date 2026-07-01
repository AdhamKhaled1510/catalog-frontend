import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CatalogAI - الكتالوج الديجيتال',
  description: 'حول رسايل الواتساب وملفات الإكسيل لكatalog منتظم في ثواني',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  )
}
