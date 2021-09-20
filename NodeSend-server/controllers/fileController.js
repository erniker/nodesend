const multer = require('multer')
const shortid = require('shortid')
const fs = require('fs')

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
