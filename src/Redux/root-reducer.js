import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import employeeReducer from "./Employee/employee.reducer";
import employeeInfoReducer from "./Individuals/Individuals.reducer";
import optionReducer from "./Option/option.reducer";
import taskReducer from "./Task/Task.reducers";
import rateInfoReducer from "./Rate/rate.reducers";
import employeeListTempReducer from "./SearchToAddEmployee/search.reducers"
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['employee, individual, rateInfo', 'option', 'task','employeeListInGroupTemp'  ]
};

const rootReducer = combineReducers({
  user: userReducer, // user
  employee: employeeReducer, //  group employee
  individual: employeeInfoReducer, // each employee
  rateInfo: rateInfoReducer,
  option: optionReducer,
  task: taskReducer,
  employeeListInGroupTemp: employeeListTempReducer, 
});

export default persistReducer(persistConfig,rootReducer);
// export default rootReducer;

