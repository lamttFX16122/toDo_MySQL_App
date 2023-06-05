import * as type from '../constants/actionType';
import { url } from '../shares/pageUrl';

export const addWork = (work, token, axiosJWT) => async dispacth => {
    try {
        await axiosJWT.post(url + 'addWork', work, {
            headers: {
                token: token
            }
        });
        dispacth({ type: type.ADD_WORK_SUCCESS })
        dispacth({ type: type.GET_WORKS_SUCCESS, payload: await refreshWorks(work.userId, token, axiosJWT) })
    } catch (error) {
        console.log(error)
        dispacth({ type: type.ADD_WORK_FAIL })
    }
}
export const editWork = (work, token, axiosJWT) => async dispacth => {
    try {
        await axiosJWT.post(url + 'editWork', work, {
            headers: {
                token: token
            }
        });
        dispacth({ type: type.EDIT_WORK_SUCCESS })
        dispacth({ type: type.GET_WORKS_SUCCESS, payload: await refreshWorks(work.userId, token, axiosJWT) })
    } catch (error) {
        console.log(error);
        dispacth({ type: type.EDIT_WORK_FAIL })
    }
}
export const changeStatus = (work, token, axiosJWT) => async dispacth => {
    try {
        let status = 0;
        if (parseInt(work.workStatus) === 1) {
            status = 2;
        }
        if (parseInt(work.workStatus) === 0 || parseInt(work.workStatus) === 2) {
            status = 1;
        }
        await axiosJWT.post(url + 'changeStatus', {
            workStatus: status, workId: work.workId
        }, {
            headers: {
                token: token
            }
        });
        dispacth({ type: type.EDIT_WORK_SUCCESS })
        dispacth({ type: type.GET_WORKS_SUCCESS, payload: await refreshWorks(work.userId, token, axiosJWT) })
    } catch (error) {
        console.log(error)
        dispacth({ type: type.EDIT_WORK_FAIL })
    }
}
export const getAllWork = (userId, token, axiosJWT) => async dispacth => {
    try {
        const works = await axiosJWT.get(url, {
            headers: {
                token: token,
                userId: userId
            }
        });
        dispacth({
            type: type.GET_WORKS_SUCCESS, payload: {
                worksProcess: works.data.payload.worksProcess,
                worksPending: works.data.payload.worksPending,
                worksEnd: works.data.payload.worksEnd
            }
        })
    } catch (error) {
        console.log(error)
    }
}
export const deleteWork = (work, token, axiosJWT) => async dispacth => {
    try {
        await axiosJWT.delete(url + 'deleteWork', {
            headers: {
                token: token
            },
            data: {
                workId: work.workId
            }
        })
        dispacth({ type: type.DELETE_WORK_SUCCESS })
        dispacth({ type: type.GET_WORKS_SUCCESS, payload: await refreshWorks(work.userId, token, axiosJWT) })
    } catch (error) {
        dispacth({ type: type.DELETE_WORK_FAIL })
    }
}
export const changePrioritize = (userId, workId, prioritize, token, axiosJWT) => async dispacth => {
    try {
        await axiosJWT.post(url + 'changePrioritize', {
            userId, workId, prioritize
        }, {
            headers: {
                token: token
            }
        });
        dispacth({ type: type.CHANGE_PRIORITIZE_SUCCESS });
        dispacth({ type: type.GET_WORKS_SUCCESS, payload: await refreshWorks(userId, token, axiosJWT) });
    } catch (error) {
        dispacth({ type: type.CHANGE_PRIORITIZE_FAIL })
    }
}
export const searchWork = (userId, key, page, token, axiosJWT) => async dispacth => {
    try {
        const works = await axiosJWT.get(`${url}workSearch?key=${key}&page=${page}`, {
            headers: {
                token: token,
                userId: userId
            }
        });
        dispacth({
            type: type.SEARCH_SUCCESS, payload: {
                worksSearch: works.data.payload,
                page: page,
                keySearch: key
            }
        });
    } catch (error) {
        console.log(error)
        dispacth({ type: type.SEARCH_FAIL })
    }
}
export const endSearchWork = () => async dispacth => {
    try {
        dispacth({ type: type.END_SEARCH });
    } catch (error) {
        console.log(error)
        dispacth({ type: type.SEARCH_FAIL })
    }
}
export const changeTab = (value) => dispacth => {
    dispacth({ type: type.CHANGE_TAB, payload: value })
}
export const changePageTabPending = (userId, tab, page, token, axiosJWT) => async dispacth => {
    try {
        const worksPending = await axiosJWT.get(`${url}?tab=${tab}&page=${page}`, {
            headers: {
                token: token,
                userId: userId
            }
        });
        dispacth({
            type: type.CHANGE_PAGE_TAB_PENDING, payload: {
                value: page,
                worksPending: worksPending.data.payload.worksPending
            }
        })
    } catch (error) {
        console.log(error)
    }

}
export const changePageTabProcess = (userId, tab, page, token, axiosJWT) => async dispacth => {
    try {
        const worksProcess = await axiosJWT.get(`${url}?tab=${tab}&page=${page}`, {
            headers: {
                token: token,
                userId: userId
            }
        });
        dispacth({
            type: type.CHANGE_PAGE_TAB_PROCESS, payload: {
                value: page,
                worksProcess: worksProcess.data.payload.worksProcess
            }
        })
    } catch (error) {
        console.log(error)
    }
}
export const changePageTabEnd = (userId, tab, page, token, axiosJWT) => async dispacth => {
    try {
        const worksEnd = await axiosJWT.get(`${url}?tab=${tab}&page=${page}`, {
            headers: {
                token: token,
                userId: userId
            }
        });
        dispacth({
            type: type.CHANGE_PAGE_TAB_END, payload: {
                value: page,
                worksEnd: worksEnd.data.payload.worksEnd
            }
        })
    } catch (error) {
        console.log(error)
    }
}
/**
 * function local use for reload page
 * @param {*} userId 
 * @param {*} token 
 * @param {*} axiosJWT 
 * @returns 
 */
const refreshWorks = async (userId, token, axiosJWT) => {
    try {
        const works = await axiosJWT.get(url, {
            headers: {
                token: token,
                userId: userId
            }
        });
        return works.data.payload;
    }
    catch (err) {
        console.log(err)
    }
}