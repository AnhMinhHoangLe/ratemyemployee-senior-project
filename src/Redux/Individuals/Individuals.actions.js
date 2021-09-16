import individualsActionType from "./Individuals.types";
// export const updateEmployee = (employeeMap) => ({
// 	type: individualsActionType.UPDATE_EMPLOYEE,
// 	payload: employeeMap,
// });
import { firestore } from "../../Firebase/firebase.utils";
import {
  convertDataEmployeeSnapShot,
  convertDataEmployeeArraySnapShot,
  convertDataGroupSnapShot,
  convertDataRateSnapShot,
} from "../../Firebase/firebase.snapshot";
// export const updateGroup = (groupMap) => ({
//   type: employeeActionTypes.UPDATE_GROUP,
//   payload: groupMap,
// });
import {
  fetchGroupStart,
  fetchGroupSuccess,
  fetchGroupFailure,
} from "../Employee/employee.actions";
import {
  fetchingRateStart,
  fetchingRateSuccess,
  fetchingRateFailure,
} from "../Rate/rate.actions";
//For Individual
export const fetchEmployeeArrayStart = (employeeArray) => ({
  type: individualsActionType.FETCH_EMPLOYEE_ARRAY_START,
});
export const fetchEmployeeArraySuccess = (employeeArray) => ({
  type: individualsActionType.FETCH_EMPLOYEE_ARRAY_SUCCESS,
  payload: employeeArray,
});
export const fetchEmployeeFailure = (errorMessage) => ({
  type: individualsActionType.FETCH_EMPLOYEE_FAILURE,
  payload: errorMessage,
});
export const fetchEmployeeStart = (employeeArray) => ({
  type: individualsActionType.FETCH_EMPLOYEE_START,
});
export const fetchEmployeeSuccess = (employeeArray) => ({
  type: individualsActionType.FETCH_EMPLOYEE_SUCCESS,
  payload: employeeArray,
});

//For group, employee, and rate
export const fetchEmployeeGroupStartAsync =  (currentUserID) => {
  return (dispatch, getState) => {  
    const listEmployeeRef = firestore
    .doc(`users/${currentUserID}`)
    .collection("employee");
    dispatch(fetchEmployeeArrayStart());
    
    // listening for any changes in this collection.
    listEmployeeRef
      .onSnapshot(
        //listening for any changes in this collection.
        async (snapshot) => {
          const arrayIDEmployee =  convertDataEmployeeArraySnapShot(snapshot);
          dispatch(fetchEmployeeArraySuccess(arrayIDEmployee));
          if(arrayIDEmployee.length !== 0){
            
            const employeeRef = firestore.collection("employee").where("id", "in", arrayIDEmployee);
              dispatch(fetchEmployeeStart());
        
            employeeRef
              //use onSnapShot will automatically update the new data if the data got update from db
              .onSnapshot(async (snapshot) => {
                const dataEmployee = convertDataEmployeeSnapShot(snapshot);
                dispatch(fetchEmployeeSuccess(dataEmployee));
              });
        
            const getRateFromEmployeeID = firestore
                  .collection("rate")
                  .where("id", "in", arrayIDEmployee);
                dispatch(fetchingRateStart());
                await getRateFromEmployeeID.onSnapshot(async (snapshot) => {
                  const dataRate = convertDataRateSnapShot(snapshot);
                  dispatch(fetchingRateSuccess(dataRate));
                });

                //   /**
                //    * Group
                //    */
                  const groupRef = firestore
                    .doc(`users/${currentUserID}`)
                    .collection("group"); // to make the link for lead to the database
                  dispatch(fetchGroupStart());
                  await groupRef.onSnapshot(
                    //listening for any changes in this collection.
                    async (snapshot) => {
                      const groupMap = convertDataGroupSnapShot(snapshot);
                      dispatch(fetchGroupSuccess(groupMap));
                    }
                    );
                    }
        }
      )


      //   /**
      //    * RATE data just need the id list of employee
      //    * */
      //   const getRateFromEmployeeID = firestore
      //     .collection("rate")
      //     .where("id", "in", arrayIDEmployee);
      //   dispatch(fetchingRateStart());
      //   getRateFromEmployeeID.onSnapshot(async (snapshot) => {
      //     const dataRate = convertDataRateSnapShot(snapshot);
      //     dispatch(fetchingRateSuccess(dataRate));
      //   });
      // })
      // .catch((error) => {
      //   dispatch(fetchEmployeeFailure(error.message));
      // })
      // .then(() => {
      //   /**
      //    * Group
      //    */
      //   const groupRef = firestore
      //     .doc(`users/${currentUserID}`)
      //     .collection("group"); // to make the link for lead to the database
      //   dispatch(fetchGroupStart());
      //   groupRef.onSnapshot(
      //     //listening for any changes in this collection.
      //     async (snapshot) => {
      //       const groupMap = convertDataGroupSnapShot(snapshot);
      //       dispatch(fetchGroupSuccess(groupMap));
      //     },
      //     (error) => {
      //       dispatch(fetchGroupFailure(error.message));
      //     }
      //   );
      // });
  }
}
  

//Disptach employee
// export const fetchEmployeeStartAsync = (currentUserID) => {
//   return (dispatch) => {
//     const listEmployeeRef = firestore
//       .doc(`users/${currentUserID}`)
//       .collection("employee");
//     dispatch(fetchEmployeeArrayStart());
//     listEmployeeRef
//       .get()
//       .then(
//         //listening for any changes in this collection.
//         async (snapshot) => {
//           const arrayIDEmployee = convertDataEmployeeArraySnapShot(snapshot);
//           dispatch(fetchEmployeeArraySuccess(arrayIDEmployee));
//           return arrayIDEmployee;
//         }
//       )
//       .then((data) => {
//         // const { fetchEmployeeArraySuccess } = getState();
//         const employeeRef = firestore
//           .collection("employee")
//           .where("id", "in", data);
//         dispatch(fetchEmployeeStart());
//         employeeRef
//           //use onSnapShot will automatically update the new data if the data got update from db
//           .onSnapshot(async (snapshot) => {
//             const dataEmployee = convertDataEmployeeSnapShot(snapshot);
//             dispatch(fetchEmployeeSuccess(dataEmployee));
//           });
//       })
//       .catch((error) => {
//         dispatch(fetchEmployeeFailure(error.message));
//       });
//   };
// };
