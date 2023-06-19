import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './../actions/authenticationAction';
import * as type from '../constants/actionType';
import { createAxios } from '../shares/axiosJWT';
import { setWorkStatus } from '../actions/statisticalAction';

const Navigation = () => {
    const auth = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(auth, type.LOGOUT_SUCCESS, dispatch);
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(logout(auth.sessionId, auth.token, navigate, axiosJWT));
    }
    const handleClickStatistical = (value) => {
        dispatch(setWorkStatus(value, navigate))
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">To Do</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav">
                    <i className="fa-solid fa-bars"></i>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Thống kê" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => handleClickStatistical(1)} href="#action/3.1">Công việc đang làm</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleClickStatistical(0)} href="#action/3.2">
                                Công việc đang chờ
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleClickStatistical(2)} href="#action/3.3">Công việc đã làm</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title={auth?.user?.userName} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#" onClick={() => navigate('/userInfo')}>Thông tin cá nhân</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate('/changeInfo')} href="#">Sửa thông tin các nhân</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate('/changePassword')} href="#">Đổi mật khẩu</NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                        </NavDropdown>
                        <Nav.Link onClick={() => handleLogOut()}>
                            Đăng xuất
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
export default Navigation;