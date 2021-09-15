const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')
const auth = require('../middleware/auth')

router.post('/', auth, function (req, res, next) {
  fileController.uploadFile(req, res, next)
})

router.delete('/:id', function (req, res, next) {
  fileController.deleteFile(req, res, next)
})

module.exports = router
