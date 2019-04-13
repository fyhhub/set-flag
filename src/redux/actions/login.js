import ajax from '../../config/ajax'
import { message } from 'antd'
import { setUserInfo } from './global'
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
        let { data } = await ajax('/login/getAvator', { username }, 'post')
        let { code } = data
        let { avatar } = data.data
        if (code === 0) {
            dispatch(getAvatarAction({avatar: avatar, username}))
        }
    } catch(e) {
        console.log(e)
    }
}

export const login = (userInfo) => async (dispatch) => {
    try {
        message.loading('正在登录...', 0)
        let { data } = await ajax('/login', { ...userInfo }, 'post')
        let { code, msg } = data
        let { token } = data.data
        message.destroy()
        if (code === 0) {
            message.success(msg, 2)
            dispatch(setUserInfo(data.data))
            window.localStorage.setItem('token', token)
        } else {
            message.error(msg, 3)
        }
    } catch(e) {
        message.destroy()
        message.error('登录失败,请检查网络状况', 3)
        console.log(e)
    }
}