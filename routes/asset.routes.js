const { Router } = require('express')
const config = require('config')
const auth = require('../middleware/auth.middleware')
const router = Router()


// /api/asset
router.post('/', auth, async (req, res) => {
    try {
        const name = req.body.name
        const price = req.body.price
        const quantity = req.body.quantity
        const asset = new Asset({
            name: name, price: price, quantity: quantity, owner: req.user.userId
        })
        await asset.save()
        res.status(201).json({ message: 'success' })
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.', error: err })
    }
})

// router.get('/', auth, async (req, res) => {
//     try {
//         const links = await Link.find({ owner: req.user.userId })
//         res.json(links)
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong. Please try again.'})
//     }
// })

// router.get('/:id', auth, async (req, res) => {
//     try {
//         const link = await Link.findById(req.params.id)
//         res.json(link)
//     } catch (err) {
//         res.status(500).json({ message: 'Something went wrong. Please try again.'})
//     }
// })

module.exports = router