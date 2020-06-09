import axios from 'axios'

axios.interceptors.response.use((res) => {
    return res.data ? res.data : {};
}, err => {
    return Promise.reject(error)
})

export default axios;