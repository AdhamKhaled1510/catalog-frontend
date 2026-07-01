'use client'

import { useState } from 'react'

interface ProductCardProps {
  id?: string
  name: string
  price: number | null
  description: string | null
  category?: string | null
  imageUrl?: string | null
  whatsappPhone?: string | null
  showActions?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function ProductCard({
  id, name, price, description, category, imageUrl,
  whatsappPhone, showActions, onEdit, onDelete,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {imageUrl && !imgError ? (
        <div className="w-full h-40 bg-gray-50">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <span className="text-4xl">📦</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 flex-1">{name}</h3>
          {showActions && id && (
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => onEdit?.(id)}
                className="text-gray-400 hover:text-blue-500 text-sm px-1"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete?.(id)}
                className="text-gray-400 hover:text-red-500 text-sm px-1"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
        {category && (
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded mt-1">
            {category}
          </span>
        )}
        {price !== null && (
          <p className="text-emerald-600 font-bold text-xl mt-1">
            {price.toLocaleString()} ج.م
          </p>
        )}
        {description && (
          <p className="text-gray-500 text-sm mt-1 leading-relaxed">{description}</p>
        )}
        {whatsappPhone && (
          <a
            href={`https://wa.me/${whatsappPhone.replace(/^0+/, '').replace(/[^\d]/g, '')}?text=${encodeURIComponent(`السلام عليكم، عايز استفسر عن: ${name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-emerald-600 text-sm font-medium hover:text-emerald-700"
          >
            💬 استفسر عن المنتج
          </a>
        )}
      </div>
    </div>
  )
}
