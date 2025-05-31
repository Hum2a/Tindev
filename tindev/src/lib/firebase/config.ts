import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBHlWbgPOzoWadwK3VrRFuFYDgZeLGiw04",
    authDomain: "tindev-b839d.firebaseapp.com",
    projectId: "tindev-b839d",
    storageBucket: "tindev-b839d.firebasestorage.app",
    messagingSenderId: "752598943975",
    appId: "1:752598943975:web:725a3e7b3307c11c907a42",
    measurementId: "G-Z5DC0DTRBG"
  };  

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; 