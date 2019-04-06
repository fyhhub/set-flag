import axios from 'axios'
import {message} from 'antd'
const Axios = axios.create({
    baseURL: '/',
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,  // 支持跨域携带cookie
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
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
