import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDELdrcdlFv6OAWOzPLEBYFOzcQLcK_SgM",
  authDomain: "sex-campus.firebaseapp.com",
  projectId: "sex-campus",
  storageBucket: "sex-campus.firebasestorage.app",
  messagingSenderId: "1021649767987",
  appId: "1:1021649767987:web:ccc0b366a159d689e8dd46",
  measurementId: "G-ZP8X7YRLKW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
 orderBy,
  serverTimestamp,
  updateDoc
};