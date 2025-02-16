import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pic-achu.firebaseapp.com",
  projectId: "pic-achu",
  storageBucket: "pic-achu.firebasestorage.app",
  messagingSenderId: "466718486013",
  appId: "1:466718486013:web:aff9b3d20b05b9d53a7d94"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };