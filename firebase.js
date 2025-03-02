import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration - replace with your own values
const firebaseConfig = {
  apiKey: "AIzaSyBKEkplw4w40nnvDg936DMT1y7-T9uSvmU",
  authDomain: "hacknova-cfe36.firebaseapp.com",
  projectId: "hacknova-cfe36",
  storageBucket: "hacknova-cfe36.firebasestorage.app",
  messagingSenderId: "463911788753",
  appId: "1:463911788753:web:e86183ea3b3430452f25f0",
  measurementId: "G-C2R0C0CHBV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
