import DATA_GROUP from "./DATA_GROUP";
import employeeActionTypes from "./employee.types";

const INITIAL_STATE = {
  // employee: DATA_GROUP
  isFetching: false,
  employee: null,
  error_message: undefined,
};

const employeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case employeeActionTypes.FETCH_GROUP_START:
      return {
        ...state,
        isFetching: true,
      };
    case employeeActionTypes.FETCH_GROUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employee: action.payload,
      };
    case employeeActionTypes.FETCH_GROUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        error_message: action.payload,
      };
    default:
      return state;
  }
};
export default employeeReducer;
