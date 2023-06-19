import React from "react";
import { Button, Table } from "react-bootstrap";
const ItemListStatistical = (props) => {
    const { index, work, process } = props;
    // const [open, setOpen] = useState(false);
    console.log(process)
    return (
        // <React.Fragment>
        <tr key={index}>
            <td>{index}</td>
            <td>{work.workName}</td>
            <td>{work.workStatus === 0 ? 'Đang chờ' : (work.workStatus === 1 ? 'Đang làm' : 'Kết thúc')}</td>
            <td>{work.timeCreated}</td>
            <td ><Button variant="link">{work.countProcess}</Button></td>
            <td>{work.totalTimeProcess}</td>
        </tr>
        // </React.Fragment >
    )
}
export default ItemListStatistical;