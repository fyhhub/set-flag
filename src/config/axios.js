import axios from 'axios'
import '../mock/login'

import {message} from 'antd'
const Axios = axios.create({
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,  // 支持跨域携带cookie
    headers: {
        "Content-Type": "application/json"
    },
})
Axios.interceptors.request.use(config => {
    console.log(config);
    return config
}, error => {
    message.error('请求错误', 2)
    return Promise.reject(error)
})
Axios.interceptors.response.use(config => {
    console.log(config);
    return config
}, error => {
    message.error('响应错误', 2)
    return Promise.reject(error)
})
export default Axios
