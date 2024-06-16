import { createContext, useContext, useState } from 'react'
import { api } from '../services/api'

import PropTypes from 'prop-types'

export const AuthContext = createContext({})

function AuthProvider({children}) {
  const [ data, setData ] = useState({})

  async function signIn({email, password}) {
    try {
      const response = await api.post('/sessions', {email, password})
      const { user, token } = response.data

      api.defaults.headers.authorization = `Bearer ${token}`
      setData({user, token})

    } catch(error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert('Não foi possível acessar')
      }
    }
  }

  return (
    <AuthContext.Provider value={{signIn, user: data.user}}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth }