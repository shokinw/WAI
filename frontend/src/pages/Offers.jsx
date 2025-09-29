import React from 'react'
import Title from '../components/Title'

const Offers = () => {
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'OFFERS &'} text2={'DEALS'} />
      </div>
      <div className='mt-6 grid gap-4 sm:grid-cols-2'>
        <div className='p-4 border rounded-md bg-white/70'>
          <p className='font-medium'>Festive Sale</p>
          <p className='text-sm text-gray-600'>Up to 50% off on select items.</p>
        </div>
        <div className='p-4 border rounded-md bg-white/70'>
          <p className='font-medium'>New User Offer</p>
          <p className='text-sm text-gray-600'>Flat ₹150 off on first order.</p>
        </div>
      </div>
    </div>
  )
}

export default Offers
