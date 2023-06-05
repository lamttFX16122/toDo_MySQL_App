import * as type from '../constants/actionType';
const initialState = {
    token: null,
    user: null,
    sessionId: null,
    loginFail: false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.accessToken,
                user: action.payload.user,
                sessionId: action.payload.sessionId,
                loginFail: false
            }
        case type.LOGIN_FAIL:
            return {
                ...state,
                loginFail: true
            }
        case type.LOGOUT_FAIL:
            return state;
        case type.LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                user: null,
                sessionId: null,
                loginFail: false
            };
        case type.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload
            }
        case type.REFRESH_TOKEN_FAIL:
            return state;
        case type.AUTH_CHANGE_INFO:
            return {
                ...state,
                user: action.payload
            }
        default: return state;
    }
}
export default authReducer;