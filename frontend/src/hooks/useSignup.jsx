
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
    const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (name,email, password)=> {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGOUT', payload: json})

      // update loading state
      setIsLoading(false)

      navigate('/login')
    }
  }

  return { signup, isLoading, error }
}