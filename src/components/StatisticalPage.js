import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createAxios } from "../shares/axiosJWT";
import * as type from "../constants/actionType";
import { statistical_Work, generatePDF_Work_Pagination, generatePDF_AllWork } from '../actions/statisticalAction';
import ListStatistical from "./statistical/ListStatistical";
import { useNavigate } from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";
const StatisticalPage = () => {
    const authenReducer = useSelector(state => state.authReducer);
    const statisticalReducer = useSelector(state => state.statisticalReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(authenReducer, type.REFRESH_TOKEN_SUCCESS, dispatch);
    useEffect(() => {
        dispatch(statistical_Work(authenReducer.user.userId, statisticalReducer.workStatus, 1, authenReducer.token, axiosJWT));
    }, [statisticalReducer.workStatus]);
    const renderPDF = (value) => {
        if (value === 1) {
            dispatch(generatePDF_Work_Pagination(authenReducer.user.userId, statisticalReducer.workStatus, statisticalReducer.page, authenReducer.token, axiosJWT));
        }
        else if (value === 2) {
            dispatch(generatePDF_AllWork(authenReducer.user.userId, statisticalReducer.workStatus, authenReducer.token, axiosJWT));
        } else {
            dispatch(generatePDF_AllWork(authenReducer.user.userId, 3, authenReducer.token, axiosJWT));
        }
    }
    return (
        <div>
            {/* <Navigation /> */}
            {/* <!------ Content--------> */}
            <div className="container">
                <div className="row mt-3">
                    {/* <!--- Right Content ----> */}
                    <div className="text-center text-uppercase text-secondary">
                        <h3 className="fs-2 fw-bold">công việc {statisticalReducer.workStatus === 0 ? 'đang chờ' : (statisticalReducer.workStatus === 1 ? 'đang làm' : 'đã làm')}</h3>
                    </div>
                    {/* <!-- --- Button Add Work --- --> */}
                    <div className="d-flex justify-content-end mb-3">
                        <Dropdown className="me-3">
                            <Dropdown.Toggle variant="success">
                                Xuất PDF
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={() => renderPDF(1)}>
                                    Công việc đang hiển thị
                                </Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => renderPDF(2)}>
                                    Tất cả CV {statisticalReducer.workStatus === 1 ? 'Đang làm' : (statisticalReducer.workStatus === 0 ? 'Đang Chờ' : 'Kết thúc')}
                                </Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => renderPDF(3)}>
                                    Tất cả các CV
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button type="button" onClick={() => navigate('/')} className="btn btn-primary"><span className="fa-solid fa-backward"></span> Quay lại</button>
                    </div>
                    <ListStatistical works={statisticalReducer.works} processes={statisticalReducer.processes} page={statisticalReducer.page} lastPage={statisticalReducer.lastPage} />
                    {/* <!-- End Right Content --> */}
                </div>
            </div>
            {/* <!---- End Content------> */}
        </div>
    )
}
export default StatisticalPage;