const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()
// const { Spot } = require('@binance/connector')

router.get('/', auth, async (req, res) => {
    try {
        const apiKey = 'MvTsaJbI7jCMdP39lsNEQUO2imdtXTskCfK5kinSWXIKHpk6BpQp9Ddu2JGoyBT8'
        const apiSecret = 'pUMWJnBEL0ZPTOVK8dqxbAIlA89qQB52iVmJNuEuyCri93yiO6n6TMWYXjxQU76M'
        const client = new Spot(apiKey, apiSecret)

        // Get account information
        const response = await client.account()
        const balances = response.data.balances
        res.status(200).json(balances.filter(balance => balance.free > 0 || balance.locked > 0))
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.'})
    }
})

module.exports = router