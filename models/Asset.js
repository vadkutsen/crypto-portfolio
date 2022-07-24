const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    price: {type: String, required: true},
    quantity: {type: String, required: true},
    name: {type: String, required: true},
    date: {type: Date, default: Date.now},
    type: {type: String, required: true},
    targetPrice: {type: String, default: 0},
    notes: {type: String},
    location: {type: String},
    unlock: {type: Date},
    owner: {type: Types.ObjectId, ref: 'User'},
})

module.exports = model('Asset', schema)