import taskActionType from "./Task.types";
import DATA_TASK from "./DATA_TASK"
const INITIAL_STATE = {
	task: DATA_TASK ,
};

const taskReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case taskActionType.ADD_TASK:
			return {
				...state,
				addTask: action.payload,
			};
		default:
			return state;
	}
};
export default taskReducer;
