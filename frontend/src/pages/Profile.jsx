import React, { useContext, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContextProvider'
import Title from '../components/Title'
import Orders from './Orders'

const Profile = () => {
  const { token } = useContext(ShopContext)
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = useMemo(() => ([
    { key: 'profile', label: 'My Profile' },
    { key: 'orders', label: 'Orders' },
  ]), [])

  if (!token) {
    return (
      <div className='border-t pt-16'>
        <div className='text-2xl'>
          <Title text1={'MY'} text2={'PROFILE'} />
        </div>
        <p className='mt-4 text-gray-600'>Please log in to view your profile and orders.</p>
      </div>
    )
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      <div className='mt-6 border-b flex gap-6 text-sm sm:text-base'>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`pb-3 -mb-[1px] border-b-2 transition ${activeTab === t.key ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className='mt-6'>
        {activeTab === 'profile' && (
          <div className='grid gap-6 sm:grid-cols-2'>
            <div className='p-5 border rounded-md'>
              <h3 className='font-medium mb-3'>Account Details</h3>
              <p className='text-gray-500 text-sm'>Name: —</p>
              <p className='text-gray-500 text-sm'>Email: —</p>
              <p className='text-gray-500 text-sm'>Phone: —</p>
            </div>
            <div className='p-5 border rounded-md'>
              <h3 className='font-medium mb-3'>Addresses</h3>
              <p className='text-gray-500 text-sm'>No saved addresses.</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && <Orders />}
      </div>
    </div>
  )
}

export default Profile
