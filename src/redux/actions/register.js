import ajax from '../../config/ajax'
const VALIDATE_USERNAME = 'register/VALIDATE_USERNAME'
const initState = {
    validateUserNameStatus: ''
}
export default (state = initState, action = {}) => {
    switch (action.type) {
        case VALIDATE_USERNAME:
            return {
                ...state,
                validateUserNameStatus: action.status
            }
        default:
            return state
    }
}
const setValidateUserNameStatus = status => ({
    type: VALIDATE_USERNAME,
    status
})
export const validateUserName = (value) => async (dispatch) => {
    let { username, form } = value
    let data
    try {
        dispatch(setValidateUserNameStatus('validating'))
        let res = await ajax('/register/validate_username', {username})
        data = res.data
        if (data.code === 1) {
            dispatch(setValidateUserNameStatus('error'))
        } else if (data.code === 0){
            dispatch(setValidateUserNameStatus('success'))
        }
    } catch(e) {
        console.log(e)
    }
}
