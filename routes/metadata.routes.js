const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()
const metadataController = require('../controllers/metadata.controller')

router.get('/', metadataController.getLogo)

module.exports = router