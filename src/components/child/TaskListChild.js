import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";
import { useState } from "react";
import PaginationWork from "./PaginationChild";
const TaskList = (props) => {
    const { works, pagePag, lastPag, count_worksProcess } = props
    const workState = useSelector(state => state.workReducer);
    const controlState = useSelector(state => state.controlReducer);
    const [filterName, setFilterName] = useState('');
    let renderItem = null;
    let list = works;
    //used to sort component
    if (controlState.isAZ) {
        list = sortOption(list, 1)
    }
    if (controlState.isZA) {
        list = sortOption(list, 2)
    }
    if (controlState.isSTTStart) {
        list = sortOption(list, 3)
    }
    if (controlState.isSTTWaitting) {
        list = sortOption(list, 4)
    }
    if (controlState.isSTTEnd) {
        list = sortOption(list, 5)
    }
    if (controlState.isDefault) {
        list = works;
    }
    if (filterName.length > 0) {
        list = list.filter(work => {
            return work.workName.toUpperCase().indexOf(filterName.toUpperCase()) !== -1;
        })
    }
    // maxItemStatusStart
    let lengthStart = 0;
    //used to determine range Prioritize
    if (workState.currentTab === 1 && count_worksProcess) {
        lengthStart = count_worksProcess;
    }
    if (list && list.length > 0) {
        renderItem = list?.map((work, index) => {
            return (
                <TaskItem key={index} work={work} index={index} lengthStart={lengthStart} />
            )
        })
    }
    const pagination = <PaginationWork page={pagePag} lastPage={lastPag}></PaginationWork>;
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <td className="text-center">#</td>
                        <td className="text-center">Tên công việc</td>
                        <td className="text-center">Trạng thái</td>
                        <td className="text-center">Ngày tạo</td>
                        <td className="text-center">Bắt đầu</td>
                        <td className="text-center">Kết thúc</td>
                        <td className="text-center"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} name="filterName" className="form-control" />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {/* <!-- ---- row data--- --> */}
                    {renderItem}
                    {/* <!-- -- End row data----> */}
                </tbody>
            </table>
            {list?.length > 0 ? pagination : ''}
        </div>
    )
}
const sortOption = (arr, opt) => {
    // Name AZ
    if (opt === 1) {
        arr.sort((a, b) => a.workName.toUpperCase() !== b.workName.toUpperCase() ? a.workName.toUpperCase() < b.workName.toUpperCase() ? -1 : 1 : 0);
    }
    //Name ZA
    if (opt === 2) {
        arr.sort((a, b) => a.workName.toUpperCase() !== b.workName.toUpperCase() ? a.workName.toUpperCase() > b.workName.toUpperCase() ? -1 : 1 : 0);
    }
    // Status 1
    if (opt === 3) {
        arr = sortSTT(arr, 3);
    }
    // Status 0
    if (opt === 4) {
        arr = sortSTT(arr, 4);
    }
    //Status 2
    if (opt === 5) {
        arr = sortSTT(arr, 5);
    }
    if (opt === 6) {
        arr.sort((a, b) => 0);
    }
    return arr;
}
const sortSTT = (arr, opt) => {
    let tempArrFilterStart = arr.filter((work) => work.workStatus === 1).sort((a, b) => a.timePrioritize - b.timePrioritize);
    let tempArrFilterPendding = arr.filter((work) => work.workStatus === 0).sort((a, b) => b.timeCreated - a.timeCreated);
    let tempArrFilterEnd = arr.filter((work) => work.workStatus === 2).sort((a, b) => b.timeCreated - a.timeCreated);
    let result = null;
    if (opt === 3) {
        result = tempArrFilterStart.concat(tempArrFilterPendding, tempArrFilterEnd);
    }
    if (opt === 4) {
        result = tempArrFilterPendding.concat(tempArrFilterStart, tempArrFilterEnd);
    }
    if (opt === 5) {
        result = tempArrFilterEnd.concat(tempArrFilterStart, tempArrFilterPendding);
    }
    return result;
}
export default TaskList;