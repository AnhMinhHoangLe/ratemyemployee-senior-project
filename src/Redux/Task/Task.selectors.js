import { createSelector } from "reselect";

const selecttask = (state) => state.task;

export const selectTask = createSelector([selecttask], (task) => task.task);
export const overviewTask = createSelector([selectTask], (idx) =>
  idx ? Object.keys(idx) : []
);
//to scan the array of that group, to print task on component
export const indicateSpecificGroup = (idGroupURL) =>
  createSelector([selectTask], (taskToPrint) => taskToPrint[idGroupURL]);
