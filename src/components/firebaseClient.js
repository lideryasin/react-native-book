//const firebase = require('firebase')
//import { API_KEY } from 'react-native-dotenv'
import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgYcHwfwhQbrx_Ux_AvCqIkSn3mzog_Mo",
  authDomain: "react1-697c3.firebaseapp.com",
  databaseURL: "https://react1-697c3.firebaseio.com",
  projectId: "react1-697c3",
  storageBucket: "react1-697c3.appspot.com",
  messagingSenderId: "190614813192"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp;