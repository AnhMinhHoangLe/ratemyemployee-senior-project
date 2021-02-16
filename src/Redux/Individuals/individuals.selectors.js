import { createSelector } from "reselect";

const selectemployeeinfo = (state) => state.individual;

//!NOTE: line need to have the same name of state
export const selectEmployeeInfo = createSelector(
    [selectemployeeinfo],
    (individual) => individual.employeeInfo // if not .employee, it will print out variable = object, and array (map) bug
);

export const selectListEmployee = createSelector(
    [selectEmployeeInfo],
    (employeeList) =>
        employeeList
            ? Object.keys(employeeList).map((key) => employeeList[key])
            : []
);
export const selectToShowEmployeeInfo = (employeeIDTakeFromURLParams) =>
    createSelector([selectEmployeeInfo], (individuals) =>
        individuals ? individuals[employeeIDTakeFromURLParams] : null
    );

//for searching
export const selectToSearch = (searchState) =>
    createSelector([selectListEmployee], (employeeSearch) =>
        employeeSearch.filter((key) => key.displayName.includes(searchState))
    );
