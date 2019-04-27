import ajax from '../../config/ajax'
import parseData from '../../utils/parseData'

const FETCH_LIST_BEGIN = 'discuss/FETCH_LIST_BEGIN'
const FETCH_LIST_SUCCESS = 'discuss/FETCH_LIST_SUCCESS'
const FETCH_LIST_ERROR = 'discuss/FETCH_LIST_ERROR'
const initState = {
    page: 1,
    items: [],
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
            return {
                ...state,
                items: [...state.items, ...action.data.items],
                page: action.data.page,
                total: action.data.total,
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

export const fetchDataList = (page) => async dispatch => {
    dispatch(fetchListPending())
    const res = await ajax('/getDailyPunch',{ page })
    const {code, msg, data} = parseData(res)
    if (code === 0) {
        dispatch(fetchListSuccess(data))
    } else {
        dispatch(fetchListError(msg))
    }
}

