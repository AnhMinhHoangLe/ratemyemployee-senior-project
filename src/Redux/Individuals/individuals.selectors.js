import { createSelector } from "reselect";

const selectemployeeinfo = (state) => state.individual;
export const arrayIDEmployee = createSelector(
	[selectemployeeinfo],
	(individual) => individual.employeeArray // if not .employee, it will print out variable = object, and array (map) bug
);

//!NOTE: line need to have the same name of state
export const selectEmployeeInfo = createSelector(
	[selectemployeeinfo],
	(individual) => individual.employeeInfo // if not .employee, it will print out variable = object, and array (map) bug
);
export const selectIsFetchingEmployeeInfo = createSelector(
	[selectemployeeinfo],
	(individual) => individual.isFetching // if not .employee, it will print out variable = object, and array (map) bug
);

export const selectListEmployee = createSelector([selectEmployeeInfo], (emp) =>
	emp ? Object.keys(emp).map((key) => emp[key]) : []
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

	
export const selectEmployeeIDForRateCard = createSelector([selectemployeeinfo], (idEmployee) => idEmployee.idEmployeePickToRate)