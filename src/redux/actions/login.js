import ajax from '../../config/ajax'
import { message } from 'antd'

const GET_AVATAR = 'login/GET_AVATAR'
const LOGIN = 'login/LOGIN'
const initState = {
    username: '',
    token: '',
    avatar: '',
}
export default (state = initState, action = {}) => {
    switch (action.type) {
        case GET_AVATAR:
            return {
                ...state,
                avatar: action.avatar,
                username: action.username
            }
        case LOGIN:
            return {
                ...state,
                username: action.username,
                token: action.token
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
    let data
    try {
        let res = await ajax('/login/getAvatar', { username })
        data = res.data
        if (data.code === 0) {
            dispatch(getAvatarAction({avatar: data.data.avatar, username}))
        }
    } catch(e) {
        console.log(e)
    }
}

const loginAction = (userInfo) => ({
    type: LOGIN,
    ...userInfo
})
export const login = (userInfo) => async (dispatch) => {
    let data
    try {
        message.loading('正在登录...', 0)
        let res = await ajax('/login', { ...userInfo }, 'post')
        data = res.data
        message.destroy()
        if (data.code === 0) {
            message.success(data.msg, 2)
            dispatch(loginAction(res))
        } else {
            message.error(data.msg, 3)
        }
    } catch(e) {
        message.destroy()
        message.error('登录失败,请检查网络状况', 3)
        console.log(e)
    }
}