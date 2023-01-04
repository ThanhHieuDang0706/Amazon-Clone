import firebase from "firebase/app";
import "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbU5mguymxg7ET5Cn0Q-VB3YHI5xhArdI",
  authDomain: "clone-d002c.firebaseapp.com",
  projectId: "clone-d002c",
  storageBucket: "clone-d002c.appspot.com",
  messagingSenderId: "235542093724",
  appId: "1:235542093724:web:09899325f2397609327259",
};

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
