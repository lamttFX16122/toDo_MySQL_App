import axios from 'axios';
import * as type from '../constants/actionType';
import { url } from '../shares/pageUrl';
/**
 * function login user
 * @param {string} email 
 * @param {string} password 
 * @param {*} navigate 
 * @returns 
 */
export const login = (email, password, navigate) => async dispatch => {
    try {
        const instance = axios.create({
            withCredentials: true
        });
        const res = await instance.post(url + 'login', { email, password });
        console.log(res)
        dispatch({ type: type.LOGIN_SUCCESS, payload: res.data.payload });
        return navigate('/');
    } catch (error) {
        console.log(error)
        dispatch({ type: type.LOGIN_FAIL });
    }
}
/**
 * Function logout user
 * @param {string} sessionId 
 * @param {string} token 
 * @param {*} navigate 
 * @param {*} axiosJWT 
 * @returns 
 */
export const logout = (sessionId, token, navigate, axiosJWT) => async dispatch => {
    try {
        await axiosJWT.post(url + 'logout', { sessionId }, {
            headers: {
                token: token
            }
        });
        dispatch({ type: type.LOGOUT_SUCCESS });
        return navigate('/login');
    } catch (error) {
        console.log('Login fail: ', error);
        dispatch({ type: type.LOGOUT_FAIL });
    }
}
/**
 * function check email user
 * @param {*} email 
 * @returns if email exists then return false else true
 */
export const checkEmail = async (email) => {
    try {
        const res = await axios.post(url + 'checkEmail', { email });
        return res.data.payload.isValid;
    } catch (error) {

    }
}
/**
 * function register new user
 * @param {*} user 
 * @param {*} navigate 
 * @returns 
 */
export const register = async (user, navigate) => {
    try {
        await axios.post(url + 'register', user);
        return navigate('/login');
    }
    catch (err) {
        console.log(err);
    }
}
/**
 * function refresh state in reducer
 * @returns 
 */
export const refreshLoginPage = () => dispatch => {
    dispatch({ type: type.LOGOUT_SUCCESS });
}