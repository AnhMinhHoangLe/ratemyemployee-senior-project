import taskActionType from "./Task.types";
export const addTask = (task) => ({
	type: taskActionType.ADD_TASK,
	payload: task,
});
