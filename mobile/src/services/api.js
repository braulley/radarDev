import axios from 'axios'

const api = axios.create({
    baseURL: `http://10.10.10.90:3000`
})

export default api;