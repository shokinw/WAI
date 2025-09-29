import React, { useContext, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextProvider'

const useQuery = () => new URLSearchParams(useLocation().search)

const Search = () => {
  const query = useQuery()
  const q = (query.get('q') || '').trim().toLowerCase()
  const { products } = useContext(ShopContext)

  const results = useMemo(() => {
    if (!q) return []
    return products.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.subCategory || '').toLowerCase().includes(q)
    )
  }, [products, q])

  return (
    <section className='py-10 sm:py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        <div className='flex items-end justify-between'>
          <div>
            <span className='inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white text-pink-600 shadow'>Search</span>
            <h1 className='mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold'>Results for “{q}”</h1>
            <p className='text-gray-600 text-sm sm:text-base'>{results.length} items found</p>
          </div>
        </div>

        {q && results.length === 0 && (
          <div className='mt-10 text-center text-gray-600'>
            No results. Try a different keyword.
          </div>
        )}

        <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6'>
          {results.map(item => (
            <Link key={item._id} to={`/product/${item._id}`} className='group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition overflow-hidden'>
              <div className='relative'>
                <img src={item.image && item.image[0]} alt={item.name} className='w-full h-40 sm:h-48 object-cover' />
                <span className='absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-pink-100 text-pink-700 shadow'>View</span>
              </div>
              <div className='p-3 sm:p-4'>
                <p className='text-sm sm:text-base font-medium text-gray-900 line-clamp-1'>{item.name}</p>
                <div className='mt-2 text-sm text-gray-700'>₹{item.price}</div>
              </div>
              <div className='pointer-events-none h-0.5 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition' />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Search

