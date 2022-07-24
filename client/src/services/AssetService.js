import axios from 'axios'
import { get } from 'lodash'

const token = localStorage.getItem('token')

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
})

export default {
  async getAssets() {
    const assets = await apiClient.get('/asset')
    let assetNames = new Set()
    assets.data.forEach(asset => {
      assetNames.add(asset.name)
    })
    const prices = await apiClient.get('/price?symbol=' + Array.from(assetNames))
    assets.data.forEach(asset => {
      for (const price in prices.data.data) {
        if(price === asset.name) {
          const symbolPrice = _.get(prices.data.data, [price, 'quote', 'USD', 'price'], {})
          asset.currentPrice = symbolPrice.toFixed(6)
        }
      }
    })
    const info = await apiClient.get('/metadata?symbol=' + Array.from(assetNames))
    assets.data.forEach(asset => {
      for (const symbol in info.data.data) {
        if(symbol === asset.name) {
          const logo = _.get(info.data.data, [symbol, 'logo'], {})
          asset.logo = logo
        }
      }
    })
    return assets
  },

  async getAssetById(id) {
    const res = await apiClient.get('/asset/' + id)
    console.log('server response: ' + Array.from(res))
    return res
  },

  async createAsset(asset) {
    return await apiClient.post('/asset', asset)
  },

}