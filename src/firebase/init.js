// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDioWtBQtVOwg2wdy5irJSIGAL5B1EOwH4",
  authDomain: "fir-practice-de528.firebaseapp.com",
  projectId: "fir-practice-de528",
  storageBucket: "fir-practice-de528.appspot.com",
  messagingSenderId: "72330496950",
  appId: "1:72330496950:web:f9f86acd2be5f02a3d8f17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();