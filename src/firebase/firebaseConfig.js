// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTmae8tR15vKA_19Bzq7oDFLotMm1PAGs",
  authDomain: "global-dollar-signals.firebaseapp.com",
  projectId: "global-dollar-signals",
  storageBucket: "global-dollar-signals.appspot.com",
  messagingSenderId: "905350980131",
  appId: "1:905350980131:web:1b7f45172347260e524796",
  measurementId: "G-CK3HQMBME4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
