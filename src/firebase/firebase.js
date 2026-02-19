import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyBPiwB7_JoUvvS-1MrS4dXUrpJXx3WQ-Oc",
  authDomain: "smart-expense-68849.firebaseapp.com",
  projectId: "smart-expense-68849",
  storageBucket: "smart-expense-68849.firebasestorage.app",
  messagingSenderId: "694904474046",
  appId: "1:694904474046:web:62eac9e2be243fc37391ef",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); 
