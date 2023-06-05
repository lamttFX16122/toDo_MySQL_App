import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { isEditItem } from "../../actions/formAction";
import { changeStatus, deleteWork, changePrioritize } from "../../actions/workAction";
import * as type from '../../constants/actionType';
import { createAxios } from "../../shares/axiosJWT";

const TaskItem = (props) => {
    const { work, index, lengthStart } = props;
    const authReducer = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(authReducer, type.REFRESH_TOKEN_SUCCESS, dispatch);
    const handleItemEdit = (work) => {
        dispatch(isEditItem(work.workId, work.workName, work.workStatus, axiosJWT));
    }
    const handleClickStatus = (work) => {
        dispatch(changeStatus(work, authReducer.token, axiosJWT))
    }
    const handleDeleteWork = (work) => {
        //Confirm delete work
        confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn có muốn xóa công việc này?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => {
                        dispatch(deleteWork(work, authReducer.token, axiosJWT))
                    }
                },
                {
                    label: 'Hủy',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        })
    }
    const handleChangeUp = (work, e) => {
        e.preventDefault();
        dispatch(changePrioritize(work.userId, work.workId, 'up', authReducer.token, axiosJWT))
    }
    const handleChangeDown = (work, e) => {
        e.preventDefault();
        dispatch(changePrioritize(work.userId, work.workId, 'down', authReducer.token, axiosJWT))
    }
    const timeStart = work.Processes?.length > 0 ? <p data-bs-toggle="tooltip" title={moment(work.Processes[0]?.timeStart).format('HH:mm DD-MM-YYYY')}>{moment(work.Processes[0]?.timeStart).format('DD-MM-YYYY')} </p> : '';
    const timeEnd = work.Processes?.length > 0 ? <p data-bs-toggle="tooltip" title={work.Processes[work.Processes?.length - 1]?.timeEnd ? moment(work.Processes[work.Processes?.length - 1]?.timeEnd).format('HH:mm DD-MM-YYYY') : ''}>{work.Processes[work.Processes?.length - 1]?.timeEnd ? moment(work.Processes[work.Processes?.length - 1]?.timeEnd).format('DD-MM-YYYY') : ''} </p> : '';
    let actionStatus = null;
    if (work.workStatus === 0 || work.workStatus === 2) {
        actionStatus = <button type="button" className="badge rounded-pill btn-info bg-info" onClick={() => handleClickStatus(work)} >
            <span className="fa-solid fa-pencil"></span> Bắt đầu
        </button>;
    }
    else {
        actionStatus = <button type="button" className="badge rounded-pill btn-success bg-success" onClick={() => handleClickStatus(work)} >
            <span className="fa-solid fa-pencil"></span> Kết thúc
        </button>;
    }
    return (
        <tr key={index}>
            <td className="text-center">
                <div className="d-flex align-items-center justify-content-center">
                    {work.timePrioritize > 1 && work.workStatus === 1 ? <a onClick={(e) => handleChangeUp(work, e)} href="#" ><i className="fa-solid fa-arrow-up"></i></a> : ''}
                    &nbsp;
                    {index + 1}
                    &nbsp;
                    {work.timePrioritize < lengthStart && work.workStatus === 1 ? <a onClick={(e) => handleChangeDown(work, e)} href="#"><i className="fa-solid fa-arrow-down"></i></a> : ''}&nbsp;
                </div>
            </td>
            <td>{work.workName}</td>
            <td className="text-center">
                <span className={work.workStatus === 0 ? "badge bg-danger" : work.workStatus === 1 ? "badge bg-warning" : "badge bg-success"}>{work.workStatus === 0 ? 'Chờ' : work.workStatus === 1 ? 'Đang làm' : 'Ẩn'}</span>
            </td>
            <td className="text-center">
                <p>{moment(work.timeCreated).format('DD-MM-YYYY')} </p>
            </td>
            <td className="text-center">
                {timeStart}
            </td>
            <td className="text-center">
                {timeEnd}
            </td>
            <td className="text-center">
                {actionStatus}
                &nbsp;
                <button type="button" className="badge rounded-pill btn-secondary bg-secondary" onClick={() => handleItemEdit(work)} >
                    <span className="fa-solid fa-pencil"></span> Sửa
                </button>
                &nbsp;
                <button onClick={() => handleDeleteWork(work)} type="button" className="badge btn-danger rounded-pill bg-danger">
                    <span className="fa-solid fa-trash-can"></span> Xóa
                </button>
            </td>
        </tr >
    )
}
export default TaskItem;