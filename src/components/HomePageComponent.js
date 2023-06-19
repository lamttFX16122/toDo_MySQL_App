import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import TaskList from "./child/TaskListChild";
import TaskForm from './child/TaskFormChild';
import Control from './child/ControlChild';
import { toggleForm } from "../actions/formAction";
import { getAllWork, changeTab, endSearchWork } from '../actions/workAction';
import { createAxios } from "../shares/axiosJWT";
import * as type from "../constants/actionType";
import { Tab, Tabs } from 'react-bootstrap';
const HomePage = () => {
    const authenReducer = useSelector(state => state.authReducer);
    const isToggleForm = useSelector(state => state.formReducer);
    const workReducer = useSelector(state => state.workReducer);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(authenReducer, type.REFRESH_TOKEN_SUCCESS, dispatch);
    useEffect(() => {
        if (!authenReducer.sessionId) {
            <Navigate to='/login' />
        }
        else {
            dispatch(getAllWork(authenReducer.user.userId, authenReducer.token, axiosJWT));
        }

    }, [authenReducer.sessionId]);
    let classForm = '';
    let isDisplayForm = '';
    let classInfo = 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
    if (isToggleForm.isDisplay) {
        isDisplayForm = <TaskForm></TaskForm>;
        classForm = `col col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-3`;
        classInfo = 'col-xs-12 col-sm-12 col-md-8 col-lg-8';
    }
    if (!authenReducer.sessionId) {
        return (<Navigate to='/login' />)
    }
    const handleDisplayForm = () => {
        dispatch(toggleForm());
    }
    const handleChangeTab = (e) => {
        dispatch(changeTab(parseInt(e)));
    }
    const handleSearchCancel = () => {
        dispatch(endSearchWork());
    }
    const renderList = () => {
        if (workReducer.isSearch) {
            return (
                <TaskList works={workReducer.worksSearch.works} pagePag={workReducer.pageSearch} lastPag={workReducer.worksSearch.last_worksSearch} />
            )
        }
        else {
            return (
                <Tabs
                    defaultActiveKey={workReducer.currentTab}
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3 "
                    onSelect={(e) => handleChangeTab(e)}
                >
                    <Tab eventKey="1" title="Đang làm">
                        <TaskList count_worksProcess={workReducer.worksProcess.count_worksProcess} works={workReducer.worksProcess.works} pagePag={workReducer.pageTabProcess} lastPag={workReducer.worksProcess.last_pageProcess} />
                    </Tab>
                    <Tab eventKey="0" title="Đang chờ">
                        <TaskList works={workReducer.worksPending.works} pagePag={workReducer.pageTabPending} lastPag={workReducer.worksPending.last_pagePending} />

                    </Tab>
                    <Tab eventKey="2" title="Đã xong">
                        <TaskList works={workReducer.worksEnd.works} pagePag={workReducer.pageTabEnd} lastPag={workReducer.worksEnd.last_pageEnd} />
                    </Tab>
                </Tabs>
            )
        }
    }
    return (
        <div>
            {/* <Navigation /> */}
            {/* <!------ Content--------> */}
            <div className="container">
                <div className="row mt-3">
                    {/* <!-- --- Left Content --- --> */}
                    <div className={classForm}>
                        {/* <!--- Form Activity ----> */}
                        {isDisplayForm}
                        {/* <!-- End Form Activity--> */}
                    </div>
                    {/* <!-- - End Left Content ----> */}

                    {/* <!--- Right Content ----> */}
                    <div className={classInfo}>
                        {/* <!-- --- Button Add Work --- --> */}
                        <div className="d-flex justify-content-between">
                            <button type="button" onClick={() => handleDisplayForm()} className="btn btn-primary"><span className="fa-solid fa-plus"></span> Thêm công việc</button>
                            {workReducer.isSearch ? <button type="button" onClick={() => handleSearchCancel()} className="btn btn-outline-info"><span className="fa-solid fa-backward"></span> Quay lại</button> : ''}
                        </div>
                        {/* <!-- - End Button Add Work ----> */}

                        {/* <!-- -- Filter and Sort -- --> */}
                        <div className="row mt-3">
                            {/* Search and Sort */}
                            <Control></Control>
                        </div>
                        {/* <!-- End Filter and Sort ----> */}

                        {/* <!----Table data list ----> */}
                        <div className="row mt-3">
                            <div className="col-12">
                                {/* <Tabs
                                    defaultActiveKey={workReducer.currentTab}
                                    transition={false}
                                    id="noanim-tab-example"
                                    className="mb-3 "
                                    onSelect={(e) => handleChangeTab(e)}
                                >
                                    <Tab eventKey="1" title="Đang làm">
                                        <TaskList works={workReducer.worksProcess.works} pagePag={workReducer.pageTabProcess} lastPag={workReducer.worksProcess.last_pageProcess} />
                                    </Tab>
                                    <Tab eventKey="0" title="Đang chờ">
                                        <TaskList works={workReducer.worksPending.works} pagePag={workReducer.pageTabPending} lastPag={workReducer.worksPending.last_pagePending} />

                                    </Tab>
                                    <Tab eventKey="2" title="Đã xong">
                                        <TaskList works={workReducer.worksEnd.works} pagePag={workReducer.pageTabEnd} lastPag={workReducer.worksEnd.last_pageEnd} />
                                    </Tab>
                                </Tabs> */}
                                {renderList()}
                            </div>
                        </div>
                        {/* <!--End Table data list --> */}
                    </div>
                    {/* <!-- End Right Content --> */}
                </div>
            </div>
            {/* <!---- End Content------> */}
        </div>
    )
}
export default HomePage;