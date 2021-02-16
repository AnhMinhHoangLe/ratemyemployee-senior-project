import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import employeeReducer from "./Employee/employee.reducer";
import employeeInfoReducer from "./Individuals/Individuals.reducer";
import editInfoEmployeeReducer from "./optionBetweenGroupandIndividual/optionGroupandIndividual.reducer";
const rootReducer = combineReducers({
    user: userReducer, // user
    employee: employeeReducer, //  group employee
    individual: employeeInfoReducer, // each employee
    editEmployeeInfo: editInfoEmployeeReducer, // to edit the employee information
});

export default rootReducer;
