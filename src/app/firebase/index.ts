import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJA0bvG4pjXLs4Z-rD1tFjj8OmTaA3gSs",
  authDomain: "delivery-hmo-admin.firebaseapp.com",
  projectId: "delivery-hmo-admin",
  storageBucket: "delivery-hmo-admin.appspot.com",
  messagingSenderId: "1089175913973",
  appId: "1:1089175913973:web:e0d1402c6af537b00b4cbc",
  measurementId: "G-Y6H3PDKRNL"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { db, auth };