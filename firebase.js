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

const firebaseConfig = {
  apiKey: "AIzaSyBNfllayo9sZxFz3EO4qvocJ8lpf9zmRgQ",
  authDomain: "spck-jsi-7b8b6.firebaseapp.com",
  projectId: "spck-jsi-7b8b6",
  storageBucket: "spck-jsi-7b8b6.firebasestorage.app",
  messagingSenderId: "334249999759",
  appId: "1:334249999759:web:3aa0819f2d279c5eb41ffa",
  measurementId: "G-HFQSDJYFGD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// AUTH FUNCTIONS
window.registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

window.loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

window.logoutUser = () =>
    signOut(auth);

window.listenAuthState = (callback) =>
    onAuthStateChanged(auth, callback);

// NOTES
window.saveNoteToFirebase = async (text, uid) => {
    await addDoc(collection(db, "notes"), {
        text,
        uid,
        createdAt: new Date()
    });
};

window.loadUserNotes = (uid, callback) => {
    const q = query(collection(db, "notes"), where("uid", "==", uid));
    onSnapshot(q, (snapshot) => {
        const notes = [];
        snapshot.forEach(doc => notes.push(doc.data()));
        callback(notes);
    });
};