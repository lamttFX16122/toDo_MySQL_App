import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './LoginComponent';
import HomePage from './HomePageComponent';
import RegisterPage from './RegisterComponent';
import ChangePassword from './infoUser/ChangePasswordComponent';
import UserInfo from './UserInfo';
import ChangeInfo from './infoUser/changeInfo';
import Navigation from './NavigateComponent';
import StatisticalPage from './StatisticalPage';
import { useSelector, useDispatch } from 'react-redux';
import PdfViewer from './statistical/ReactViewer';
import { useEffect } from 'react';
import * as type from '../constants/actionType';

const Main = () => {
    const authReducer = useSelector(state => state.authReducer);
    const navigate = useNavigate();
    const dispacth = useDispatch();

    useEffect(() => {
        if (authReducer.refreshTokenFail) {
            alert('Phiên làm việc hết hạn hoặc có lỗi trong phiên làm việc! Vui lòng đăng nhập lại!!!');
            dispacth({ type: type.LOGOUT_SUCCESS });
            return navigate('/login');
        }
    }, [authReducer])
    return (
        <div>
            {!authReducer.sessionId ? '' : <Navigation />}
            <Routes>
                <Route path='/' element={<HomePage />} exact />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/changePassword' element={<ChangePassword />} />
                <Route path='/changeInfo' element={<ChangeInfo />} />
                <Route path='/userInfo' element={<UserInfo />} />
                <Route path='/statistical' element={<StatisticalPage />} />
                <Route path='/pdfViewer' element={<PdfViewer />} />
            </Routes>
        </div>
    )
}
export default Main;