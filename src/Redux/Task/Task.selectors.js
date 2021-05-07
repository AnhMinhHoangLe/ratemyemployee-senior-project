import { createSelector } from "reselect";

const selecttask = (state) => state.task;

export const selectTask = createSelector(
	[selecttask],
	(task) => task.task
);
