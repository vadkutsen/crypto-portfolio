import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Accept: 'application/json',
  },
})
export default {
  logIn(data) {
    return apiClient.post('/auth/login', data)
  },
  register(data) {
    return apiClient.post('/auth/register', data)
  },
}