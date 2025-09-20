import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({children}) {
    const {user} = useAuth()
    const navigate = useNavigate()
    if(!user){
        return <Navigate to="/login" replace />
    }
  return children;
}

export default ProtectedRoute