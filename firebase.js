import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBNfllayo9sZxFz3EO4qvocJ8lpf9zmRgQ",
  authDomain: "spck-jsi-7b8b6.firebaseapp.com",
  projectId: "spck-jsi-7b8b6",
  storageBucket: "spck-jsi-7b8b6.appspot.com",
  messagingSenderId: "334249999759",
  appId: "1:334249999759:web:3aa0819f2d279c5eb41ffa",
  measurementId: "G-HFQSDJYFGD"
};


// INITIALIZE
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// ============================
// AUTH FUNCTIONS
// ============================

export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};

export const listenAuthState = (callback) => {
  onAuthStateChanged(auth, callback);
};


// ============================
// NOTES FUNCTIONS
// ============================

export const saveNoteToFirebase = async (text, uid) => {
  try {
    await addDoc(collection(db, "notes"), {
      text: text,
      uid: uid,
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Save note error:", error);
  }
};

export const loadUserNotes = (uid, callback) => {

  const q = query(
    collection(db, "notes"),
    where("uid", "==", uid)
  );

  onSnapshot(q, (snapshot) => {

    const notes = [];

    snapshot.forEach(doc => {
      notes.push(doc.data());
    });

    callback(notes);

  });

};