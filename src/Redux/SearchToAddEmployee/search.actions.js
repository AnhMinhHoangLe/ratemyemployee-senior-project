
import searchActionType from "./search.types";
export const addEmployeeToList = employeeListInGroupTemp => ({
    type: searchActionType.ADDING_EMPLOYEE_LIST_TEMP,
    payload: employeeListInGroupTemp
  });
  
  export const removeEmployeeToList = employeeListInGroupTemp => ({
    type: searchActionType.REMOVING_EMPLOYEE_LIST_TEMP,
    payload: employeeListInGroupTemp
  });
  
  export const clearAllEmployeeInList = employeeListInGroupTemp => ({
    type: searchActionType.CLEAR_EMPLOYEE_LIST_TEMP,
    payload: employeeListInGroupTemp
  });