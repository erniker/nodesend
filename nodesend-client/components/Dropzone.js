import React, { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import clienteAxios from '../config/axios'
import appContext from '../context/app/appContext'

const Dropzone = () => {
  const AppContext = useContext(appContext)
  const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = AppContext

  const onDropRejected = () => {
    mostrarAlerta(
      'El archivo es demasiado grande, el limite es 1MB. Crea una cuenta gratis para subir archivos más grandes'
    )
  }

  const onDropAccepted = useCallback(async acceptedFiles => {
    //Crear un formData
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])

    subirArchivo(formData, acceptedFiles[0].path)
  }, [])

  // Extraer contenido de Dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 })

  const archivos = acceptedFiles.map(archivo => (
    <li
      key="archivo.lastModified"
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
      <p className="font-bold text-xl">{archivo.path}</p>
      <p className="text-sm text-gray-500">
        {(archivo.size / Math.pow(1024, 2)).toFixed(2)} Mb
      </p>
    </li>
  ))

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{archivos}</ul>
          {cargando ? (
            <p className="my-10 text-center text-gray-600">
              Subiendo archivo...
            </p>
          ) : (
            <button
              type="button"
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
              onClick={() => crearEnlace()}>
              {' '}
              Crear Enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
          <input className="h-100" {...getInputProps()} />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suelta el archivo
            </p>
          ) : (
            <div className="text-center">
              {' '}
              <p className="text-2xl text-center text-gray-600">
                Sellecione un archivo y arrastrelo aquí
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button">
                Selecciona archivos para subir
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Dropzone
