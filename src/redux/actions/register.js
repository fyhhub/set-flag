import ajax from '../../config/ajax'
import { setUserInfo } from './global'
import parseData from '../../utils/parseData'
const VALIDATE_USERNAME = 'register/VALIDATE_USERNAME'
const initState = {
    validateUserNameStatus: '',
    help:''
}

export default (state = initState, action = {}) => {
    switch (action.type) {
        case VALIDATE_USERNAME:
            return {
                ...state,
                validateUserNameStatus: action.status,
                help: action.help
            }
        default:
            return state
    }
}
export const setValidateUserNameStatus = (status, help='') => ({
    type: VALIDATE_USERNAME,
    status,
    help
})
export const validateUserName = value => async dispatch => {
    let { userName } = value
    try {
        dispatch(setValidateUserNameStatus('validating'))
        const res = await ajax('/register/validate_username', { userName }, 'post')
        const {code, msg} = parseData(res)
        if (code === 1) {
            dispatch(setValidateUserNameStatus('error', msg))
        } else if (code === 0) {
            dispatch(setValidateUserNameStatus('success'))
        }
    } catch (e) {
        dispatch(setValidateUserNameStatus('error', '请检查网络状况'))
        console.log(e)
    }
}

export const register = values => async dispatch => {
    try {
        const res = await ajax('/register', values, 'post')
        const {code, data} = parseData(res)
        if (code === 0) {
            window.localStorage.setItem('token', data.token)
            dispatch(setUserInfo(data))
        }
    } catch (e) {
        console.log(e)
    }
}
