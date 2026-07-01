'use client'

interface ProductCardProps {
  name: string
  price: number | null
  description: string | null
}

export default function ProductCard({ name, price, description }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="w-full h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-1">{name}</h3>
      {price !== null && (
        <p className="text-emerald-600 font-bold text-xl mb-2">
          {price.toLocaleString()} ج.م
        </p>
      )}
      {description && (
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      )}
    </div>
  )
}
