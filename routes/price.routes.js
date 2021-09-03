const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const router = Router()
const axios = require('axios')

const axiosInstance = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1',
    qs: {
      'start': '1',
      'limit': '5000',
      'convert': 'USD'
    },
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': '5e19c88d-2095-4017-8bbd-d2772ec2322f'
    }
  });

router.get('/', async (req, res) => {
    try {
        const response = await axiosInstance.get('/cryptocurrency/quotes/latest?symbol=' + req.query.symbol.toLowerCase())
        // process your data and send back to the user
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({ message: 'Cannot get prices. Please try again.'})
    }
})

module.exports = router