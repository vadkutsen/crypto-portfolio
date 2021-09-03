import axios from 'axios'

const token = localStorage.getItem('token')

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
})

export default {
  async getPrices(assets) {
    return await apiClient.get('/price?symbol=' + 'btc')
  },
}