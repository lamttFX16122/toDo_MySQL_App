import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchWork } from "../../actions/workAction";
import { createAxios } from '../../shares/axiosJWT';
import * as type from '../../constants/actionType';
const Search = () => {
    const authenReducer = useSelector(state => state.authReducer);
    const workReducer = useSelector(state => state.workReducer);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(authenReducer, type.REFRESH_TOKEN_SUCCESS, dispatch);
    const [key, setKey] = useState(workReducer.keySearch);
    /**
     * function event click button search
     */
    const onSubmitSearch = () => {
        dispatch(searchWork(authenReducer.user.userId, key, 1, authenReducer.token, axiosJWT));
    }
    return (
        <div className="input-group">
            <input value={key} onChange={(e) => setKey(e.target.value)} type="text" className="form-control" placeholder="Nhập từ khóa ..." aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button onClick={() => onSubmitSearch()} className="btn btn-primary" type="button" id="button-addon2"><span className="fa-solid fa-magnifying-glass"></span> Tìm</button>
        </div>
    )
}
export default Search;