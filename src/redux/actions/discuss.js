import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'

const FETCH_LIST_BEGIN = 'discuss/FETCH_LIST_BEGIN'
const FETCH_LIST_SUCCESS = 'discuss/FETCH_LIST_SUCCESS'
const FETCH_LIST_ERROR = 'discuss/FETCH_LIST_ERROR'
const ADD_LIST_ITEM = 'discuss/ADD_LIST_ITEM'
const initState = {
    items: [],
    pageList: {},
    total: 0,
    fetchListPending: false,
    fetchListError: null,
    listNeedReload: false,



    
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
            console.log(action.data);
            
            return {
                ...state,
                items: [...state.items, action.data]
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



export const fetchDataList = (page) => async dispatch => {
    dispatch(fetchListPending())
    const res = await ajax('/getDailyPunch',{ page })
    const {code, msg, data} = parseData(res)
    if (code === 0) {
        dispatch(fetchListSuccess({...data, page}))
    } else {
        dispatch(fetchListError(msg))
    }
}

