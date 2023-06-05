import * as type from '../constants/actionType';
const initialState = {
    isDefault: true,
    isAZ: false,
    isZA: false,
    isSTTStart: false,
    isSTTWaitting: false,
    isSTTEnd: false
}
const controlReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SORT_AZ:
            return {
                ...state,
                isDefault: false,
                isAZ: true,
                isZA: false,
                isSTTStart: false,
                isSTTWaitting: false,
                isSTTEnd: false
            }
        case type.SORT_ZA:
            return {
                ...state,
                isDefault: false,
                isAZ: false,
                isZA: true,
                isSTTStart: false,
                isSTTWaitting: false,
                isSTTEnd: false
            }
        case type.SORT_STATUS_START:
            return {
                ...state,
                isDefault: false,
                isAZ: false,
                isZA: false,
                isSTTStart: true,
                isSTTWaitting: false,
                isSTTEnd: false
            }
        case type.SORT_STATUS_WAITTING:
            return {
                ...state,
                isDefault: false,
                isAZ: false,
                isZA: false,
                isSTTStart: false,
                isSTTWaitting: true,
                isSTTEnd: false
            }
        case type.SORT_STATUS_END:
            return {
                ...state,
                isDefault: false,
                isAZ: false,
                isZA: false,
                isSTTStart: false,
                isSTTWaitting: false,
                isSTTEnd: true
            }
        case type.SORT_DEFAULT:
            return {
                ...state,
                isDefault: true,
                isAZ: false,
                isZA: false,
                isSTTStart: false,
                isSTTWaitting: false,
                isSTTEnd: false
            }
        default: return initialState;
    }
}
export default controlReducer;