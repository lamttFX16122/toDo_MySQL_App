import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { closeForm, clearEditItem } from "../../actions/formAction";
import * as type from '../../constants/actionType';
import { addWork, editWork } from '../../actions/workAction';
import { createAxios } from "../../shares/axiosJWT";
const TaskForm = () => {

    const formState = useSelector(state => state.formReducer);
    const authReducer = useSelector(state => state.authReducer);
    const [workName, setWorkName] = useState('');
    const [workStatus, setWorkStatus] = useState('0');
    const [buttonName, setButtonName] = useState('Thêm');
    const [workNameError, setWorkNameError] = useState('');
    const dispatch = useDispatch();
    let axiosJWT = createAxios(authReducer, type.REFRESH_TOKEN_SUCCESS, dispatch);
    useEffect(() => {
        if (formState.isEdit) {
            setWorkName(formState.workName);
            setWorkStatus(formState.workStatus);
            setButtonName('Sửa');
        }
    }, [formState]);
    /**
     * function handle close Form
     */
    const handleCloseForm = () => {
        clearInputForm();
        dispatch(closeForm());
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!workName || workName === '') {
            setWorkNameError(<label className="text-danger">Tên công việc không hợp lệ!</label>);
        }
        else {
            setWorkNameError('');
            if (formState.isEdit) {
                //use edit Work
                let oldWork = {
                    userId: authReducer.user.userId,
                    workName,
                    workStatus,
                    workId: formState.workId
                }
                dispatch(editWork(oldWork, authReducer.token, axiosJWT))
            } else {
                //use new Work
                const newWork = {
                    userId: authReducer.user.userId,
                    workName: workName,
                    workStatus: workStatus
                }
                dispatch(addWork(newWork, authReducer.token, axiosJWT));
            }
            clearInputForm();
            dispatch(closeForm());
        }
    }
    /**
     * function handle form item
     */
    const clearInputForm = () => {
        setWorkName('');
        setWorkStatus(0);
        dispatch(clearEditItem());
    }
    return (
        <div className="card">
            <div className="card-header text-white bg-primary">
                <h5 className="card-title">
                    Thêm công việc
                </h5>
            </div>
            <div className="card-body">
                <form>
                    <div className="form-group mb-2">
                        <label>Tên công việc</label>
                        <input className="form-control" value={workName} onChange={(e) => setWorkName(e.target.value)} name='workName' type="text" />
                    </div>
                    <div className="form-group mb-2">
                        {workNameError}
                    </div>
                    <label>Trạng thái</label>
                    <select className="form-control" value={workStatus} onChange={(e) => setWorkStatus(e.target.value)} name="workStatus" required>
                        {!formState.isEdit ? <option value="0">Chờ</option> : ''}
                        <option value="1">Bắt đầu</option>
                        {formState.isEdit ? <option value="2">Kết thúc</option> : ''}
                    </select>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <button type="button" onClick={() => handleCloseForm()} className="btn btn-danger mx-3">Hủy</button>
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">{buttonName}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default TaskForm;