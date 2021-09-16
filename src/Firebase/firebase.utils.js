import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDVArB3fcE0_LnfqnWRMWMDjeWVVDf-vYQ",
  authDomain: "rate-my-employee-d7636.firebaseapp.com",
  projectId: "rate-my-employee-d7636",
  storageBucket: "rate-my-employee-d7636.appspot.com",
  messagingSenderId: "146488335212",
  appId: "1:146488335212:web:20e269ca915cb90b3d3149",
  measurementId: "G-KX4PF92L3L",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // const userRef = firestore.collection("users").doc(userAuth.uid) // get the data of the user by UID
  const userRef = firestore.doc(`users/${userAuth.uid}`); // go to the user profile by UID
  const userRefCreatedEmlployeeCollectioninUserID = userRef.collection('employee')
  const createEmployeeCollection = firestore.collection('employee')
  const rateInfo = firestore.collection('rate')

  const snapShot = await userRef.get(); // get the snapshot of the user from console
  if (!snapShot.exists) {
    // create user in database if it does not exist
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {

      // get the data set ,  Enter new data into the document.
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
      await userRefCreatedEmlployeeCollectioninUserID.doc(userAuth.uid).set({
        id: userAuth.uid,
      })
      await createEmployeeCollection.doc(userAuth.uid).set({
        displayName,
        email,
        address: "",
        gender: "",
        phone_number: "",
        position:"Admin",
        groupActive: true,
        currentGroupID: "", 
        groupHistory:"", 
        avatar:"",
        id: userAuth.uid, 
        createAt,
        admin: true
      })
    const avg_rating = 0

        await rateInfo.doc(userAuth.uid).set({
          id: userAuth.uid, 
          avg_rating, 
          group: {
            }
          },
        )
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};
// export const createEmployeeProfileDocument = async (
//   userAuth,
//   additionalData
// ) => {
//   if (!userAuth) return;
//   // const userRef = firestore.collection("users").doc(userAuth.uid) // get the data of the user by UID
//   const userRef = firestore.doc(`employee/${userAuth.uid}`); // go to the user profile by UID
//   const snapShot = await userRef.get(); // get the snapshot of the user from console
//   if (!snapShot.exists) {
//     // create user in database if it does not exist
//     const { displayName, email } = userAuth;
//     const { position, avatar } = additionalData;
//     const createAt = new Date();
//     const address = "";
//     const gender = "";
//     const phone_number = "";
//     try {
//       // get the data set ,  Enter new data into the document.
//       await userRef.set({
//         displayName,
//         position,
//         avatar,
//         email,
//         address,
//         gender,
//         phone_number,
//         createAt,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.log("error creating user", error.message);
//     }
//   }
//   return userRef;
// };

// //To add the data of group in DATA_GROUP
// export const addGroupInFile = async (userAuth, userKey, groupToAdd) => {
//     const groupRef = firestore.doc(`users/${userAuth.uid}`).collection(userKey); // the link to add data
//     const batch = firestore.batch(); // waiting for all the set, and add one the time
//     groupToAdd.forEach((group) => { // call each data by forEach
//         const newDocRef = groupRef.doc(); // call the link
//         // console.log(newDocRef);

//         batch.set(newDocRef, group); // add the data to the link
//     });

//     return await batch.commit(); // commit the data to push to database
// };

// //To add the data of employee in DATA_EMPLOYEE
// export const addEmployeeInFile = async (userAuth, userKey, employeeToAdd) => {
//      // create a link where you want to add new collection ( userAuth is current user, userKey is for the name of collection we want to create, employeeToAdd is the data)
//     const employeeRef = firestore
//         .doc(`users/${userAuth.uid}`)
//         .collection(userKey);
//     const batch = firestore.batch(); // declare the batch function is to wait for all data, and added to db once
//     employeeToAdd.forEach((employee) => { // call each data by forEach
//         const newDocRef = employeeRef.doc(employee.id);   // call the link and want to name the new link is employee ID
//         batch.set(newDocRef, employee); // set() is a function to add data to database, but cuz we have batch here, so we will wait to finish load all the data
//     });
//     return await batch.commit(); // and after that  commit to database
// };

// To convert all the data of employee collection
// export const convertDataEmployeeSnapShot = (snapshot) => {
// 	//For a collection query that snapshot is going to consist of
// 	//a number of individual documents. We can access them by saying snapshot.docs.
// 	const employeeRef = snapshot.docs.map((doc) => {
// 		const {
// 			address,
// 			avatar,
// 			displayName,
// 			email,
// 			gender,
// 			phone_number,
// 			id,
// 		} = doc.data(); // get the data by data()
// 		return {
// 			address,
// 			avatar,
// 			displayName,
// 			email,
// 			gender,
// 			phone_number,
// 			id,
// 		};
// 	});
// 	return employeeRef.reduce((accumulator, collection) => {
// 		accumulator[collection.id] = collection;
// 		return accumulator;
// 	}, {});
// };

/**
 *
 * @param {*} userAuth current user logged in
 * @param {*} userKey name of the current collection
 * @param {*} id : name of the group that user wants to created
 * @returns
 * This function is to create a new group
 */
export const createGroup = async (userAuth, userKey, id, description) => {
  const groupRef = firestore.doc(`users/${userAuth.id}`).collection(userKey);
  const taskRef = firestore.collection('task')
  const createAt = new Date();
  const batch = firestore.batch()
  try {
    const idGroup = groupRef.doc();
    batch.set(idGroup,{
        id,
        employee_list: [],
        idGroup: idGroup.id,
        createAt,
        description: description, 
      })
    
    batch.set(taskRef.doc(idGroup.id),{})
  } catch {
    console.error();
  }
  return  await batch.commit();
};
//////////////////////////////////////////////////////////////////////////////
/////////////////// FUNCTION FOR GROUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param {*} userAuth current user logged in
 * @param {*} userKey name of the current collection
 * @param {*} groupKey name of the group
 * @param {*} arrayID IDs in the array list
 * @returns
 * This function is to add employee into the group that the user wishes, by search
 */
export const addEmployeeToGroup = async (
  userAuth,
  userKey,
  groupKey,
  arrayID
) => {
  const groupIDRef = firestore.doc(
    `users/${userAuth.id}`
  ).collection(userKey);
  const rateInfo = firestore.collection('rate')
  const employeeInfo = firestore.collection('employee')

  const batch = firestore.batch()
  
  arrayID.map(({ id }) => {
    let IDObject = {};
    IDObject["id"] = id;

    const newGroupIDRef = groupIDRef.doc(groupKey)
    const newRateInfo = rateInfo.doc(id)
    const newEmployeeInfo = employeeInfo.doc(id)
    
    batch.set(newRateInfo, {
      group: {
              [groupKey]: {
                avg_rating: 0,
                infoRating: []
              }
            }
    }, { merge: true }
    )
    
    batch.update(newGroupIDRef, {
      employee_list: firebase.firestore.FieldValue.arrayUnion(IDObject),
    })
    
    batch.update(newEmployeeInfo, {
      groupActive: true,
      currentGroupID: groupKey,
    })
   });
  return  await batch.commit();
};



/**
 *
 * 
 * @param {*} userAuth: current user logged in
 * @param {*} userKey : name of the current collection
 * @param {*} info: inputted data
 * @returns
 * This function is to create new employee in group
 */
export const createEmployee = async (userAuth, userKey, info) => {
  const batch = firestore.batch()
  const employeeRef = firestore.doc(`users/${userAuth.id}`).collection(userKey);
  const employeeInfo = firestore.collection(userKey)
  const { displayName, email, position, groupActive, currentGroupID } = info;

  const generateID = employeeInfo.doc();
  const id = generateID.id
  const createAt = new Date();
  const address = "";
  const gender = "";
  const avatar = "https://firebasestorage.googleapis.com/v0/b/rate-my-employee-d7636.appspot.com/o/images%2Ftree-736885__340.jpg?alt=media&token=4aea820d-9eba-4c4f-b9fd-e85915dd0463"
  const phone_number = Number();
  const groupHistory = []
    // Image: https://stackoverflow.com/questions/61215555/how-to-upload-image-to-firebase-storage-and-upload-url-to-firestore-simultaneous
  
  const employeeRefGenerateID = employeeRef.doc(id)
  batch.set(employeeRefGenerateID, {
    id: id
  })
 
  const rateInfo = firestore.collection('rate')
  const avg_rating = 0

  batch.set(generateID, {
    displayName,
    email,
    address,
    gender,
    phone_number,
    position,
    groupActive,
    currentGroupID, 
    groupHistory, 
    avatar,
    id, 
    createAt,
    admin: false
  })
  
  const rateInfoGenerateID = rateInfo.doc(id)
  batch.set(rateInfoGenerateID, {
      id: id, 
      avg_rating, 
      group: {
      [currentGroupID]: {
        avg_rating: 0,
        infoRating: []
            }
          },
        }
        )
  const groupIDRef = firestore.doc(
          `users/${userAuth.id}/group/${currentGroupID}`
        );
      
          let IDObject = {};
          IDObject["id"] = id;
          batch.update(groupIDRef, {
            employee_list: firebase.firestore.FieldValue.arrayUnion(IDObject),
          });
  await batch.commit();
};


export const createEmployeeInGroup = async (userAuth, userKey, info) => {
  const employeeRef = firestore.doc(`users/${userAuth.id}`).collection(userKey);
  const employeeInfo = firestore.collection('employee')
  // const { displayName, email, address, gender, phone_number, position } = info;
  // const { displayName, email, position, avatar, groupActive } = info;
    const { displayName, email, position, groupActive, currentGroupID } = info;
  // console.log("image in firebase", avatar);

  try {
    const generateID = employeeInfo.doc();
    const id = generateID.id
    const createAt = new Date();
    const address = "";
    const gender = "";
    const avatar = "https://firebasestorage.googleapis.com/v0/b/rate-my-employee-d7636.appspot.com/o/images%2Ftree-736885__340.jpg?alt=media&token=4aea820d-9eba-4c4f-b9fd-e85915dd0463"
    const phone_number = Number();
    const groupHistory = []
    // Image: https://stackoverflow.com/questions/61215555/how-to-upload-image-to-firebase-storage-and-upload-url-to-firestore-simultaneous
    await generateID.set({
      displayName,
      email,
      address,
      gender,
      phone_number,
      position,
      groupActive,
      currentGroupID,
      groupHistory, 
      avatar,
      id, 
      createAt,
    });
    await employeeRef.doc(id).set({
      id: id
    })
    const rateInfo = firestore.collection('rate')
    const avg_rating = 0

        await rateInfo.doc(id).set({
          id: id, 
          avg_rating, 
          group: {
            [currentGroupID]: {
              avg_rating: 0,
              infoRating: []
            }
          },
        }
        )
        const groupIDRef = firestore.doc(
          `users/${userAuth.id}/group/${currentGroupID}`
        );
      
          let IDObject = {};
          IDObject["id"] = id;
          await groupIDRef.update({
            employee_list: firebase.firestore.FieldValue.arrayUnion(IDObject),
          });
    
  } catch {
    console.error();
  }
};
/**
 *
 * @param {*} image : actual file of image wants to upload, it comes from the File API ( you can print the console log to see the result when you import the image into INPUT HTML FORM)
 * This function is to upload the actual picture file on storage
 */

export const UploadImageIntoStorage = async (image) => {
  const uploadTask = storage.ref(`images/${image.name}`).put(image); // Upload actual file  to the object 'images/image.name'
  //  Register three observers:
  //  1. 'state_changed' observer, called any time the state changes
  //  2. Error observer, called on failure
  //  3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("Upload is " + progress + "% done");
      // switch (snapshot.state) {
      // 	case storage.TaskState.PAUSED: // or 'paused'
      // 		console.log("Upload is paused");
      // 		break;
      // 	case storage.TaskState.RUNNING: // or 'running'
      // 		console.log("Upload is running");
      // 		break;
      // }
    },
    (error) => {
      console.error(error);
      // Handle unsuccessful uploads
    }
  );
  return uploadTask;
};
/*
* Delete Employee In Group
*/
export const deleteEmployeeInGroup = (userAuth, groupID, employeeID) => {
  const employeeRefInGroup = firestore.doc(`users/${userAuth.id}`).collection('group');
  const employeeInfo = firestore.collection('employee')
  try {
    const setToDel = { id: employeeID }
    const idEmployeeInGroupRef = employeeRefInGroup.doc(groupID);
    idEmployeeInGroupRef.update({
      employee_list: firebase.firestore.FieldValue.arrayRemove(setToDel)
    });

    const employeeUpdateActiveGroupStt = employeeInfo.doc(employeeID)
    employeeUpdateActiveGroupStt.update({
      groupActive: false,
      currentGroupID: ""
    })
  } catch {
    console.error();
  }

}

export const deleteGroup = async (userAuth, groupID, employeeList) => {
  const batch = firestore.batch()
  const employeeRefInGroup = firestore.doc(`users/${userAuth.id}`).collection('group');
  const employeeRefInGroupSpecific = employeeRefInGroup.doc(groupID)
  const employeeInfo = firestore.collection('employee')

  const taskRef = firestore.collection('task')
  const taskRefDoc = taskRef.doc(groupID)
  if (employeeList.length > 0) {
    employeeList.forEach(({id}) => {
      const newEmployeeInfo = employeeInfo.doc(id)
      batch.update(newEmployeeInfo, {
        currentGroupID: "",
        groupActive: false
      })
    })
  }
  batch.delete(employeeRefInGroupSpecific)
  batch.delete(taskRefDoc)


  await batch.commit();

}


export const deleteIndividualEmployee =  (userAuth, groupID, employeeID) => {
  const employeeRefInGroup = firestore.doc(`users/${userAuth.id}`).collection('group');
  const employeeRefInTheListOfManager = firestore.doc(`users/${userAuth.id}`).collection('employee');
  const employeeInfo = firestore.collection('employee')
  const rateInfo = firestore.collection('rate')
  
  // remove employee in group 
  if (groupID)
  {
    const setToDel = { id: employeeID }
    const idEmployeeInGroupRef = employeeRefInGroup.doc(groupID);
    idEmployeeInGroupRef.update({
      employee_list: firebase.firestore.FieldValue.arrayRemove(setToDel)
    })
  }

  employeeRefInTheListOfManager.doc(employeeID).delete()
  rateInfo.doc(employeeID).delete()
  employeeInfo.doc(employeeID).delete()

}

///////////////////////////////////////////////////////////////////////////////
///////////////////// FUNCTION FOR RATING /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param {*} employeeID : get the ID of employee
 * @param {*} groupID : get the current group ID of employee
 * @param {*} ratingData : the rate of the manager rated for employee
 * @returns
 */
export const ratingStar = (
  oldData,
  idEmployee,
  groupID,
  avgRateCalInCurrentGroup,
  newRate
) => {
  const ratingRef = firestore.doc(`rate/${idEmployee}/`);
  let statusRated = false;
  try {
    let set = {};
    set["rate"] = newRate;
    const dateCurrent = new Date();
    // to check whether the current month rated or not.
    if (
      oldData["group"][groupID]["infoRating"].find(
        ({ date }) =>
          new Date(date).getMonth() + 1 === dateCurrent.getMonth() + 1
      )
    ) {
      statusRated = false;

    } else {
      set["date"] = dateCurrent.toLocaleDateString("en-US");
      ratingRef.set(
        {
          group: {
            [groupID]: {
              avg_rating: avgRateCalInCurrentGroup,
              infoRating: firebase.firestore.FieldValue.arrayUnion(set),
            },
          },
        },
        {merge: true}
      );
    }
  } catch (error) {
    console.error("Failed to write database", error);
  }

  return statusRated;
};

export const updateOverallAvgOfEmployeeRatingStar =  (
  idEmployee,
  overAllAvg
) => {
  const ratingRef = firestore.doc(`rate/${idEmployee}/`);
      ratingRef.update(
        {
          avg_rating: overAllAvg
        }
      );
}
///////////////////////////////////////////////////////////////////////////////
///////////////////// TASK SECTION ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/**
 * 
 * @param {*} idGroup 
 * @param {*} task 
 * @param {*} idForTask 
 * CREATE TASK
 */
export const createTask = async (idGroup, task, idForTask) => {
  const taskRef = firestore
    .doc(`task/${idGroup}`)
  const {
    deadline,
    note,
    priority,
    title
  } = task
  const statusDone = false; 
  const createAt = new Date();
  const id = idForTask
  try {
      taskRef.update({
        [idForTask]: {
          deadline,
          note,
          priority,
          statusDone,
          title,
          createAt,
          id
          }
        })
    } catch (error) {
      console.error("Failed to write in database", error);
    }
};
/**
 * 
 */
export const removeTask = async (idGroup, idForTask) => {
  const taskRef = firestore.doc(`task/${idGroup}`)
  taskRef.update({
    [idForTask] : firebase.firestore.FieldValue.delete()
  })
}
export const taskFinished = (idGroup, idForTask) => {
  const taskRef = firestore.doc(`task/${idGroup}`)
  taskRef.update({
    [`${idForTask}.statusDone`] : true
  })
  
}
export const auth = firebase.auth(); // to short the command
export const firestore = firebase.firestore(); // Create a new client
export const storage = firebase.storage(); // create a storage
const provider = new firebase.auth.GoogleAuthProvider(); // declare the provider

//setCustomParameters on the initialized provider
//with an object containing the key as specified by the
// OAuth provider documentation and the corresponding value.
provider.setCustomParameters({
  prompt: "select_account",
}); // to allow all the accounts showing up and choose

//Pop up google form
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export { firebase as default };
