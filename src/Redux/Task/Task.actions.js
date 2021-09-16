import taskActionType from "./Task.types";
import { firestore } from "../../Firebase/firebase.utils";
import {convertDataTaskSnapshot} from "../../Firebase/firebase.snapshot"
// export const addTask = (task) => ({
// 	type: taskActionType.ADD_TASK,
// 	payload: task,
// });
export const fetchTaskStart = () => ({
	type: taskActionType.FETCH_TASK_START,
  });
export const fetchingTaskSuccess = (taskMap) => ({
	type: taskActionType.FETCH_TASK_SUCCESS,
	payload: taskMap
})
export const fetchingTaskStartAsync = (groupID) => {
	return (dispatch) => {
		const getTaskFromGroupID = firestore.doc(`task/${groupID}`)
			dispatch(fetchingTaskSuccess())
		getTaskFromGroupID.onSnapshot(async (snapshot) => {
			const taskMap = convertDataTaskSnapshot(snapshot);
			dispatch(fetchingTaskSuccess(taskMap))
	});
	}
}
