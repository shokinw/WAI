import React from 'react'
import Title from '../components/Title'

const Delivery = () => {
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
      </div>
      <div className='mt-6 space-y-4 text-gray-700'>
        <p>We ship orders within 24–48 hours. Standard delivery takes 3–7 business days.</p>
        <ul className='list-disc pl-6 space-y-2 text-sm'>
          <li>Free delivery on orders above ₹999.</li>
          <li>Real-time tracking via My Orders.</li>
          <li>COD available in eligible locations.</li>
        </ul>
      </div>
    </div>
  )
}

export default Delivery
