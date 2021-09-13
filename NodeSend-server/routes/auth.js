const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { check } = require("express-validator")

router.post("/", function (req, res, next) {
  authController.userAuthentication(req, res, next)
})

router.get("/", function (req, res) {
  authController.authenticatedUser(req, res, next)
})

module.exports = router
