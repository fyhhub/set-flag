const LINK_TO = 'route/LINK_TO'
const initState = {
    path: '/',
    isTo: false
}
export default (state = initState, action = {}) => {
    switch (action.type) {
        case LINK_TO:
            return {
                ...state,
                path: action.path,
                isTo: action.isTo
            }
        default:
            return state
    }
}

