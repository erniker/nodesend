const express = require('express')
const router = express.Router()
const linkController = require('../controllers/linkController')
const fileController = require('../controllers/fileController')
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

router.get(
  '/:url',
  function (req, res, next) {
    linkController.getLink(req, res, next)
  },
  function (req, res, next) {
    fileController.deleteFile(req, res, next)
  }
)

module.exports = router
