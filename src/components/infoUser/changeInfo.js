import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { userChangeInfo } from '../../actions/userAction';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { valPhone } from '../../constants/validationInput';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { createAxios } from '../../shares/axiosJWT';
import * as type from '../../constants/actionType';
const ChangeInfo = () => {
    const auth = useSelector(state => state.authReducer);
    //State Error
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(auth.user);
    const [dayOfBirth, setDayOfBirth] = useState(new Date(user.dayOfBirth));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(auth, type.REFRESH_TOKEN_SUCCESS, dispatch);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(values => ({ ...values, [name]: value }))
    }
    // func check input invalid
    const findFormErrors = async () => {
        const { userName, sex, phone } = user;
        console.log(sex)
        let newErrors = {};
        // userName error
        if (!userName || userName === '') {
            newErrors.userName = 'Họ tên không được để trống!';
        }
        // sex error
        if (sex === '') {
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
        user.dayOfBirth = moment(dayOfBirth).format('YYYY-MM-DD')
        const newErrors = await findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
        else {
            dispatch(userChangeInfo(user, auth.token, axiosJWT, navigate))
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
                                    <h2 className="fw-bold mb-2 text-uppercase ">To Do - Thay đổi thông tin</h2>
                                    <div className="mb-3">
                                        <Form onSubmit={onSubmit}>
                                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    value={user.email}
                                                    isInvalid={!!errors.email}
                                                    disabled />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-4"
                                                controlId="formBasicUserName"
                                            >
                                                <Form.Label>Họ và tên</Form.Label>
                                                <Form.Control type="text"
                                                    name="userName"
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.userName}
                                                    value={user.userName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.userName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-4"
                                                controlId="formBasicDayOfBirth"
                                            >
                                                <Form.Label>Ngày sinh</Form.Label>
                                                <DatePicker className="form-control"
                                                    selected={dayOfBirth}
                                                    dateFormat="dd/MM/yyyy"
                                                    onChange={(date) => setDayOfBirth(date)}
                                                />
                                                {errors.dayOfBirth ? <span className="text-danger">{errors.dayOfBirth}</span> : ''}
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-4"
                                                controlId="formBasicSex"
                                            >
                                                <Form.Label>Giới tính</Form.Label>
                                                <div className="d-flex">
                                                    <Form.Check
                                                        checked={parseInt(user.sex) === 0 ? true : false}
                                                        className="me-3"
                                                        label="Nam"
                                                        name="sex"
                                                        type="radio"
                                                        id={`inline-radio-1`}
                                                        value={0}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.sex}
                                                    />
                                                    <Form.Check
                                                        label="Nữ"
                                                        checked={parseInt(user.sex) === 1 ? true : false}
                                                        name="sex"
                                                        type="radio"
                                                        id={`inline-radio-2`}
                                                        value={1}
                                                        onChange={handleChange}
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
                                                    onChange={handleChange}
                                                    name='phone'
                                                    value={user.phone} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.phone}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <div className="d-flex justify-content-end">
                                                <Button className="me-3" onClick={() => navigate(-1)} variant="danger" type="button">
                                                    Hủy
                                                </Button>
                                                <Button variant="primary" type="submit">
                                                    Hoàn tất
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
export default ChangeInfo;