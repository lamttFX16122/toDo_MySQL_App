import * as type from '../constants/actionType';
const initialState = {
    changePasswordError: false
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changePasswordError: false
            };
        case type.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                changePasswordError: true
            };
        case type.CHANGE_INFO_SUCCESS:
            return state;
        case type.CHANGE_INFO_FAIL:
            return state;
        default:
            return state;
    }
}
export default userReducer;