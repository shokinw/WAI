import React from 'react'
import Title from '../components/Title'

const Contact = () => {
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='mt-6 text-gray-700'>
        <p className='text-sm'>For support, email support@example.com or call +91-00000-00000.</p>
        <form className='mt-4 grid gap-3 max-w-md'>
          <input className='border rounded px-3 py-2' placeholder='Your Name' />
          <input className='border rounded px-3 py-2' placeholder='Email' />
          <textarea className='border rounded px-3 py-2' placeholder='Message' rows={4} />
          <button className='bg-black text-white px-5 py-2 rounded'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
