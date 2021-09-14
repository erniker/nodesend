const Links = require('../models/Link')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.newLink = async (req, res, next) => {
  // Revisar si hay erroes
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  // Crear objeto
  const { original_name } = req.body

  const link = new Links()
  link.url = shortid.generate()
  link.name = shortid.generate()
  link.original_name = original_name

  // Si el usuario está autenticado
  if (req.user) {
    const { password, downloads } = req.body

    // Asignar a enlace el número de descargas
    if (downloads) {
      link.downloads = downloads
    }
    // Asignar un password
    if (password) {
      const salt = await bcrypt.genSalt(10)
      link.password = await bcrypt.hash(password, salt)
    }
    // Asignar el autor
    link.author = req.user.id
  }
  // Almacenar en la BD
  try {
    await link.save()
    res.status(200).json({ msg: `${link.url}` })
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).res.json({
      msg: 'Error creating archive url',
    })
  }
}
