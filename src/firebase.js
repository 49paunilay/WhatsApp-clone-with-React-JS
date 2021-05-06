import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDntjT8pdpb2g1ya-82CrQmvJdSuKRS9bA",
  authDomain: "whatsapp-clone-89b88.firebaseapp.com",
  projectId: "whatsapp-clone-89b88",
  storageBucket: "whatsapp-clone-89b88.appspot.com",
  messagingSenderId: "189233585361",
  appId: "1:189233585361:web:fd8808037a330343b679f0",
  measurementId: "G-66JGPL0ZFW"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;