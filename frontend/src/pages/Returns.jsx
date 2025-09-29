import React from 'react'
import Title from '../components/Title'

const Returns = () => {
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'RETURN &'} text2={'REFUND POLICY'} />
      </div>
      <div className='mt-6 space-y-4 text-gray-700'>
        <p>Hassle-free returns within 7 days of delivery for unused items.</p>
        <ul className='list-disc pl-6 space-y-2 text-sm'>
          <li>Initiate return from My Orders.</li>
          <li>Refunds processed to original payment method within 5–7 days.</li>
          <li>Exchange available for size issues.</li>
        </ul>
      </div>
    </div>
  )
}

export default Returns
