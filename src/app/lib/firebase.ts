// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyhIA50TKKELJGCt5h6AOUGwtu47MJfik",
  authDomain: "mtps-3e681.firebaseapp.com",
  projectId: "mtps-3e681",
  storageBucket: "mtps-3e681.firebasestorage.app",
  messagingSenderId: "407884466948",
  appId: "1:407884466948:web:2df9386bfdde76eb991e51",
  measurementId: "G-P2HEC1NY7S",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const storage = getStorage(app);
