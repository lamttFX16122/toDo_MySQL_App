import * as type from '../constants/actionType';
import { url } from '../shares/pageUrl';
/**
 * function get statistical work of user by workStatus
 * @param {string} userId 
 * @param {int} workStatus 
 * @param {int} page 
 * @param {string} token 
 * @param {*} axiosJWT 
 * @returns 
 */
export const statistical_Work = (userId, workStatus, page, token, axiosJWT) => async dispatch => {
    try {
        console.log(`${url}statistical?workStatus=${workStatus}&page=${page}`)
        const statistical = await axiosJWT.get(`${url}statistical?workStatus=${workStatus}&page=${page}`,
            {
                headers: {
                    token: token,
                    userId: userId
                }
            })
        let typeDispatch = null;
        if (workStatus === 0) {
            typeDispatch = type.STATISTICAL_WORK_PENDING;
        }
        else if (workStatus === 1) {
            typeDispatch = type.STATISTICAL_WORK_PROCESS;
        }
        else {
            typeDispatch = type.STATISTICAL_WORK_END;
        }
        //statistical response is an array object of 3 corresponding elements 0-works, 1 processes, 2 count item 
        dispatch({
            type: typeDispatch, payload: {
                page: page,
                works: statistical.data.payload[0],
                processes: statistical.data.payload[1],
                lastPage: parseInt(statistical.data.payload[2][0].lastPage)
            }
        });
    } catch (error) {
        console.log(error);
    }
}
/**
 * function generate PDF file by new tab review. Print the row shown on the table.
 * @param {*} userId 
 * @param {*} workStatus 
 * @param {*} page 
 * @param {*} token 
 * @param {*} axiosJWT 
 * @returns PDF open new Tab in browser
 */
export const generatePDF_Work_Pagination = (userId, workStatus, page, token, axiosJWT) => async dispatch => {
    try {
        const res = await axiosJWT.get(`${url}generate-pdf-pagination?workStatus=${workStatus}&page=${page}`,
            {
                headers: {
                    token: token,
                    userId: userId
                },
                responseType: 'blob'
            })
        let fileURL = URL.createObjectURL(res.data)
        window.open(fileURL)
    } catch (error) {
        console.log(error);
    }
}
/**
 * Function generate ALL element work by workStatus or all-Works
 * @param {*} userId 
 * @param {*} workStatus 
 * @param {*} token 
 * @param {*} axiosJWT 
 * @returns 
 */
export const generatePDF_AllWork = (userId, workStatus, token, axiosJWT) => async dispatch => {
    try {
        const res = await axiosJWT.get(`${url}generate-pdf-works?workStatus=${workStatus}`,
            {
                headers: {
                    token: token,
                    userId: userId
                },
                responseType: 'blob'
            })
        let fileURL = URL.createObjectURL(res.data)
        window.open(fileURL)
    } catch (error) {
        console.log(error);
    }
}
export const setWorkStatus = (value, navigate) => dispatch => {
    dispatch({ type: type.STATISTICAL_SET_WORKSTATUS, payload: value });
    navigate('/statistical');
}