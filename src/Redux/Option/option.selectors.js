import { createSelector } from "reselect";

const selectOption = (state) => state.option;
export const selectOptionBetweenGroupAndTask = createSelector(
	[selectOption],
	(selectOption) => selectOption.option
);
