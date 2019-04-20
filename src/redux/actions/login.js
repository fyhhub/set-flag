import ajax from '../../config/ajax'
import { message } from 'antd'
import { setUserInfo } from './global'
import parseData from '../../utils/parseData'
const GET_AVATAR = 'login/GET_AVATAR'
const initState = {
    username: '',
    avatar: ''
}
export default (state = initState, action = {}) => {
    switch (action.type) {
        case GET_AVATAR:
            return {
                ...state,
                avatar: action.avatar,
                username: action.username
            }
        default:
            return state
    }
}
const getAvatarAction = ({avatar, username}) => ({
    type: GET_AVATAR,
    avatar,
    username
})
export const getAvatar =  (username) => async (dispatch) => {
    try {
        let res = await ajax('/login/getAvator', { username }, 'post')
        const {code, data} = parseData(res)
        if (code === 0) {
            dispatch(getAvatarAction({avatar: data.avatar, username}))
        }
    } catch(e) {
        console.log(e)
    }
}

export const login = (userInfo) => async (dispatch) => {
    try {
        message.loading('正在登录...', 0)
        const res = await ajax('/login', { ...userInfo }, 'post')
        const {code, msg, data} = parseData(res)
        message.destroy()
        if (code === 0) {
            message.success(msg, 2)
            dispatch(setUserInfo(data))
            window.localStorage.setItem('token', data.token)
        } else {
            message.error(msg, 3)
        }
    } catch(e) {
        message.destroy()
        message.error('登录失败,请检查网络状况', 3)
        console.log(e)
    }
}