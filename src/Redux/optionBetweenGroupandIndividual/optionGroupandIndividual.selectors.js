import { createSelector } from "reselect";

const selectEditEmployee = (state) => state.editEmployeeInfo;
export const selectOptionBetweenGroupAndIndividual = createSelector(
    [selectEditEmployee],
    (editEmployeeInfo) => editEmployeeInfo.options
);
