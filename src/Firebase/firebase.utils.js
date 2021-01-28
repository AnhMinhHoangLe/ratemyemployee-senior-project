import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
        apiKey: "AIzaSyDVArB3fcE0_LnfqnWRMWMDjeWVVDf-vYQ",
        authDomain: "rate-my-employee-d7636.firebaseapp.com",
        projectId: "rate-my-employee-d7636",
        storageBucket: "rate-my-employee-d7636.appspot.com",
        messagingSenderId: "146488335212",
        appId: "1:146488335212:web:20e269ca915cb90b3d3149",
        measurementId: "G-KX4PF92L3L"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const ChatRoom = () => {
        const messageRef = firestore.collection('messages')
        const query = messageRef.orderBy('createAt').limit(25)
        // const [messages] = userCollectionData(query, { idField: "id" })

}
export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return
        // const userRef = firestore.collection("users").doc(userAuth.uid) // get the data of the user by UID
        const userRef = firestore.doc(`users/${userAuth.uid}`) // go to the user profile by UID
        const snapShot = await userRef.get() // get the snapshot of the user from console
        if (!snapShot.exists) {
                // create user in database if it does not exist
                const { displayName, email } = userAuth
                const createAt = new Date()
                try {
                        // get the data set ,  Enter new data into the document.
                        await userRef.set({ displayName, email, createAt, ...additionalData })
                }
                catch (error) {
                        console.log('error creating user', error.message)
                }
        }
        return userRef
}
export const auth = firebase.auth(); // to short the command
export const firestore = firebase.firestore(); // Create a new client

const provider = new firebase.auth.GoogleAuthProvider(); // declare the provider

//setCustomParameters on the initialized provider 
//with an object containing the key as specified by the
// OAuth provider documentation and the corresponding value. 
provider.setCustomParameters({
        prompt: 'select_account'
}) // to allow all the accounts showing up and choose


//Pop up google form
export const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
}


// export const createUserProfileDocument = async (userAuth, additionalData) =>{
//         if(!userAuth) retur null
// }

export default firebase