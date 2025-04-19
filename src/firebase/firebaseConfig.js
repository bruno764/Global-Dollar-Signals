import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "global-dollar-signals.firebaseapp.com",
  projectId: "global-dollar-signals",
  storageBucket: "global-dollar-signals.appspot.com",
  messagingSenderId: "905350980131",
  appId: "1:905350980131:web:1b7f45172347260e524796"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
