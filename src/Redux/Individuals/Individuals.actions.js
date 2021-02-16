import individualsActionType from "./Individuals.types";
export const updateEmployee = (employeeMap) => ({
    type: individualsActionType.UPDATE_EMPLOYEE,
    payload: employeeMap,
});
