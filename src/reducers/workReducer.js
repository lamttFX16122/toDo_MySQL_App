import * as type from '../constants/actionType';
const initialState = {
    worksProcess: {},
    worksPending: {},
    worksEnd: {},
    currentTab: 1,
    pageTabProcess: 1,
    pageTabPending: 1,
    pageTabEnd: 1,
    pageSearch: 1,
    isSearch: false,
    worksSearch: {},
    keySearch: ''
}
const workReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_WORK_SUCCESS:
            return state;
        case type.ADD_WORK_FAIL:
            return state;
        case type.GET_WORKS_SUCCESS:
            return {
                ...state,
                worksProcess: action.payload.worksProcess,
                worksPending: action.payload.worksPending,
                worksEnd: action.payload.worksEnd,
                pageTabProcess: 1,
                pageTabPending: 1,
                pageTabEnd: 1
            };
        case type.GET_WORKS_FAIL:
            return state;
        case type.EDIT_WORK_SUCCESS:
            return state;
        case type.EDIT_WORK_FAIL:
            return state;
        case type.DELETE_WORK_SUCCESS:
            return state;
        case type.DELETE_WORK_FAIL:
            return state;
        case type.CHANGE_PRIORITIZE_FAIL:
            return state;
        case type.CHANGE_PRIORITIZE_SUCCESS:
            return state;
        case type.SEARCH_SUCCESS:
            return {
                ...state,
                isSearch: true,
                keySearch: action.payload.keySearch,
                pageSearch: action.payload.page,
                worksSearch: action.payload.worksSearch
            };
        case type.END_SEARCH:
            return {
                ...state,
                pageSearch: 1,
                keySearch: '',
                isSearch: false,
                worksSearch: {}
            }
        case type.SEARCH_FAIL:
            return state;
        case type.CHANGE_TAB:
            return {
                ...state,
                currentTab: action.payload
            }
        case type.CHANGE_PAGE_TAB_PROCESS:
            return {
                ...state,
                pageTabProcess: action.payload.value,
                worksProcess: action.payload.worksProcess
            }
        case type.CHANGE_PAGE_TAB_PENDING:
            return {
                ...state,
                pageTabPending: action.payload.value,
                worksPending: action.payload.worksPending
            }
        case type.CHANGE_PAGE_TAB_END:
            return {
                ...state,
                pageTabEnd: action.payload.value,
                worksEnd: action.payload.worksEnd
            }
        default: return state;
    }
}
export default workReducer;