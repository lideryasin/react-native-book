
import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "3",
  storageBucket: "",
  messagingSenderId: ""
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp;
