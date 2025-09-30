import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log('Login/Register error:', error)
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error(error.message)
        }
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className='min-h-[80vh] grid place-items-center'>
      <div className='relative w-[90%] sm:max-w-md rounded-2xl overflow-hidden shadow-xl'>
        <div className='absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-yellow-500/20' />
        <div className='relative bg-white/90 backdrop-blur p-6 sm:p-8'>
          <div className='text-center mb-4'>
            <p className='text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600'>{currentState}</p>
            <p className='text-gray-500 text-sm mt-1'>Welcome{currentState === 'Login' ? ' back' : ''}! Please {currentState === 'Login' ? 'sign in' : 'create an account'} to continue.</p>
          </div>

          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 text-gray-800'>
            {currentState === 'Login' ? '' : (
              <input onChange={(e)=>setName(e.target.value)} value={name} type='text' className='w-full px-4 py-2.5 border rounded-lg border-gray-200 focus:border-pink-400 outline-none transition' placeholder='Name' required/>
            )}
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' className='w-full px-4 py-2.5 border rounded-lg border-gray-200 focus:border-pink-400 outline-none transition' placeholder='Email' required/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' className='w-full px-4 py-2.5 border rounded-lg border-gray-200 focus:border-pink-400 outline-none transition' placeholder='Password' required/>

            <div className='w-full flex justify-between text-sm -mt-1'>
              <p className='text-gray-500 cursor-pointer hover:text-pink-600 transition'>Forgot your password?</p>
              {
                currentState === 'Login' 
                ? <p onClick={()=>setCurrentState('Sign Up')} className='text-pink-600 cursor-pointer hover:underline'>Create account</p>
                : <p onClick={()=>setCurrentState('Login')} className='text-pink-600 cursor-pointer hover:underline'>Login Here</p>
              }
            </div>

            <button className='mt-2 inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 hover:opacity-95 active:opacity-90 transition'>
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
