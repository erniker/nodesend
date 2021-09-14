const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { check } = require("express-validator")

router.post(
  "/",
  [
    check("email", "Email must be a valid email").isEmail(),
    check("password", "Password can not be empty").not().isEmpty(),
  ],
  function (req, res, next) {
    authController.userAuthentication(req, res, next)
  }
)

router.get("/", function (req, res, next) {
  authController.authenticatedUser(req, res, next)
})

module.exports = router
