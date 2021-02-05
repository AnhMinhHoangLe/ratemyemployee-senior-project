import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';
import employeeReducer from "./Employee/employee.reducer"
import employeeInfoReducer from "./Individuals/Individuals.reducer"
import editInfoEmployeeReducer from "./optionBetweenGroupandIndividual/optionGroupandIndividual.reducer"
const rootReducer = combineReducers({
        user: userReducer,
        employee: employeeReducer,
        employeeInfo: employeeInfoReducer,
        editEmployeeInfo: editInfoEmployeeReducer
});

export default rootReducer;