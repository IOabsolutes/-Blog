import axios from 'axios'
//setting up base url
const instance = axios.create({
    baseURL: 'http://localhost:4420',
})
// add to every request Autorization and add there item from localStorage 'auth-token
instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('auth-token')
    return config
})
export default instance;