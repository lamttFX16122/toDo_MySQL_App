import BootstrapTable from 'react-bootstrap-table-next';
import React from "react";
import PaginationWork from '../child/PaginationChild';
import moment from 'moment/moment';
import { changeMinutesToHours } from '../../constants/changeMinutesToHours';
const ListStatistical = (props) => {
    const { works, processes, page, lastPage } = props;
    let lst_work = [];
    let columnsProcess = [{
        dataField: 'row_Num',
        text: '#'
    }, {
        dataField: 'timeStart',
        text: 'Bắt đầu'
    }, {
        dataField: 'timeEnd',
        text: 'Kết thúc'
    },
    {
        dataField: 'totalTime',
        text: 'Tổng thời gian'
    }
    ];
    const columns = [{
        dataField: 'row_Num',
        text: '#'
    }, {
        dataField: 'workName',
        text: 'Tên CV'
    }, {
        dataField: 'workStatus',
        text: 'Trạng thái'
    }, {
        dataField: 'timeCreated',
        text: 'Ngày tạo'
    }, {
        dataField: 'countProcess',
        text: 'Số lần bắt đầu'
    }, {
        dataField: 'totalTimeProcess',
        text: 'Tổng thời gian làm'
    }];
    const filterProcess = (workId) => {
        let arrTemp = [];
        if (Object.keys(processes).length <= 0) {
            return [];
        }
        for (const key in processes) {
            if (processes[key].workId === workId) {
                processes[key].timeStart = moment(processes[key].timeStart, moment.ISO_8601).format('hh:mm:ss DD-MM-YYYY');
                processes[key].timeEnd = processes[key].timeEnd ? moment(processes[key].timeEnd, moment.ISO_8601).format('hh:mm:ss DD-MM-YYYY') : '';
                processes[key].totalTime = changeMinutesToHours(processes[key].totalTime);
                arrTemp.push(processes[key]);
            }
        }
        return arrTemp;
    }
    if (Object.keys(works).length > 0) {
        for (const i in works) {
            works[i].timeCreated = moment(works[i].timeCreated, moment.ISO_8601).format('DD-MM-YYYY');
            works[i].totalTimeProcess = changeMinutesToHours(works[i].totalTimeProcess);
            lst_work.push(works[i])
        }
    }
    const expandRow = {
        parentClassName: 'table-primary',
        renderer: row => {
            return (
                <BootstrapTable keyField='row_Num' data={filterProcess(row.workId)} columns={columnsProcess} />
            )
        }
    };
    return (
        <div>
            <BootstrapTable keyField='row_Num' data={lst_work} columns={columns} expandRow={expandRow} />
            {lst_work.length > 0 ? <PaginationWork page={page} lastPage={lastPage} isStatistical={true} /> : ''}
        </div>
    );
}
export default ListStatistical;