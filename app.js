const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/api/asset', require('./routes/asset.routes'))
app.use('/api/binance', require('./routes/binance.routes'))
app.use('/api/price', require('./routes/price.routes'))
app.use('/api/metadata', require('./routes/metadata.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }))
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (err) {
        console.log('Server Error: ', err.message)
        process.exit(1)
    }
}

start()
