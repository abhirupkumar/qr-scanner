import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAsh3Qv0-OSZae35fcuJ6JonzzNEXZnSzU",
    authDomain: "qr-scanner-5666b.firebaseapp.com",
    projectId: "qr-scanner-5666b",
    storageBucket: "qr-scanner-5666b.appspot.com",
    messagingSenderId: "522405933431",
    appId: "1:522405933431:web:ae1516a20938fcd4907172"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };