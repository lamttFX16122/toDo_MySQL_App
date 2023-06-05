import React, { useState } from "react";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { checkEmail, register } from "../actions/authenticationAction";
import { useNavigate } from "react-router-dom";
import { valEmail, valPassword, valPhone } from '../constants/validationInput';
const Register = () => {
    //State Form
    const [form, setForm] = useState({});
    //State Error
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }
    // func check input invalid
    const findFormErrors = async () => {
        const { email, password, confirmPassword, userName, sex, phone, dayOfBirth } = form;
        let newErrors = {};
        const callCheckEmail = await checkEmail(email);
        // email error
        if (!email || email === '') {
            newErrors.email = 'Email bắt buộc nhập!';
        }
        else if (!valEmail.test(email)) {
            newErrors.email = 'Email không hợp lệ!';
        }
        else if (!callCheckEmail) {
            newErrors.email = 'Email đã tồn tại!';
        }
        // password error
        if (!password || password === '' || !valPassword.test(password)) {
            newErrors.password = 'Mật khẩu bất kỳ từ 8 đến 12 ký tự!';
        }
        // confirmPassword error
        if (!confirmPassword || confirmPassword !== password) {
            newErrors.confirmPassword = 'Xác thực mật khẩu không khớp!';
        }
        // userName error
        if (!userName || userName === '') {
            newErrors.userName = 'Họ tên không được để trống!';
        }
        // sex error
        if (!sex || sex === '') {
            newErrors.sex = 'Chưa chọn giới tính!';
        }
        if (!dayOfBirth || dayOfBirth === '') {
            newErrors.dayOfBirth = 'Chưa nhập ngày sinh!';
        }
        else if (moment().diff(dayOfBirth, 'days') <= 0) {
            newErrors.dayOfBirth = 'Ngày sinh không hợp lệ!';
        }
        if (!phone || phone === '') {
            newErrors.phone = 'Chưa nhập số điện thoại!';
        } else if (!valPhone(phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ!';
        }
        return newErrors;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const newErrors = await findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
        else {
            const { confirmPassword, ...user } = form;
            register(user, navigate);
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
                                    <h2 className="fw-bold mb-2 text-uppercase ">To Do - Đăng ký</h2>
                                    <p className=" mb-3">Điền thông tin cần thiết!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={onSubmit}>
                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    // value={email}
                                                    isInvalid={!!errors.email}
                                                    onChange={(e) => setField('email', e.target.value)}
                                                    placeholder="example@gmail.com" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                                <Form.Label>Mật khẩu</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    // value={password}
                                                    isInvalid={!!errors.password}
                                                    onChange={(e) => setField("password", e.target.value)}
                                                    placeholder="Mật khẩu" />
                                                <Form.Control.Feedback name='feedPassword' type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                                                <Form.Label>Nhập lại mật khẩu</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    isInvalid={!!errors.confirmPassword}
                                                    onChange={(e) => setField('confirmPassword', e.target.value)}
                                                    placeholder="Xác nhận mật khẩu" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.confirmPassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-4"
                                                controlId="formBasicUserName"
                                            >
                                                <Form.Label>Họ và tên</Form.Label>
                                                <Form.Control type="text"
                                                    onChange={(e) => setField('userName', e.target.value)}
                                                    isInvalid={!!errors.userName}
                                                    placeholder="Họ và tên" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.userName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-4"
                                                controlId="formBasicDayOfBirth"
                                            >
                                                <Form.Label>Ngày sinh</Form.Label>
                                                <Form.Control type="date"
                                                    onChange={(e) => setField('dayOfBirth', e.target.value)}
                                                    isInvalid={!!errors.dayOfBirth}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.dayOfBirth}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-4"
                                                controlId="formBasicSex"
                                            >
                                                <Form.Label>Giới tính</Form.Label>
                                                <div className="d-flex">
                                                    <Form.Check
                                                        className="me-3"
                                                        label="Nam"
                                                        name="group1"
                                                        type="radio"
                                                        id={`inline-radio-1`}
                                                        value={0}
                                                        onChange={(e) => setField('sex', e.target.value)}
                                                        isInvalid={!!errors.sex}
                                                    />
                                                    <Form.Check
                                                        label="Nữ"
                                                        name="group1"
                                                        type="radio"
                                                        id={`inline-radio-2`}
                                                        value={1}
                                                        onChange={(e) => setField('sex', e.target.value)}
                                                        isInvalid={!!errors.sex}
                                                    />
                                                </div>
                                                {errors.sex ? <span className="text-danger">{errors.sex}</span> : ''}
                                            </Form.Group>
                                            <Form.Group className="mb-4" controlId="formBasicPhone">
                                                <Form.Label>Điện thoại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    isInvalid={!!errors.phone}
                                                    onChange={(e) => setField('phone', e.target.value)}
                                                    placeholder="+84xxxxxxxxxx - 09xxxxxxxx" />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.phone}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Đăng ký
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Quay lại trang đăng nhập?&nbsp;
                                                <a href="/login" className="text-primary fw-bold">
                                                    Đăng nhập
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

export default Register;