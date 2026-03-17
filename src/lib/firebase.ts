import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApdleEbtBMMnZb9X8r82zslP9ECJ_cwyQ",
  authDomain: "bbu-inquiry.firebaseapp.com",
  projectId: "bbu-inquiry",
  storageBucket: "bbu-inquiry.firebasestorage.app",
  messagingSenderId: "992781903958",
  appId: "1:992781903958:web:290a21976829a8028033f7",
  measurementId: "G-TM5CQ1NCHB",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

