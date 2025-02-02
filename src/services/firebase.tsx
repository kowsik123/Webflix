import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: "webflix-af06f.firebaseapp.com",
  projectId: "webflix-af06f",
  storageBucket: "webflix-af06f.firebasestorage.app",
  messagingSenderId: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.FIRE_BASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);