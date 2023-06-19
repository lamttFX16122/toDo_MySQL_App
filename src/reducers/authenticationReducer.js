import * as type from '../constants/actionType';
let initialState = {
    token: null,
    user: null,
    sessionId: null,
    loginFail: false,
    refreshToken: null,
    refreshTokenFail: false
}
let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.accessToken,
                user: action.payload.user,
                sessionId: action.payload.sessionId,
                refreshToken: action.payload.refreshToken,
                loginFail: false,
                refreshTokenFail: false
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
                loginFail: false,
                refreshToken: null,
                refreshTokenFail: false
            };
        case type.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                refreshTokenFail: false
            }
        case type.REFRESH_TOKEN_FAIL:
            return {
                ...state,
                refreshTokenFail: true
            };
        case type.AUTH_CHANGE_INFO:
            return {
                ...state,
                user: action.payload
            }
        default: return state;
    }
}
export default authReducer;