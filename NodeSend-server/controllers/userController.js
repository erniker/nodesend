const User = require("../models/User")
exports.newUser = async (req, res) => {
  try {
    const user = await new User(req.body)
    user.save()
    res.json({ msg: "User created successfully" })
  } catch (error) {
    res.json({
      msg: "Error creating user",
      err: error,
    })
  }
}

try {
} catch (error) {}
