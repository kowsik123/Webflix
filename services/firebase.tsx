// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: "webflix-af06f.firebaseapp.com",
  projectId: "webflix-af06f",
  storageBucket: "webflix-af06f.firebasestorage.app",
  messagingSenderId: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.FIRE_BASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);