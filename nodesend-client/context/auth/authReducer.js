import { USUARIO_AUTENTICADO } from '../../types'

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
      }
    default:
      return state
  }
}
