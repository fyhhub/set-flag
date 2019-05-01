import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'
const FETCH_LIST_BEGIN = 'discuss/FETCH_LIST_BEGIN'
const FETCH_LIST_SUCCESS = 'discuss/FETCH_LIST_SUCCESS'
const FETCH_LIST_ERROR = 'discuss/FETCH_LIST_ERROR'
const ADD_LIST_ITEM = 'discuss/ADD_LIST_ITEM'
const SET_USERINFO = 'discuss/SET_USERINFO'
const SET_COMMENTS = 'discuss/SET_COMMENTS'
const SET_ARTICLES = 'discuss/SET_ARTICLES'
const SET_LOADEND = 'discuss/SET_LOADEND'
const initState = {
    items: [],
    pageList: {},
    total: 0,
    fetchListPending: false,
    fetchListError: null,
    listNeedReload: false,
    loadEnd: false,
    userInfo: {},
    comments: [],
    articles: []
}
export default (state = initState, action = {}) => {
    switch (action.type) {
        case FETCH_LIST_BEGIN:
            return {
                ...state,
                fetchListPending: true,
                fetchListError: null
            }
        case FETCH_LIST_SUCCESS: {
            const list = {}
            list[action.data.page] = true
            return {
                ...state,
                items: [...state.items, ...action.data.items],
                pageList: {
                    ...state.pageList,
                    ...list
                },
                fetchListPending: false,
                fetchListError: null
            }
        }
        case FETCH_LIST_ERROR: {
            return {
                ...state,
                fetchListPending: true,
                fetchListError: action.data
            }
        }

        case ADD_LIST_ITEM: {
            return {
                ...state,
                items: [action.data,...state.items]
            }
        }

        case SET_USERINFO: {
            return {
                ...state,
                userInfo: {
                    ...action.data
                }
            }
        }
        case SET_COMMENTS: {
            return {
                ...state,
                comments: [...action.data]
            }
        }
        case SET_ARTICLES: {
            return {
                ...state,
                articles: [...action.data]
            }
        }
        case SET_LOADEND: {
            return {
                ...state,
                loadEnd: true
            }
        }
        default:
            return state
    }
}

const fetchListPending = () => ({
    type: FETCH_LIST_BEGIN
})

const fetchListSuccess = (data) => ({
    type: FETCH_LIST_SUCCESS,
    data
})
const fetchListError = (data) => ({
    type: FETCH_LIST_ERROR,
    data
})

export const addListItem = data => ({
    type: ADD_LIST_ITEM,
    data
})

export const setUserInfo = data => ({
    type: SET_USERINFO,
    data
})

export const setComments = data => ({
    type: SET_COMMENTS,
    data
})
export const setArticles = data => ({
    type: SET_ARTICLES,
    data
})

export const setLoadEnd = () => ({
    type: SET_LOADEND
})


export const fetchDataList = (page) => async dispatch => {
    dispatch(fetchListPending())
    const res = await ajax('/getDailyPunch',{ page })
    const {code, msg, data} = parseData(res)
    
    if (data.items.length === 0) {
        dispatch(setLoadEnd())
    }
    if (code === 0) {
        dispatch(fetchListSuccess({...data, page}))
    } else {
        dispatch(fetchListError(msg))
    }
}

