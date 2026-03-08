import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

/* LOGIN */

const btnLogin = document.getElementById("btnLogin");

if(btnLogin){

btnLogin.onclick = async () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

await signInWithEmailAndPassword(auth,email,password);
window.location = "dashboard.html";

}catch(err){
alert(err.message);
}

};

}

/* REGISTER */

const btnRegister = document.getElementById("btnRegister");

if(btnRegister){

btnRegister.onclick = async () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

await createUserWithEmailAndPassword(auth,email,password);

alert("Register success");

window.location="login.html";

}catch(err){
alert(err.message);
}

};

}

/* LOGOUT */

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick = async ()=>{

await signOut(auth);

window.location="login.html";

}

}