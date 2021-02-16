import employeeActionTypes from "./employee.types";
export const updateGroup = (groupMap) => ({
    type: employeeActionTypes.UPDATE_GROUP,
    payload: groupMap,
});
