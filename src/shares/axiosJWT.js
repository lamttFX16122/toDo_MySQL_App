import jwtDecode from "jwt-decode";
import axios from "axios";
import { url } from './pageUrl';
import * as type from '../constants/actionType';
/**
 * function refresh Token when token expired
 * @param {*} sessionId 
 * @returns 
 */
const refreshToken = async (sessionId, refreshToken, dispatch) => {
    try {
        const res = await axios.post(url + 'refreshToken', { sessionId, refreshToken }, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log(error);
        dispatch({ type: type.REFRESH_TOKEN_FAIL });
    }
}
/**
 * set properties for axios use call api with token
 * @param {*} authen //authenReducer
 * @param {*} stateSuccess //type update after refresh token
 * @param {*} dispatch 
 * @returns new token 
 */
export const createAxios = (authen, stateSuccess, dispatch) => {
    const newInstance = axios.create({ withCredentials: true });
    newInstance.interceptors.request.use(async config => {
        let date = new Date();
        const decoded = await jwtDecode(authen?.token);
        if (decoded.exp < date.getTime() / 1000) {
            const data = await refreshToken(authen.sessionId, authen.refreshToken, dispatch);
            dispatch({ type: stateSuccess, payload: data.payload.accessToken });
            config.headers['token'] = data.payload.accessToken;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    })
    return newInstance;
}
