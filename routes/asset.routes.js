const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()
const assetController = require('../controllers/asset.controller')

// /api/asset
router.post('/', auth, assetController.newAsset)

router.get('/', auth, assetController.getAssets)

router.get('/:symbol', auth, assetController.getAsset)

/* GET asset edit /asset/:symbol/edit */
router.get('/:symbol/edit', auth, assetController.editAsset)

/* PUT asset update /asset/:symbol */
router.put('/:symbol', auth, assetController.updateAsset)

/* DELETE asset destroy /asset/:id */
router.delete('/:id', auth, assetController.deleteAsset);

module.exports = router