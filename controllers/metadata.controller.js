const axios = require('axios')

const axiosInstance = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': '5e19c88d-2095-4017-8bbd-d2772ec2322f'
    }
  });

const getLogo = async (req, res, next) => {
    try {
        const response = await axiosInstance.get('/cryptocurrency/info?symbol=' + req.query.symbol.toLowerCase())
        // process your data and send back to the user
        // const logo = response.data[0].logo
        res.status(200).json(response.data)
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again.' + err})
    }
}


module.exports = {
    getLogo
}