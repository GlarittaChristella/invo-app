import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 👉 Step 1: Add this

const firebaseConfig = {
  apiKey: "AIzaSyDn5NaCcRbJwtANeGWOWr5IcLQE-pDLDh8",
  authDomain: "smart-inventory-manageme-533d7.firebaseapp.com",
  projectId: "smart-inventory-manageme-533d7",
  storageBucket: "smart-inventory-manageme-533d7.appspot.com",
  messagingSenderId: "482910771151",
  appId: "1:482910771151:web:b7d7cb337870d4e62264ba",
  measurementId: "G-4X4BQMWTS7"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Analytics – Only if supported
let analytics = null;

if (typeof window !== 'undefined') {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

// 👉 Step 2: Initialize Firestore
const db = getFirestore(app);

// 👉 Step 3: Export everything
export { app, analytics, db };
