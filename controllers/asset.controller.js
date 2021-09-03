const Asset = require('../models/Asset')
const metadataController = require('../controllers/metadata.controller')

const _ = require('lodash')

const newAsset = async (req, res, next) => {
    const {name, price, quantity} = req.body
    const asset = new Asset({
        name, price, quantity, owner: req.user.userId
    })
    try {
        await asset.save()
        res.status(201).json({ asset })
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.' + err})
    }
    next()
}

const getAssets = async (req, res, next) => {
    try {
        const assets = await Asset.find({ owner: req.user.userId })
        let assetNames = new Set()
        assets.forEach(asset => {
            assetNames.add(asset.name)
        })
        let averaged = []
        assetNames.forEach(assetName => {
            let filtered = assets.filter(asset => assetName === asset.name)
            let totalQuantity = 0
            let totalPrice = 0
            let currentPrice = 0
            filtered.forEach(asset => {
                totalQuantity += parseFloat(asset.quantity)
                totalPrice += parseFloat(asset.price) * parseFloat(asset.quantity)
            })
            averaged.push({
                name: assetName,
                quantity: totalQuantity,
                price: totalPrice/totalQuantity,
                currentPrice: currentPrice,
            })
        })
        res.json(_.sortBy(averaged, 'name'))
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.' + err})
    }
}

const getAsset = async (req, res, next) => {
    try {
        const assets = await Asset.find({ name: req.params.symbol.toUpperCase() })
        res.json(_.sortBy(assets, 'date'))
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.' + err})
    }
}

module.exports = {
    newAsset,
    getAssets,
    getAsset
}