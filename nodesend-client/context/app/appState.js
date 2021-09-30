import React, { useReducer } from 'react'
import appContext from './appContext'
import appReducer from './appReducer'
import clienteAxios from '../../config/axios'
import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
} from '../../types/index'

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombre_original: '',
    cargando: null,
    descargas: 1,
    password: '',
    autor: null,
    url: '',
  }

  //Crear dispatch y state
  const [state, dispatch] = useReducer(appReducer, initialState)

  //Muestra alerta
  const mostrarAlerta = msg => {
    console.log(msg)
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    })

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      })
    }, 3000)
  }

  //Sube los archivos al servidor
  const subirArchivo = async (formData, nombreArchivo) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    })
    try {
      const resultado = await clienteAxios.post('/api/files', formData)
      console.log(resultado.data)
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.file,
          nombre_original: nombreArchivo,
        },
      })
    } catch (error) {
      //console.log(error)
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      })
    }
  }

  // Crea un enlace una vez que se ha subido el archivo
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    }
    try {
      const resultado = await clienteAxios.post('/api/links', data)
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg,
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
      }}>
      {children}
    </appContext.Provider>
  )
}

export default AppState
