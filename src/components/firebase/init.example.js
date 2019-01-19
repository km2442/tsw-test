import firebase from 'firebase'
// Initialize Firebase
var config = {
    //credentials
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true, forceLongPolling: true })

// export firestore database
export default firebaseApp;