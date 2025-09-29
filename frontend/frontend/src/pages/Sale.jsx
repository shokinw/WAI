import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextProvider'

const Sale = () => {
  const { products, backendUrl, currency } = useContext(ShopContext)

  const resolve = (u) => {
    if (!u) return '/placeholder.png'
    return /^https?:\/\//i.test(u) ? u : `${backendUrl}${u.startsWith('/') ? '' : '/'}${u}`
  }

  const saleProducts = products.filter(p => Array.isArray(p.categories) && p.categories.includes('Sale'))

  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-100 to-amber-100 text-pink-700 shadow">
            Hot Sale
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-700">
            Limited-time offers you can't miss
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Save big on curated favorites. Prices drop ends soon!</p>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {saleProducts.map((item, idx) => {
            const percent = typeof item.discountPercent === 'number' && item.discountPercent > 0
              ? item.discountPercent
              : 10;
            const isLatest = item.latest === true;
            const candidate = Array.isArray(item.images) ? item.images[0] : Array.isArray(item.image) ? item.image[0] : item.image;
            const img = resolve(candidate)
            return (
              <Link
                to={`/product/${item._id}`}
                key={item._id || idx}
                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative">
                  <img src={img} alt={item.name} className="w-full h-40 sm:h-48 object-cover" />
                  {/* discount badge */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 text-white shadow">
                    -{percent}%
                  </span>
                  {isLatest && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-purple-100 text-purple-700 shadow">
                      Latest
                    </span>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <p className="text-sm sm:text-base font-medium text-gray-900 line-clamp-1">{item.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-pink-600">{currency}{item.price}</span>
                    {percent > 0 && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        {currency}{Math.round((item.price || 0) * (1 + percent/100))}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-[10px] sm:text-xs text-gray-500">Free returns • Cash on delivery</div>
                </div>
                {/* bottom ribbon */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default Sale