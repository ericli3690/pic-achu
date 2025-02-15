import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pic-achu.firebaseapp.com",
  projectId: "pic-achu",
  storageBucket: "pic-achu.firebasestorage.app",
  messagingSenderId: "466718486013",
  appId: "1:466718486013:web:aff9b3d20b05b9d53a7d94"
};

export const app = initializeApp(firebaseConfig);

export async function getCardsFromGroup(groupString) {
  const db = getFirestore(app);
  const docRef = doc(db, 'allGroups', groupString);
  const docSnap = await getDoc(docRef);
  return docSnap.data()['cards'];
}