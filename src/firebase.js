// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1nmGvmu7QXvutLt4y4MNnhW8C3lU4eXk",
  authDomain: "meals-on-wings.firebaseapp.com",
  projectId: "meals-on-wings",
  storageBucket: "meals-on-wings.appspot.com",
  messagingSenderId: "886077398226",
  appId: "1:886077398226:web:44926d6b12ba3531c7610b",
  measurementId: "G-5S10SF1N5H"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

const analytics = getAnalytics(app);