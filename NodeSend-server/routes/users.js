const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/", function (req, res) {
  userController.newUser(req, res)
})

module.exports = router
