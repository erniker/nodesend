import authContext from './authContext'
import React, { useReducer } from 'react'
import authReducer from './authReducer'
import { USUARIO_AUTENTICADO } from '../../types'

const AuthState = ({ children }) => {
  // Estate Inicial
  const initalState = {
    token: '',
    autenticado: null,
    usuario: null,
    mensaje: null,
  }
  // Definición del Reducer
  const [state, dispatch] = useReducer(authReducer, initalState)

  // Usuario autenticado
  const usuarioAutenticado = nombre => {
    dispatch({
      type: USUARIO_AUTENTICADO,
      payload: nombre,
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        usuarioAutenticado,
      }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthState
