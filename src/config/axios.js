import axios from 'axios'
// import '../mock/login'
import {message, Modal} from 'antd'
import store from '../redux/store'
const Axios = axios.create({
    baseURL: 'http://172.17.0.6:8080/setFlag',
    timeout: 5000,
    responseType: 'json',
    headers: {
        "Content-Type": "application/json",
    }
})

Axios.interceptors.request.use(config => {
    let token = window.localStorage.getItem('token')
    let url = config.url
    if (!token && url.indexOf('login') === -1 && url.indexOf('register') === -1) {
        Modal.confirm({
            title: '访问该资源需要登录，是否前往登录',
            onOk() {
                store.dispatch({type: 'route/LINK_TO', path: '/login', isTo: true})
                store.dispatch({type: 'route/LINK_TO', path: '/login', isTo: false})
            },
            onCancel() {
                
            },
            okText:'确认',
            cancelText: '取消'
        })
    } else {
        config.headers['Authorization'] = 'JWT ' + token
    }
    return config
}, error => {
    message.error(error,2)
    return Promise.reject(error)
})


Axios.interceptors.response.use(config => {
    let { msg } = config.data
    if (config.data.code === 0 && config.data.isShow) {
        message.success(msg, 2)
    }
    return config
}, error => {
    if (error.response) {
        switch(error.response.status) {
            case 403:
                message.warning('没有权限',2)
                break
            case 401:
                message.error('身份验证过期，请重新登录！',2)
                if (window.localStorage.getItem('token')) {
                    window.localStorage.removeItem('token')
                }
                Modal.confirm({
                    title: '身份验证过期，是否前往登录',
                    onOk() {
                        store.dispatch({type: 'route/LINK_TO', path: '/login', isTo: true})
                    },
                    onCancel() {},
                    okText:'确认',
                    cancelText: '取消'  
                })
                break
            case 500: 
                message.error('服务器出错！',23)
                break
            case 504:
                message.error('网络超时！',2)
                break
            default:
                break
        }
    } else {
        message.error('请求超时',2)
    }
    return Promise.reject(error)
})
export default Axios
