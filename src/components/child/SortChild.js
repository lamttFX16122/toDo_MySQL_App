import { useDispatch, useSelector } from "react-redux";
import { sortDefault, sortAZ, sortZA, sortSttStart, sortSttWaitting, sortSttEnd } from '../../actions/controlAction';
const Sort = () => {
    const controlState = useSelector(state => state.controlReducer);
    const workReducer = useSelector(state => state.workReducer);
    const dispatch = useDispatch();
    let sortSelected = <i className="fa-solid fa-check"></i>; // icon check for dropdown item on control dropdown sort
    const isSearchRender = () => {
        return (
            <div>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li onClick={() => dispatch(sortSttStart())}>
                    <a href="/#" className="dropdown-item d-flex align-items-center justify-content-between">
                        <span><span className="fa-solid fa-play"></span> Đang làm</span>
                        {controlState.isSTTStart ? sortSelected : ''}
                    </a>
                </li>
                <li onClick={() => dispatch(sortSttWaitting())}>
                    <a href="/#" className="dropdown-item d-flex align-items-center justify-content-between">
                        <span><span className="fa-solid fa-spinner"></span> Chờ</span>
                        {controlState.isSTTWaitting ? sortSelected : ''}
                    </a>
                </li>

                <li onClick={() => dispatch(sortSttEnd())}>
                    <a href="/#" className="dropdown-item d-flex align-items-center justify-content-between">
                        <span><span className="fa-solid fa-stop"></span> Kết thúc</span>
                        {controlState.isSTTEnd ? sortSelected : ''}
                    </a>
                </li>
            </div>
        )
    }
    return (
        <div className="btn-group">
            <button className="btn btn-primary dropdown-toggle" id="dropdownSort" data-bs-toggle="dropdown" aria-expanded="true" type="button"><span className="fa-solid fa-arrow-up-arrow-down>"></span> Sắp xếp</button>
            <ul className="dropdown-menu" aria-labelledby="dropdownSort">
                <li onClick={() => dispatch(sortDefault())}>
                    <a href="/#" className="dropdown-item d-flex align-items-center justify-content-between">
                        <span><span className="fa-solid fa-cogs"></span> Mặc định</span>
                        {controlState.isDefault ? sortSelected : ''}
                    </a>
                </li>
                <li onClick={() => dispatch(sortAZ())}>
                    <a href="/#" className="dropdown-item d-flex align-items-center justify-content-between">
                        <span><span className="fa-solid fa-arrow-down-a-z"></span> Tên A-Z</span>
                        {controlState.isAZ ? sortSelected : ''}
                    </a>
                </li>
                <li onClick={() => dispatch(sortZA())}>
                    <a href="/#" className="dropdown-item d-flex align-items-center justify-content-between">
                        <span><span className="fa-solid fa-arrow-down-z-a"></span> Tên Z-A</span>
                        {controlState.isZA ? sortSelected : ''}
                    </a>
                </li>
                {workReducer.isSearch ? isSearchRender() : ''}
            </ul>
        </div>
    );
}
export default Sort;