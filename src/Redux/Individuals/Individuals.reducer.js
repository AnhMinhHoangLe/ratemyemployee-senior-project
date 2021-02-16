import DATA_EMPLOYEE from "./DATA_EMPLOYEE";
import individualsActionType from "./Individuals.types";

const INITIAL_STATE = {
    employeeInfo: null,
};

const employeeInfoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case individualsActionType.UPDATE_EMPLOYEE:
            return {
                ...state,
                employeeInfo: action.payload,
            };
        default:
            return state;
    }
};
export default employeeInfoReducer;
