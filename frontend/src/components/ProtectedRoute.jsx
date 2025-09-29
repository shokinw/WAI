import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextProvider'

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
