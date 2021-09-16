import employeeActionTypes from "./employee.types";
import { firestore } from "../../Firebase/firebase.utils";
import { convertDataGroupSnapShot } from "../../Firebase/firebase.snapshot";
// export const updateGroup = (groupMap) => ({
//   type: employeeActionTypes.UPDATE_GROUP,
//   payload: groupMap,
// });
export const fetchGroupStart = (groupMap) => ({
  type: employeeActionTypes.FETCH_GROUP_START,
});
export const fetchGroupSuccess = (groupMap) => ({
  type: employeeActionTypes.FETCH_GROUP_SUCCESS,
  payload: groupMap,
});
export const fetchGroupFailure = (errorMessage) => ({
  type: employeeActionTypes.FETCH_GROUP_FAILURE,
  payload: errorMessage,
});

export const fetchGroupStartAsync = (currentUserID) => {
  return (dispatch) => {
    const groupRef = firestore
      .doc(`users/${currentUserID}`)
      .collection("group"); // to make the link for lead to the database
    dispatch(fetchGroupStart());
    groupRef.onSnapshot(
      //listening for any changes in this collection.
      async (snapshot) => {
        const groupMap = convertDataGroupSnapShot(snapshot);
        dispatch(fetchGroupSuccess(groupMap));
      },
      (error) => {
        dispatch(fetchGroupFailure(error.message));
      }
    );
  };
};

