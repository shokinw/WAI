import React from 'react'
import {Route, Routes} from 'react-router-dom' 
import WAI from './pages/WAI'
import Collection from './pages/Collection'
import Login from './pages/Login'
import Order from './pages/Orders'
import PlaceOrder from "./pages/PlaceOrder";
import Product from './pages/Product'
import Cart from './pages/Cart'
import Navbar from './components/Navbar' 
import Footer from './components/Footer'
import BigBanner from './components/BigBanner'
import SearchBar from './components/SearchBar'
import More from './pages/More'
import Sale from './pages/Sale'
import Search from './pages/Search'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      {/* Spacer to offset fixed navbar */}
      <div className="h-20 sm:h-24 md:h-28"></div>
      <ToastContainer/>
      <SearchBar/>
     <Routes>
  <Route path='/' element={<WAI/>} />
  <Route path='/collection' element={<Collection/>} />
  <Route path='/login' element={<Login/>} />
  <Route path='/orders' element={<Order/>} />        {/* Matches navigate("/order") */}
  <Route path="/place-order" element={<PlaceOrder />} />
  <Route path='/product/:productId' element={<Product/>} />
  <Route path='/cart' element={<Cart/>} />
  <Route path='/more' element={<More/>} />
  <Route path='/sale' element={<Sale/>} />
  <Route path='/search' element={<Search/>} />
</Routes>

     <BigBanner/>
     <Footer/>
    </div>
  )
}

export default App