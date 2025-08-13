import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "re-vents-backend.firebaseapp.com",
  projectId: "re-vents-backend",
  storageBucket: "re-vents-backend.firebasestorage.app",
  messagingSenderId: "768695908806",
  appId: "1:768695908806:web:b0eb4bf1a2976343571ac7",
  measurementId: "G-KJQ88KVK05",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
