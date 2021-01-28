import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';
import directoryReducer from "./DirectoryEmployee/directory.reducer"
const rootReducer = combineReducers({
        user: userReducer,
        employee: directoryReducer,

});

export default rootReducer;