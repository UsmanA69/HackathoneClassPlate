import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  onChildAdded,
  child,
  ref,
  push,
  update,
  set,onValue
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDZcw-jwCafRmC-JgFZFD_7ZsO9sQxCprc",
  authDomain: "myauthapp-b7ba5.firebaseapp.com",
  projectId: "myauthapp-b7ba5",
  storageBucket: "myauthapp-b7ba5.appspot.com",
  messagingSenderId: "113624639026",
  appId: "1:113624639026:web:ad5666ede78106e1cabe2b",
  measurementId: "G-QTRKPPHP6B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  database,
  onChildAdded,
  child,
  ref,
  push,
  update,
  set,onValue
};
