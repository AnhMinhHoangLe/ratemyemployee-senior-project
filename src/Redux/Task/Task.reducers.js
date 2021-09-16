import taskActionType from "./Task.types";
import DATA_TASK from "./DATA_TASK";
import { addTaskToList, removeTaskToList } from "./Task.utils";
const INITIAL_STATE = {
  isFetching:false, 
  task: null,
};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case taskActionType.FETCH_TASK_START:
      return {
        ...state,
        isFetching: true,
      }
    case taskActionType.FETCH_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        task: action.payload
      }
    // case taskActionType.ADD_TASK:
    //   return {
    //     ...state,
    //     task: addTaskToList(state.cart, action.payload),
    //   };
    // case taskActionType.REMOVE_TASK:
    //   return {
    //     ...state,
    //     task: removeTaskToList(state.cart, action.payload),
    //   };
    default:
      return state;
  }
};
export default taskReducer;
