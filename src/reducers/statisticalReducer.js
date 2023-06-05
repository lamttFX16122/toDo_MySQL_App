import * as type from '../constants/actionType';
const initialState = {
    works: {},
    processes: {},
    page: 1,
    lastPage: null,
    workStatus: null
}
const statisticalReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.STATISTICAL_WORK_PROCESS:
            return {
                ...state,
                page: action.payload.page,
                works: action.payload.works,
                processes: action.payload.processes,
                lastPage: action.payload.lastPage
            }
        case type.STATISTICAL_WORK_PENDING:
            return {
                ...state,
                page: action.payload.page,
                works: action.payload.works,
                processes: action.payload.processes,
                lastPage: action.payload.lastPage
            }
        case type.STATISTICAL_WORK_END:
            return {
                ...state,
                page: action.payload.page,
                works: action.payload.works,
                processes: action.payload.processes,
                lastPage: action.payload.lastPage
            }
        case type.STATISTICAL_SET_WORKSTATUS:
            return {
                ...state,
                workStatus: action.payload
            }
        default:
            return state;
    }
}
export default statisticalReducer;