const express = require('express')
const router = express.Router()
const linkController = require('../controllers/linkController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post(
  '/',
  [
    check('name', 'Upload a file').not().isEmpty(),
    check('original_name', 'Upload a file').not().isEmpty(),
  ],
  auth,
  function (req, res, next) {
    linkController.newLink(req, res, next)
  }
)

module.exports = router
