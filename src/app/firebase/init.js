// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc71bNUVrW2Ofh-ffEQbmsy4Ju9R22q7A",
  authDomain: "intership-v2.firebaseapp.com",
  projectId: "intership-v2",
  storageBucket: "intership-v2.firebasestorage.app",
  messagingSenderId: "603776617066",
  appId: "1:603776617066:web:2d5c02c05d25e807139813",
  measurementId: "G-2WQY76M692"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };