import axios from 'axios'

const API = axios.create({
  baseURL: 'https://budget-tracker-vx5n.onrender.com/api'
})

export default API
