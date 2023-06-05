import * as type from '../constants/actionType';
export const sortAZ = () => dispatch => {
    dispatch({ type: type.SORT_AZ });
}
export const sortZA = () => dispatch => {
    dispatch({ type: type.SORT_ZA });
}
export const sortSttStart = () => dispatch => {
    dispatch({ type: type.SORT_STATUS_START });
}
export const sortSttWaitting = () => dispatch => {
    dispatch({ type: type.SORT_STATUS_WAITTING });
}
export const sortSttEnd = () => dispatch => {
    dispatch({ type: type.SORT_STATUS_END });
}
export const sortDefault = () => dispatch => {
    dispatch({ type: type.SORT_DEFAULT });
}

