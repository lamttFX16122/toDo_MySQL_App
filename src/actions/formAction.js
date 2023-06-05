import * as type from '../constants/actionType';
export const closeForm = () => dispatch => {
    dispatch({ type: type.CLOSE_FORM });
}
export const openForm = () => dispatch => {
    dispatch({ type: type.OPEN_FORM });
}
export const toggleForm = () => dispatch => {
    dispatch({ type: type.TOGGLE_FORM });
}
export const isEditItem = (workId, workName, workStatus) => dispatch => {
    dispatch({ type: type.IS_EDIT_ITEM_FORM, workId, workName, workStatus });
}
export const clearEditItem = () => dispatch => {
    dispatch({ type: type.EDIT_ITEM_FORM_SUCCESS });
}