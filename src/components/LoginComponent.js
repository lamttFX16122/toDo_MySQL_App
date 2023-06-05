import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { login, refreshLoginPage } from '../actions/authenticationAction';
import { useNavigate } from "react-router-dom";
import { valEmail } from "../constants/validationInput";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(refreshLoginPage());
    }, [dispatch])
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
        const { email, password } = form;
        if (!email || email === '') {
            newErrors.email = 'Chưa nhập Email!';
        }
        else if (!valEmail.test(email)) {
            newErrors.email = 'Email không hợp lệ!';
        }
        if (!password || password === '') {
            newErrors.password = 'Chưa nhập mật khẩu';
        }
        return newErrors;
    }
    let authReducer = useSelector(state => state.authReducer);
    const onSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const lstErrors = findFormErrors();
        if (Object.keys(lstErrors).length > 0) {
            setErrors(lstErrors);
        }
        else {
            const { email, password } = form;
            dispatch(login(email, password, navigate));
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
                                    <h2 className="fw-bold mb-2 text-uppercase ">To Do - Đăng nhập</h2>
                                    <p className=" mb-3">Điền thông tin đăng nhập!</p>
                                    {authReducer.loginFail === true ? <p className=" mb-3 text-danger">Email hoặc mật khẩu không chính xác!</p> : ''}
                                    <div className="mb-3">
                                        <Form onSubmit={onSubmit}>
                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email
                                                </Form.Label>
                                                <Form.Control type="email"
                                                    onChange={(e) => setFiel('email', e.target.value)}
                                                    isInvalid={!!errors.email}
                                                    placeholder="Enter email" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-5"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Mật khẩu</Form.Label>
                                                <Form.Control type="password"
                                                    onChange={(e) => setFiel('password', e.target.value)}
                                                    isInvalid={!!errors.password}
                                                    placeholder="Password" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Đăng nhập
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Bạn chưa có tài khoảng?&nbsp;
                                                <a href="/register" className="text-primary fw-bold">
                                                    Đăng ký
                                                </a>
                                            </p>
                                        </div>
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
export default Login;