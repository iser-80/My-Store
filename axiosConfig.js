import axios from 'axios'

const token = localStorage.getItem('token')

const axiosConfig = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export default axiosConfig
