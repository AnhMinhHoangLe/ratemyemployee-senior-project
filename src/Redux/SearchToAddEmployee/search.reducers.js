import searchActionType from "./search.types";
import {addEmployeeToList, removeEmployeeToList} from "./search.utils"
const INITIAL_STATE = {
  employeeListInGroupTemp: [],
};

const employeeListTempReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchActionType.ADDING_EMPLOYEE_LIST_TEMP:
        return {
            ...state,
            employeeListInGroupTemp: addEmployeeToList(state.employeeListInGroupTemp,action.payload)
            };
    case searchActionType.REMOVING_EMPLOYEE_LIST_TEMP:
        return {
            ...state,
            employeeListInGroupTemp: removeEmployeeToList(state.employeeListInGroupTemp, action.payload)
            }; 
      case searchActionType.CLEAR_EMPLOYEE_LIST_TEMP:
          return {
              ...state,
              employeeListInGroupTemp: []
          }
    default:
      return state;
  }
};
export default employeeListTempReducer;
