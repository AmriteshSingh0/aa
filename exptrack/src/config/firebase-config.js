// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2bN3xEr68vuhhJzR2j3P2FoheaqRwtHY",
  authDomain: "exprense-tracker-8bc31.firebaseapp.com",
  projectId: "exprense-tracker-8bc31",
  storageBucket: "exprense-tracker-8bc31.appspot.com",
  messagingSenderId: "266063200952",
  appId: "1:266063200952:web:0f3038a4208bdddc0e6a4d",
  measurementId: "G-NWDCWNCXPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
//const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

//firebase init
//firebase depoy
