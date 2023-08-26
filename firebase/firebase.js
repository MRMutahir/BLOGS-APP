// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
// import { getAnalytics } from "firebase/analytics";

// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase/auth.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
//    m abhi is ko commint kr raa hon pher kl jo jo  need  hogi m get krlnga
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  // doc,
  updateDoc,

  // doc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3OQ074n6liiSPqp9fT4Bb5_rAu0z5Mgo",
  authDomain: "hackathon-3219f.firebaseapp.com",
  projectId: "hackathon-3219f",
  storageBucket: "hackathon-3219f.appspot.com",
  messagingSenderId: "292186231750",
  appId: "1:292186231750:web:d03a2c475c23bfe4eb98c7",
  measurementId: "G-E7YZVEBKNN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const db = firebase.firestore();

const storage = getStorage();

// const storage = firebase.storage();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//    m abhi is ko commint kr raa hon pher kl jo jo  need  hogi m get krlnga

// const auth = getAuth();

// agr hme ki btn per onclick lagana hen us k liye

export {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  setDoc,
  db,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  storage,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  signOut,
  updateDoc,
};
// window.selects = selects
