import React from 'react'
import Title from '../components/Title'

const PaymentMethods = () => {
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'PAYMENT'} text2={'METHODS'} />
      </div>
      <div className='mt-6 space-y-4 text-gray-700'>
        <ul className='list-disc pl-6 space-y-2 text-sm'>
          <li>Cards (Visa, Mastercard, RuPay)</li>
          <li>UPI, Net Banking</li>
          <li>Wallets and Cash on Delivery</li>
          <li>Online payments powered by Razorpay</li>
        </ul>
      </div>
    </div>
  )
}

export default PaymentMethods
