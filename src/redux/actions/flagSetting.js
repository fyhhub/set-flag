import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
const SET_LOADED = 'flagSetting/SET_LOADED'
const SET_SUCCESS = 'flagSetting/SET_SUCCESS'
const SET_FLAGS = 'flagSetting/SET_FLAGS'
const SET_TASKS = 'flagSetting/SET_TASKS'
const initState = {
    isLoaded: false,
    isSuccess: false,
    flags: [],
    visible: false,
    confirmLoading: false,
    tasks: []
}
export default (state = initState, action = {}) => {
    switch (action.type) {
        case SET_LOADED:
            return {
                ...state,
                isLoaded: action.isLoaded
            }
        case SET_SUCCESS:
            return {
                ...state,
                isSuccess: action.isSuccess
            }
        case SET_FLAGS:
            return {
                ...state,
                flags: [...action.flags]
            }

        case SET_TASKS:
            return {
                ...state,
                tasks: [...action.tasks]
            }
        default:
            return state
    }
}

const setLoaded = isLoaded => ({
    type: SET_LOADED,
    isLoaded
})
const setSuccess = isSuccess => ({
    type: SET_SUCCESS,
    isSuccess
})

const setFlags = flags => ({
    type: SET_FLAGS,
    flags
})

export const getFlags = ({ offset, page }) => async dispatch => {
    try {
        dispatch(setLoaded(true))
        dispatch(setSuccess(false))
        let res = await ajax('/getFlags', { offset, page })
        let { code, data } = parseData(res)
        if (code === 0) {
            dispatch(setLoaded(false))
            dispatch(setSuccess(true))
            dispatch(setFlags(data))
        }
    } catch(e) {
        console.log(e)  
    }
}



export const setTasks = tasks => ({
    type: SET_TASKS,
    tasks
}) 

export const getTasks = () => async dispatch => {
    let res = await ajax('/getTasks', { token: window.localStorage.getItem('token'), all: true })
    let { code, data } = parseData(res)
    if (code === 0) {
        dispatch(setTasks(data))
    }
}



