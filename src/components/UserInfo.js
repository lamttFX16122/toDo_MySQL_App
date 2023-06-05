import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const UserInfo = () => {
    const auth = useSelector(state => state.authReducer);
    const navigate = useNavigate();
    return (
        <div>
            <Container>
                <Card className="mt-3">
                    <Card.Header className="text-center">
                        <Card.Title className="text-primary fw-bold">
                            THÔNG TIN CÁ NHÂN
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="fw-bold">{auth.user.userName}</Card.Title>
                        <ListGroup>
                            <ListGroup.Item><span className="fw-bold">Email:</span> {auth.user.email}</ListGroup.Item>
                            <ListGroup.Item><span className="fw-bold">Ngày sinh:</span> {moment(auth.user.dayOfBirth).format('DD/MM/YYYY')}</ListGroup.Item>
                            <ListGroup.Item><span className="fw-bold">Giới tính:</span> {auth.user.sex === 0 ? 'Nam' : 'Nữ'}</ListGroup.Item>
                            <ListGroup.Item><span className="fw-bold">Điện thoại:</span> {auth.user.phone}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer className="text-end">
                        <Button type='button' onClick={() => navigate('/changePassword')} className="me-3" variant="primary">Đổi mật khẩu</Button>
                        <Button type='button' onClick={() => navigate('/changeInfo')} className="me-3" variant="success">Thay đổi thông tin</Button>
                        <Button type='button' onClick={() => navigate(-1)} variant="info">Thoát</Button>
                    </Card.Footer>
                </Card>
            </Container>
        </div>
    )
}
export default UserInfo;