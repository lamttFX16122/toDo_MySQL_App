import { Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createAxios } from '../../shares/axiosJWT';
import * as type from '../../constants/actionType';
import { searchWork } from '../../actions/workAction';
import { changePageTabProcess, changePageTabEnd, changePageTabPending } from '../../actions/workAction';
import { statistical_Work } from '../../actions/statisticalAction';
const PaginationWork = (props) => {
    const { page, lastPage, isStatistical } = props;
    const dispatch = useDispatch();
    const workState = useSelector(state => state.workReducer);
    const statisticalReducer = useSelector(state => state.statisticalReducer);
    const auth = useSelector(state => state.authReducer);
    let axiosJWT = createAxios(auth, type.REFRESH_TOKEN_SUCCESS, dispatch);
    /**
     * function handle click get page
     * @param {int} value // represent for page 
     */
    const handleClickPage = (value) => {
        // use statistical
        if (isStatistical) {
            dispatch(statistical_Work(auth.user.userId, statisticalReducer.workStatus, value, auth.token, axiosJWT));
        }
        else {
            //use main page and search page
            if (workState.currentTab === 0 && !workState.isSearch) {
                dispatch(changePageTabPending(auth.user.userId, workState.currentTab, value, auth.token, axiosJWT));
            }
            if (workState.currentTab === 1 && !workState.isSearch) {
                dispatch(changePageTabProcess(auth.user.userId, workState.currentTab, value, auth.token, axiosJWT));
            }
            if (workState.currentTab === 2 && !workState.isSearch) {
                dispatch(changePageTabEnd(auth.user.userId, workState.currentTab, value, auth.token, axiosJWT));
            }
            if (workState.isSearch) {
                dispatch(searchWork(auth.user.userId, workState.keySearch, value, auth.token, axiosJWT, false));
            }
        }
    }
    /**
     * 
     * @param {string} option //represent for First, Previous, Next, Last button option of Pagination Component
     * @param {*} lastPage 
     */
    const handleClickControl = (option, lastPage) => {
        if (isStatistical) {
            //use Statistical page
            if (option === 'First') {
                dispatch(statistical_Work(auth.user.userId, statisticalReducer.workStatus, 1, auth.token, axiosJWT));
            }
            if (option === 'Prev') {
                dispatch(statistical_Work(auth.user.userId, statisticalReducer.workStatus, statisticalReducer.page - 1, auth.token, axiosJWT));
            }
            if (option === 'Next') {
                dispatch(statistical_Work(auth.user.userId, statisticalReducer.workStatus, statisticalReducer.page + 1, auth.token, axiosJWT));
            }
            if (option === 'Last') {
                dispatch(statistical_Work(auth.user.userId, statisticalReducer.workStatus, statisticalReducer.lastPage, auth.token, axiosJWT));
            }
        }
        else {
            //use main page or search page
            if (workState.currentTab === 0 && !workState.isSearch) {
                if (option === 'First') {
                    dispatch(changePageTabPending(auth.user.userId, workState.currentTab, 1, auth.token, axiosJWT));
                }
                if (option === 'Prev') {
                    dispatch(changePageTabPending(auth.user.userId, workState.currentTab, workState.pageTabPending - 1, auth.token, axiosJWT));
                }
                if (option === 'Next') {
                    dispatch(changePageTabPending(auth.user.userId, workState.currentTab, workState.pageTabPending + 1, auth.token, axiosJWT));
                }
                if (option === 'Last') {
                    dispatch(changePageTabPending(auth.user.userId, workState.currentTab, lastPage, auth.token, axiosJWT));
                }
            }
            if (workState.currentTab === 1 && !workState.isSearch) {
                if (option === 'First') {
                    dispatch(changePageTabProcess(auth.user.userId, workState.currentTab, 1, auth.token, axiosJWT));
                }
                if (option === 'Prev') {
                    dispatch(changePageTabProcess(auth.user.userId, workState.currentTab, workState.pageTabProcess - 1, auth.token, axiosJWT));
                }
                if (option === 'Next') {
                    dispatch(changePageTabProcess(auth.user.userId, workState.currentTab, workState.pageTabProcess + 1, auth.token, axiosJWT));
                }
                if (option === 'Last') {
                    dispatch(changePageTabProcess(auth.user.userId, workState.currentTab, lastPage, auth.token, axiosJWT));
                }
            }
            if (workState.currentTab === 2 && !workState.isSearch) {
                if (option === 'First') {
                    dispatch(changePageTabEnd(auth.user.userId, workState.currentTab, 1, auth.token, axiosJWT));
                }
                if (option === 'Prev') {
                    dispatch(changePageTabEnd(auth.user.userId, workState.currentTab, workState.pageTabEnd - 1, auth.token, axiosJWT));
                }
                if (option === 'Next') {
                    dispatch(changePageTabEnd(auth.user.userId, workState.currentTab, workState.pageTabEnd + 1, auth.token, axiosJWT));
                }
                if (option === 'Last') {
                    dispatch(changePageTabEnd(auth.user.userId, workState.currentTab, lastPage, auth.token, axiosJWT));
                }
            }
            if (workState.isSearch) {
                if (option === 'First') {
                    dispatch(searchWork(auth.user.userId, workState.keySearch, 1, auth.token, axiosJWT, false));
                }
                if (option === 'Prev') {
                    dispatch(searchWork(auth.user.userId, workState.keySearch, workState.pageSearch - 1, auth.token, axiosJWT, false));
                }
                if (option === 'Next') {
                    dispatch(searchWork(auth.user.userId, workState.keySearch, workState.pageSearch + 1, auth.token, axiosJWT, false));
                }
                if (option === 'Last') {
                    dispatch(searchWork(auth.user.userId, workState.keySearch, lastPage, auth.token, axiosJWT, false));
                }
            }
        }
    }
    return (
        renderItem(page, lastPage, handleClickPage, handleClickControl)
    );
}
/**
 * function generate these item of Pagination component
 * @param {*} page //represent current page to set active
 * @param {*} lastPage 
 * @param {*} handleClickPage //function get page corresponding 
 * @param {*} handleClickControl // function get page of button control corresponding
 * @returns 
 */
const renderItem = (page, lastPage, handleClickPage, handleClickControl) => {
    let arrItem = [];
    if (page === 1) {
        arrItem.push(<Pagination.First key={'paga' + 1} disabled />);
        arrItem.push(<Pagination.Prev key={'paga' + 2} disabled />);
    } else {
        arrItem.push(<Pagination.First key={'paga' + 3} onClick={() => handleClickControl('First', lastPage)} />);
        arrItem.push(<Pagination.Prev key={'paga' + 4} onClick={() => handleClickControl('Prev', lastPage)} />);
    }
    let i = page > 3 ? page - 2 : 1;
    if (i !== 1) {
        arrItem.push(<Pagination.Ellipsis key={'paga' + 5} />);
    }
    for (; i < page + 2 && i < lastPage - 1; i++) {
        const value = i;
        if (i === page) {
            arrItem.push(<Pagination.Item key={'pag' + i} onClick={() => handleClickPage(value)} active>{i}</Pagination.Item>);
        }
        else {
            arrItem.push(<Pagination.Item key={'pag' + i} onClick={() => handleClickPage(value)}>{i}</Pagination.Item>);
        }
    }
    if (i === page + 2 && i < lastPage) {
        arrItem.push(<Pagination.Ellipsis key={'paga' + 6} />);
    }
    if (i === page && (lastPage - 1) > 0) {
        arrItem.push(<Pagination.Item active key={'paga' + 7} onClick={() => handleClickPage(lastPage - 1)}>{lastPage - 1}</Pagination.Item>)
    }
    else if ((lastPage - 1) > 0) {
        arrItem.push(<Pagination.Item key={'paga' + 8} onClick={() => handleClickPage(lastPage - 1)}>{lastPage - 1}</Pagination.Item>)
    }
    if (page === lastPage) {
        arrItem.push(<Pagination.Item key={'paga' + 9} active onClick={() => handleClickPage(lastPage)}>{lastPage}</Pagination.Item>)
        arrItem.push(<Pagination.Next key={'paga' + 10} disabled />);
        arrItem.push(<Pagination.Last key={'paga' + 11} disabled />);
    }
    else {
        arrItem.push(<Pagination.Item key={'paga' + 12} onClick={() => handleClickPage(lastPage)}>{lastPage}</Pagination.Item>)
        arrItem.push(<Pagination.Next onClick={() => handleClickControl('Next', lastPage)} key={'paga' + 13} />);
        arrItem.push(<Pagination.Last onClick={() => handleClickControl('Last', lastPage)} key={'paga' + 14} />);
    }
    return (
        <Pagination key={'paga' + 15} className='justify-content-end'>
            {arrItem}
        </Pagination>
    );
}
export default PaginationWork;