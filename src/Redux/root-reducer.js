import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';
import employeeReducer from "./Employee/employee.reducer"
import employeeInfoReducer from "./Individuals/Individuals.reducer"
const rootReducer = combineReducers({
        user: userReducer,
        employee: employeeReducer,
        employeeInfo: employeeInfoReducer,
});

export default rootReducer;