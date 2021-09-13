const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: ".env" })

exports.userAuthentication = async (req, res, next) => {
  // Revisar si hay errores
  // Buscar el usuario para ver si está registrado
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(401).json({ msg: "User does not exists" })
    return next()
  }
  // Verificar el password y autenticar el usuario
  if (bcrypt.compareSync(password, user.password)) {
    // Crear JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "8h" }
    )
    res.status(200).json({ token })
  } else {
    res.status(401).json({ msg: "Password incorrect" })
    return next()
  }
}

exports.authenticatedUser = async (req, res) => {}
