// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6CMXS0AdERSk9pF0tO6MY35yTf_G23gs",
    authDomain: "bolsa-rea.firebaseapp.com",
    databaseURL: "https://bolsa-rea.firebaseio.com",
    projectId: "bolsa-rea",
    storageBucket: "bolsa-rea.appspot.com",
    messagingSenderId: "126337922869",
    appId: "1:126337922869:web:3e225844b0599c1e073e7c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {db, auth, provider}