import DATA_EMPLOYEE from "./DATA_EMPLOYEE";
import individualsActionType from "./Individuals.types";

const INITIAL_STATE = {
  employeeArray: [],
  employeeInfo: null,
  isFetching: false,
  error_message: undefined,
};

const employeeInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case individualsActionType.FETCH_EMPLOYEE_ARRAY_START:
      return {
        ...state,
        isFetching: true,
      };

    case individualsActionType.FETCH_EMPLOYEE_ARRAY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employeeArray: action.payload,
      };
    case individualsActionType.FETCH_EMPLOYEE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error_message: action.payload,
      };
    case individualsActionType.FETCH_EMPLOYEE_START:
      return {
        ...state,
        isFetching: true,
      };
    case individualsActionType.FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employeeInfo: action.payload,
      };
    default:
      return state;
  }
};
export default employeeInfoReducer;
