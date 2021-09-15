import { createSelector } from "reselect";

const selecttask = (state) => state.task;

export const selectTask = createSelector([selecttask], (task) => task.task);

export const selectKeyOfGroup = createSelector([selectTask], (idx) =>
idx ? Object.keys(idx) : []
);
export const overviewTask = createSelector([selectTask], (idx) =>
  idx ? Object.keys(idx).map((key) => idx[key]) : []
);

//to scan the array of that group, to print task on component
