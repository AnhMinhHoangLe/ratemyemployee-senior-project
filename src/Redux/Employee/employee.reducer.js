import DATA_GROUP from "./DATA_GROUP";
import employeeActionTypes from "./employee.types";

const INITIAL_STATE = {
    // employee: DATA_GROUP
    employee: null,
};

const employeeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case employeeActionTypes.UPDATE_GROUP:
            return {
                ...state,
                employee: action.payload,
            };
        default:
            return state;
    }
};
export default employeeReducer;
