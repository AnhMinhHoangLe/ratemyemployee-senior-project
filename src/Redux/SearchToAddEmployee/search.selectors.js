import { createSelector } from "reselect";

const selectAddEmployeeTemp = (state) => state.employeeListInGroupTemp;

export const selectEmployeeTempList = createSelector(
    [selectAddEmployeeTemp], 

  (employee) => employee.employeeListInGroupTemp
);



