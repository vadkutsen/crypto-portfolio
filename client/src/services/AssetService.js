import axios from 'axios'
import { json } from 'express'

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
    console.log('prices.data: ' + prices.data)
    let assetsWithCurrentPrice = []
    assets.data.forEach(asset => {
      const price = prices.data.filter((p) => p.key() === asset.name).quote.USD.price
      assetsWithCurrentPrice.push(...asset, {currentPrice: price})
    })
    console.log(assetsWithCurrentPrice)
    return assetsWithCurrentPrice
  },

  async createAsset(asset) {
    return await apiClient.post('/asset', asset)
  },
}