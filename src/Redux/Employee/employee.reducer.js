import EmployeeActionTypes from "./employee.types"
import DATA_EMPLOYEE from "./DATA_EMPLOYEE"
const INITIAL_STATE = {
        employee: DATA_EMPLOYEE
}

const employeeReducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
                default:
                        return state;
        }
}
export default employeeReducer;
