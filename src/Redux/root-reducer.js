import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import employeeReducer from "./Employee/employee.reducer";
import employeeInfoReducer from "./Individuals/Individuals.reducer";
import optionReducer from "./Option/option.reducer";
import taskReducer from "./Task/Task.reducers"
// import employeeDBInfoReducer from "./EmployeeCollection/employeeDB.reducers";
import rateInfoReducer from "./Rate/rate.reducers";
const rootReducer = combineReducers({
	user: userReducer, // user
	employee: employeeReducer, //  group employee
	// employeeDBInfo: employeeDBInfoReducer,
	individual: employeeInfoReducer, // each employee
	rateInfo: rateInfoReducer,
	option: optionReducer,
	task: taskReducer, 
});

export default rootReducer;
