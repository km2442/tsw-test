import firebase from 'firebase'
// Initialize Firebase
let config = {
    //credentials
};
const firebaseApp = firebase.initializeApp(config);

// export firestore database
export default firebaseApp;