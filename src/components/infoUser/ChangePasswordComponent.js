import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { userChangePassword, refreshChangePasswordPage } from '../../actions/userAction';
import { useNavigate } from "react-router-dom";
import { valPassword } from '../../constants/validationInput';
import * as type from '../../constants/actionType';
import { createAxios } from '../../shares/axiosJWT';
const ChangePassword = () => {
    const auth = useSelector(state => state.authReducer);
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(refreshChangePasswordPage());
    }, [])
    const axiosJWT = createAxios(auth, type.REFRESH_TOKEN_SUCCESS, dispatch);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const setFiel = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }
    const findFormErrors = () => {
        const newErrors = {};
        const { oldPassword, newPassword, confirmNewPassword } = form;
        if (!oldPassword || oldPassword === '' || !valPassword.test(oldPassword)) {
            newErrors.oldPassword = 'Mật khẩu bất kỳ từ 8 đến 12 ký tự';
        }
        if (!newPassword || newPassword === '' || !valPassword.test(newPassword)) {
            newErrors.newPassword = 'Mật khẩu bất kỳ từ 8 đến 12 ký tự';
        }
        if (!confirmNewPassword || confirmNewPassword !== newPassword) {
            newErrors.confirmNewPassword = 'Xác thực mật khẩu không khớp!';
        }
        return newErrors;
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const lstErrors = findFormErrors();
        if (Object.keys(lstErrors).length > 0) {
            setErrors(lstErrors);
        }
        else {
            const { oldPassword, newPassword } = form;
            dispatch(userChangePassword(auth.user.userId, oldPassword, newPassword, auth.token, axiosJWT, navigate));
        }
    }
    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">To Do - Đổi mật khẩu</h2>
                                    {userReducer.changePasswordError === true ? <p className=" mb-3 text-danger">Mật khẩu cũ không chính xác</p> : ''}
                                    <div className="mb-3">
                                        <Form onSubmit={onSubmit}>
                                            <Form.Group
                                                className="mb-4"
                                                controlId="formBasicOldPassword">
                                                <Form.Label>Mật khẩu cũ</Form.Label>
                                                <Form.Control type="password"
                                                    onChange={(e) => setFiel('oldPassword', e.target.value)}
                                                    isInvalid={!!errors.oldPassword}
                                                    placeholder="Mật khẩu cũ" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.oldPassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-4"
                                                controlId="formBasicNewPassword">
                                                <Form.Label>Mật khẩu mới</Form.Label>
                                                <Form.Control type="password"
                                                    onChange={(e) => setFiel('newPassword', e.target.value)}
                                                    isInvalid={!!errors.newPassword}
                                                    placeholder="Mật khẩu mới" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.newPassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-4"
                                                controlId="formBasicConfirmNewPassword">
                                                <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                                                <Form.Control type="password"
                                                    onChange={(e) => setFiel('confirmNewPassword', e.target.value)}
                                                    isInvalid={!!errors.confirmNewPassword}
                                                    placeholder="Xác thực mật khẩu mới" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.confirmNewPassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                            </Form.Group>
                                            <div className="d-flex justify-content-end">
                                                <Button onClick={() => navigate(-1)} className="me-2" variant="danger" type="button">
                                                    Hủy
                                                </Button>
                                                <Button variant="primary" type="submit">
                                                    Thay đổi
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default ChangePassword;