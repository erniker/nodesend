const multer = require('multer')
const shortid = require('shortid')
const fs = require('fs')
const Link = require('../models/Link')

exports.uploadFile = async (req, res, next) => {
  const multerConfiguration = {
    limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + '/../uploads')
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf('.'),
          file.originalname.length
        )
        cb(null, `${shortid.generate()}${extension}`)
      },
    })),
  }
  const upload = multer(multerConfiguration).single('file')

  upload(req, res, async error => {
    if (!error) {
      res.status(200).json({ file: req.file.filename })
    } else {
      console.log(error)
      res.status(500).json({ msg: `Error uploading file: ${error}` })
      return next()
    }
  })
}

exports.deleteFile = async (req, res, next) => {
  console.log(req.file)
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`)
    console.log('archivo eliminado')
  } catch (error) {
    console.log('archivo eliminado')
  }
}

exports.download = async (rec, res, next) => {
  // Obtener Enlace
  const { file } = req.params
  const link = await Link.findOne({ nombre: file })

  console.log(file)

  const fileDownload = __dirname + '/../uploads' + file
  rest.download(fileDownload)

  // Eliminar el archivo y la enrada de la BD
  // Si las descargas son iguales a 1 -> Borrar registro y borrar archivo
  const { downloads, nombre } = link
  console.log(downloads)
  if (downloads === 1) {
    // Eliminar el archivo
    req.file = nombre
    // Eliminar de la base de datos
    await Links.findOneAndRemove(req.params.url)
    next()
  } else {
    // Si las descargas son mayores a 1 -> Restar 1
    link.downloads--
    await link.save()
  }
}
