import React from 'react'
import Title from '../components/Title'

const FAQs = () => {
  const items = [
    { q: 'When will my order ship?', a: 'Within 24–48 hours.' },
    { q: 'How do I return?', a: 'Go to My Orders and choose Return.' },
    { q: 'Which payments are accepted?', a: 'UPI, Cards, Net Banking, COD.' },
  ]
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'FREQUENTLY'} text2={'ASKED QUESTIONS'} />
      </div>
      <div className='mt-6'>
        {items.map((it, i) => (
          <details key={i} className='border-b py-4'>
            <summary className='font-medium cursor-pointer'>{it.q}</summary>
            <p className='text-sm text-gray-600 mt-2'>{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

export default FAQs
