import { auth, firestore } from "./firebase.utils";

/**
 * @params snapshot
 * to get the data id of employee in the list Employee of manager
 *
 */
export const convertDataEmployeeArraySnapShot = (snapshot) => {
  //get the id from Users/../employee and return the set of array id:[{id:1}, {id:2}]
  const employeeDataRef = snapshot.docs.map((doc) => {
    const { id } = doc.data(); // get the data by data()
    return {
      id,
    };
  });
  // console.log("employeeDataRef", employeeDataRef);
  // get all the id and return an array of id [1,2]
  return employeeDataRef.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection;
    return [...accumulator, collection.id];
  }, []);
};

export const convertDataEmployeeSnapShot = (snapshot) => {
  const employeeRef = snapshot.docs.map((doc) => {
    const {
      address,
      avatar,
      displayName,
      email,
      gender,
      phone_number,
      id,
      position,
      groupActive,
      groupHistory,
    } = doc.data(); // get the data by data()
    return {
      address,
      avatar,
      displayName,
      email,
      id,
      position,
      gender,
      phone_number,
      groupActive,
      groupHistory,
    };
  });
  return employeeRef.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection;
    return accumulator;
  }, {});
};

// To convert all the data of group collection
export const convertDataGroupSnapShot = (snapshot) => {
  const groupRef = snapshot.docs.map((doc) => {
    const { id, employee_list, idGroup, description } = doc.data();
    return {
      id,
      employee_list,
      idGroup,
      description
    };
  });

  return groupRef.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection;
    return accumulator;
  }, {});
};

export const convertDataRateSnapShot = (snapshot) => {
  // const { group } = snapshot.data();
  // set[id] = group;
  const rateRef = snapshot.docs.map((doc) => {
    const { id, group } = doc.data();
    return {
      id,
      group,
    };
  });
  const res = rateRef.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection;
    return accumulator;
  }, {});

  return res;
};

// export const convertTaskData = (groupID) => {
//   try {
//     const set = {};
//     const taskRef = firestore
//       .doc(`task/${groupID}`)
//       .onSnapshot(async (snapshot) => {
//         const task = snapshot.data();
//         if (task) {
//           set[groupID] = task;
//         }
//       });
//     return set;
//   } catch (error) {
//     console.error();
//   }
// };
