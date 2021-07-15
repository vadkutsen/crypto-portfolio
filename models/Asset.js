const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    price: {type: String, required: true},
    quantity: {type: String, required: true},
    name: {type: String, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Asset', schema)