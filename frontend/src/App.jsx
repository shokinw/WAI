import React from 'react'
import {Route, Routes} from 'react-router-dom' 
import WAI from './pages/WAI'
import Collection from './pages/Collection'
import Login from './pages/Login'
import Order from './pages/Orders'
import Profile from './pages/Profile'
import Delivery from './pages/Delivery'
import Returns from './pages/Returns'
import PaymentMethods from './pages/PaymentMethods'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import Offers from './pages/Offers'
import PlaceOrder from "./pages/PlaceOrder";
import Product from './pages/Product'
import Cart from './pages/Cart'
import Navbar from './components/Navbar' 
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import BigBanner from './components/BigBanner'
import SearchBar from './components/SearchBar'
import More from './pages/More'
import Sale from './pages/Sale'
import Search from './pages/Search'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar/>
      {/* Spacer to offset fixed navbar - Responsive */}
      <div className="h-16 sm:h-20 md:h-24 lg:h-28"></div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SearchBar/>
      <main className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Routes>
  <Route path='/login' element={<Login/>} />

  <Route path='/' element={<ProtectedRoute><WAI/></ProtectedRoute>} />
  <Route path='/collection' element={<ProtectedRoute><Collection/></ProtectedRoute>} />
  <Route path='/orders' element={<ProtectedRoute><Order/></ProtectedRoute>} />
  <Route path='/order' element={<ProtectedRoute><Order/></ProtectedRoute>} />
  <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
  <Route path="/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
  <Route path='/product/:productId' element={<ProtectedRoute><Product/></ProtectedRoute>} />
  <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
  <Route path='/more' element={<ProtectedRoute><More/></ProtectedRoute>} />
  <Route path='/sale' element={<ProtectedRoute><Sale/></ProtectedRoute>} />
  <Route path='/search' element={<ProtectedRoute><Search/></ProtectedRoute>} />
  {/* Info pages - public */}
  <Route path='/delivery' element={<Delivery/>} />
  <Route path='/returns' element={<Returns/>} />
  <Route path='/payment-methods' element={<PaymentMethods/>} />
  <Route path='/contact' element={<Contact/>} />
  <Route path='/faqs' element={<FAQs/>} />
  <Route path='/offers' element={<Offers/>} />
        </Routes>
      </main>
      <BigBanner/>
      <Footer/>
    </div>
  )
}

export default App