const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
require("dotenv").config({ path: ".env" })

exports.userAuthentication = async (req, res, next) => {
  // Show express validator error
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

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

exports.authenticatedUser = (req, res, next) => {
  const authHeader = req.get("Authorization")

  if (authHeader) {
    // Obtener el token
    const token = authHeader.split(" ")[1]
    // Comprobar el JWT
    try {
      const user = jwt.verify(token, process.env.SECRET)
      res.status(200).json(user)
    } catch (error) {
      res.status(401).json({ error: "JWT not valid" })
    }
  }
  return next()
}
