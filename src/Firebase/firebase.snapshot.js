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
      admin,
      avatar,
      createAt,
      currentGroupID,
      displayName,
      email,
      gender,
      groupActive,
      groupHistory,
      id,
      phone_number,
      position,
    } = doc.data(); // get the data by data()
    return {
      address,
      admin,
      avatar,
      createAt,
      currentGroupID,
      displayName,
      email,
      gender,
      groupActive,
      groupHistory,
      id,
      phone_number,
      position,
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
    const { description, employee_list, id, idGroup } = doc.data();

    return {
      description,
      employee_list,
      id,
      idGroup,
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
    const { id, group, avg_rating } = doc.data();
    return {
      avg_rating,
      group,
      id,
    };
  });
  return rateRef.reduce((accumulator, collection) => {
    accumulator[collection.id] = collection;
    return accumulator;
  }, {});
};
export const convertDataTaskSnapshot = (snapshot) => {
  const dataTask = snapshot.data();
  return dataTask;
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
