import { combineReducers } from "redux";
import authReducer from "./authenticationReducer";
import formReducer from './formReducer';
import workReducer from "./workReducer";
import controlReducer from "./controlReducer";
import userReducer from "./userReducer";
import statisticalReducer from "./statisticalReducer";
let mainReducer = combineReducers({
    authReducer,
    formReducer,
    workReducer,
    controlReducer,
    userReducer,
    statisticalReducer
});
export default mainReducer;