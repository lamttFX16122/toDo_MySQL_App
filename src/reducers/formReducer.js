import * as type from '../constants/actionType';
const initialState = {
    isDisplay: false,
    workName: '',
    workStatus: 0,
    workId: '',
    isEdit: false
}
const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.CLOSE_FORM:
            return {
                ...state,
                isDisplay: false
            }
        case type.OPEN_FORM:
            return {
                ...state,
                isDisplay: true
            }
        case type.TOGGLE_FORM:
            return {
                ...state,
                isDisplay: !state.isDisplay
            }
        case type.IS_EDIT_ITEM_FORM:
            return {
                ...state,
                isDisplay: true,
                isEdit: true,
                workName: action.workName,
                workStatus: action.workStatus,
                workId: action.workId
            };
        case type.EDIT_ITEM_FORM_SUCCESS:
            return {
                ...state,
                isDisplay: false,
                isEdit: false,
                workName: '',
                workStatus: 0,
                workId: ''
            }
        default: return initialState;
    }
}
export default formReducer;