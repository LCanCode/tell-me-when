import { initializeApp } from 'firebase/app';
// import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBekng4q5_Wz5OkwRzES9ZP1cM5SOg63Hk",
  authDomain: "tell-me-when-f79d4.firebaseapp.com",
  projectId: "tell-me-when-f79d4",
  storageBucket: "tell-me-when-f79d4.appspot.com",
  messagingSenderId: "27345241347",
  appId: "1:27345241347:web:3f21e461d92c8833a09536"
};


if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export { firebase };


