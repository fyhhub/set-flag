import axios from 'axios'
// import '../mock/login'
import {message} from 'antd'
const Axios = axios.create({
    baseURL: 'http://172.20.10.9:8080',
    timeout: 5000,
    responseType: 'json',
    headers: {
        "Content-Type": "application/json",
    },
    
})
Axios.interceptors.request.use(config => {
    return config
}, error => {
    message.error('请求错误', 2)
    return Promise.reject(error)
})
Axios.interceptors.response.use(config => {
    return config
}, error => {
    message.error('响应错误', 2)
    return Promise.reject(error)
})
export default Axios
