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

export const ChatRoom = () => {
    const messageRef = firestore.collection("messages");
    const query = messageRef.orderBy("createAt").limit(25);
    // const [messages] = userCollectionData(query, { idField: "id" })
};
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
export const convertDataEmployeeSnapShot = (snapshot) => {
    //For a collection query that snapshot is going to consist of
    //a number of individual documents. We can access them by saying snapshot.docs.
    const employeeRef = snapshot.docs.map((doc) => {
        const {
            address,
            avatar,
            displayName,
            email,
            gender,
            phone_number,
            id,
        } = doc.data(); // get the data by data()
        return {
            address,
            avatar,
            displayName,
            email,
            gender,
            phone_number,
            id,
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
        const { id, employee_list } = doc.data();
        return {
            id,
            employee_list,
        };
    });

    return groupRef.reduce((accumulator, collection) => {
        accumulator[collection.id] = collection;
        return accumulator;
    }, {});
};

export const createGroup = async (userAuth, userKey, id) => {
    const groupRef = firestore.doc(`users/${userAuth.id}`).collection(userKey);
    try {
        await groupRef.doc().set({
            id,
            employee_list: [],
        });
    } catch {
        console.error();
    }
    return groupRef;
};
export const createEmployee = async (userAuth, userKey, info) => {
    const employeeRef = firestore
        .doc(`users/${userAuth.id}`)
        .collection(userKey);
    const { displayName, email, address, gender, phone_number } = info;
    try {
        const generateID = employeeRef.doc();
        await generateID.set({
            displayName,
            email,
            address,
            gender,
            phone_number,
            id: generateID.id,
        });
    } catch {
        console.error();
    }
    return employeeRef;
};

export const auth = firebase.auth(); // to short the command
export const firestore = firebase.firestore(); // Create a new client

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
