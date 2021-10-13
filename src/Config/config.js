// import firebase from 'firebase'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyASo90Gl-YHThVfoYQJIxHJ7ntPe3GVX4w",
    authDomain: "e-commerce-app-dafed.firebaseapp.com",
    projectId: "e-commerce-app-dafed",
    storageBucket: "e-commerce-app-dafed.appspot.com",
    messagingSenderId: "629656769909",
    appId: "1:629656769909:web:0735f744557774d3922f3c",
    measurementId: "G-0THKPV0MP8"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}