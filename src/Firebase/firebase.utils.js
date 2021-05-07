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
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}
	return userRef;
};
export const createEmployeeProfileDocument = async (
	userAuth,
	additionalData
) => {
	if (!userAuth) return;
	// const userRef = firestore.collection("users").doc(userAuth.uid) // get the data of the user by UID
	const userRef = firestore.doc(`employee/${userAuth.uid}`); // go to the user profile by UID
	const snapShot = await userRef.get(); // get the snapshot of the user from console
	if (!snapShot.exists) {
		// create user in database if it does not exist
		const { displayName, email } = userAuth;
		const { position, avatar } = additionalData;
		const createAt = new Date();
		const address = "";
		const gender = "";
		const phone_number = "";
		try {
			// get the data set ,  Enter new data into the document.
			await userRef.set({
				displayName,
				position,
				avatar,
				email,
				address,
				gender,
				phone_number,
				createAt,
				...additionalData,
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}
	return userRef;
};

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
export const createGroup = async (userAuth, userKey, id) => {
	const groupRef = firestore.doc(`users/${userAuth.id}`).collection(userKey);
	const createAt = new Date();
	try {
		const idGroup = groupRef.doc();
		await groupRef.doc().set({
			id,
			employee_list: [],
			idGroup: idGroup.id,
			createAt,
		});
	} catch {
		console.error();
	}
	return groupRef;
};

/**
 *
 * @param {*} userAuth current user logged in
 * @param {*} userKey name of the current collection
 * @param {*} groupKey name of the group
 * @param {*} arrayID IDs in the array list
 * @returns
 * This function is to add employee into the group that the user wishes
 */
export const addEmployeeToGroup = async (
	userAuth,
	userKey,
	groupKey,
	arrayID
) => {
	const groupIDRef = firestore.doc(
		`users/${userAuth.id}/${userKey}/${groupKey}`
	);

	arrayID.forEach((id) => {
		let IDObject = {};
		IDObject["id"] = id;
		groupIDRef.update({
			employee_list: firebase.firestore.FieldValue.arrayUnion(IDObject),
		});
	});
	return groupIDRef;
};
/**
 *
 * @param {*} userAuth: current user logged in
 * @param {*} userKey : name of the current collection
 * @param {*} info: inputted data
 * @returns
 * This function is to create new employee
 */
export const createEmployee = async (userAuth, userKey, info) => {
	const employeeRef = firestore.doc(`users/${userAuth.id}`).collection(userKey);
	// const { displayName, email, address, gender, phone_number, position } = info;
	const { displayName, email, position, avatar } = info;
	// console.log("image in firebase", avatar);

	try {
		const generateID = employeeRef.doc();
		const createAt = new Date();
		const address = "";
		const gender = "";
		const phone_number = Number();
		// Image: https://stackoverflow.com/questions/61215555/how-to-upload-image-to-firebase-storage-and-upload-url-to-firestore-simultaneous
		await generateID.set({
			displayName,
			email,
			address,
			gender,
			phone_number,
			position,
			avatar,
			id: generateID.id,
			createAt,
		});
	} catch {
		console.error();
	}
	return employeeRef;
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

/**
 *
 * @param {*} employeeID : get the ID of employee
 * @param {*} groupID : get the current group ID of employee
 * @param {*} ratingData : the rate of the manager rated for employee
 * @returns
 */
export const ratingStar = async (idEmployee, groupID, ratingData) => {
	const ratingRef = firestore.doc(`rate/${idEmployee}`);
	try {
		let set = {};
		set["rate"] = ratingData;
		set["createAt"] = new Date().toLocaleDateString("en-US");
		ratingRef.update({
			infoRating: firebase.firestore.FieldValue.arrayUnion(set),
		});
	} catch (error) {
		console.error("Failed to write database", error);
	}

	return ratingRef;
};
// export const updateRating = async (employeeID, groupKey, ratingData) => {
// 	const employeeRef = firestore
// 		.doc(`rate/${employeeID}/group`)
// 		.collection(groupKey);
// const data_rating = employeeRef.docs.map((doc) => {});
// try {
// 	await employeeRef.doc().set({
// 		avg_group_rating,
// 		employee_list: [],
// 	});
// } catch {
// 	console.error();
// }
// 	return employeeRef;
// };
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
