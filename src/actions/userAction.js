import * as type from '../constants/actionType';
import { url } from '../shares/pageUrl';
export const userChangePassword = (userId, oldPassword, newPassword, token, axiosJWT, navigate) => async dispatch => {
    try {
        await axiosJWT.post(url + 'change-password', { userId, oldPassword, newPassword }, {
            headers: {
                token: token
            }
        })
        dispatch({ type: type.CHANGE_PASSWORD_SUCCESS });
        return navigate('/');
    } catch (error) {
        console.log(error);
        dispatch({ type: type.CHANGE_PASSWORD_FAIL });
    }
}
export const refreshChangePasswordPage = () => dispatch => {
    dispatch({ type: type.CHANGE_PASSWORD_SUCCESS });
}
export const userChangeInfo = (user, token, axiosJWT, navigate) => async dispatch => {
    try {
        const result = await axiosJWT.post(url + 'change-info', user, {
            headers: {
                token: token
            }
        })
        dispatch({ type: type.CHANGE_INFO_SUCCESS });
        dispatch({ type: type.AUTH_CHANGE_INFO, payload: result.data.payload });
        navigate(-1); //back to previous page
    } catch (error) {
        console.log(error);
        dispatch({ type: type.CHANGE_INFO_FAIL });
    }
}
