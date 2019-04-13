const SET_USER_INFO = 'global/SET_USER_INFO'
const initState = {
    token: '',
    userInfo: {
        userName: '',
        sex: '',
        email: '',
        avatar: '',
        nickname: '',
        score: 0
    }
}
export default (state = initState, action = {}) => {
  switch (action.type) {
    case SET_USER_INFO:
        let userInfo = action.userInfo
        return {
            ...state,
            userInfo: userInfo
        }
    default:
      return state;
  }
};
export const setUserInfo = (values) => {
    return {
        type: SET_USER_INFO,
        userInfo: values
    }
}


