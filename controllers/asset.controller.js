const Asset = require('../models/Asset')
const metadataController = require('../controllers/metadata.controller')

const _ = require('lodash')

const newAsset = async (req, res, next) => {
    const {name, price, quantity, type, targetPrice, notes} = req.body
    const asset = new Asset({
        name, price, quantity, type, targetPrice, notes, owner: req.user.userId
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
            let buyQuantity = 0
            let totalAmount = 0
            let sellAmount = 0
            let currentPrice = 0
            let targetPrice = '0'
            let location = ''
            let unlock = null
            let notes = []
            let logo = ''
            let realizedProfit = 0
            filtered.forEach(asset => {
                if (asset.type === 'buy') {
                    totalQuantity += parseFloat(asset.quantity)
                    buyQuantity += parseFloat(asset.quantity)
                    totalAmount += parseFloat(asset.price) * parseFloat(asset.quantity)
                    if (asset.targetPrice && asset.targetPrice != 0 && asset.targetPrice != '0') {
                        targetPrice = asset.targetPrice
                    }
                    if (asset.location && asset.location.length > 0) {
                        location = asset.location
                    }
                    if (asset.unlock) {
                        unlock = asset.unlock
                    }
                } else {
                    totalQuantity -= parseFloat(asset.quantity)
                    realizedProfit += parseFloat(asset.price) * parseFloat(asset.quantity)
                    // TODO: Update amount
                    sellAmount += parseFloat(totalAmount/buyQuantity) * parseFloat(asset.quantity)
                }
                if (asset.notes) {
                    notes.push(asset.notes)
                }
            })
            if (totalQuantity > 0) {
                averaged.push({
                    name: assetName,
                    quantity: totalQuantity,
                    amount: totalAmount - sellAmount,
                    price: totalAmount/buyQuantity,
                    location: location,
                    unlock: unlock,
                    realizedProfit: realizedProfit,
                    currentPrice: currentPrice,
                    targetPrice: targetPrice,
                    logo: logo,
                    notes: notes
                })
            }
        })
        res.json(_.sortBy(averaged, 'name'))
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.' + err})
    }
}

const getAsset = async (req, res, next) => {
    try {
        const assets = await Asset.find({ owner: req.user.userId })
        const filtered = assets.filter(asset => req.params.symbol.toUpperCase() === asset.name)
        res.json(_.sortBy(filtered, 'date'))
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.' + err})
    }
}

const editAsset = async (req, res, next) => {
    try {
        const asset = await Asset.findOne({ _id: req.params.id })
        console.log('server.editAsset: ' + asset)
        res.json(asset)
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.' + err})
    }
}

const updateAsset = async (req, res, next) => {
    try {
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.' + err})
    }
}

const deleteAsset = async (req, res, next) => {
    try {
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.' + err})
    }
}

module.exports = {
    newAsset,
    getAssets,
    getAsset,
    editAsset,
    updateAsset,
    deleteAsset
}