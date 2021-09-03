const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()
const assetController = require('../controllers/asset.controller')

// /api/asset
router.post('/', auth, assetController.newAsset)

router.get('/', auth, assetController.getAssets)

router.get('/:symbol', auth, assetController.getAsset)

module.exports = router