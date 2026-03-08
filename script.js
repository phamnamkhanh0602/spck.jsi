import {
registerUser,
loginUser,
logoutUser,
listenAuthState,
saveNoteToFirebase,
loadUserNotes
} from "./firebase.js";


// ELEMENTS
const authSection = document.getElementById("authSection");
const appSection = document.getElementById("appSection");
const userEmail = document.getElementById("userEmail");

const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnLogout = document.getElementById("btnLogout");

const btnSave = document.getElementById("btnSaveNote");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

const cityInput = document.getElementById("cityInput");
const btnSearch = document.getElementById("btnSearch");

const weatherCity = document.getElementById("weatherCity");
const weatherDesc = document.getElementById("weatherDesc");
const weatherTemp = document.getElementById("weatherTemp");
const weatherHumidity = document.getElementById("weatherHumidity");
const weatherWind = document.getElementById("weatherWind");



let currentUser = null;


// =======================
// LOGIN
// =======================

btnLogin.addEventListener("click", async () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
alert("Please enter email and password");
return;
}

try {

await loginUser(email,password);

}catch(err){

alert(err.message);

}

});


// =======================
// REGISTER
// =======================

btnRegister.addEventListener("click", async () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password){
alert("Please enter email and password");
return;
}

try{

await registerUser(email,password);

}catch(err){

alert(err.message);

}

});


// =======================
// LOGOUT
// =======================

btnLogout.addEventListener("click", async () => {

await logoutUser();

});


// =======================
// SAVE NOTE
// =======================

btnSave.addEventListener("click", async () => {

const text = noteInput.value.trim();

if(!text) return;

if(currentUser){

await saveNoteToFirebase(text,currentUser.uid);

noteInput.value = "";

}

});


// =======================
// AUTH STATE
// =======================

listenAuthState((user)=>{

if(user){

currentUser = user;

authSection.style.display="none";
appSection.style.display="block";

userEmail.innerText = user.email;


loadUserNotes(user.uid,(notes)=>{

notesList.innerHTML="";

notes.forEach(note=>{

const div = document.createElement("div");

div.className="note-item";

div.innerText = note.text;

notesList.appendChild(div);

});

});

}else{

currentUser=null;

authSection.style.display="block";
appSection.style.display="none";

}

});


// =======================
// WEATHER API
// =======================

const API_KEY = "5634849698f284eba828945eec5edfee";


btnSearch.addEventListener("click",()=>{

const city = cityInput.value.trim();

if(!city){
alert("Enter city name");
return;
}

getWeather(city);

});


async function getWeather(city){

try{

const res = await fetch(

`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

);

const data = await res.json();

weatherCity.innerText = data.name;
weatherDesc.innerText = data.weather[0].description;
weatherTemp.innerText = "Temperature: " + data.main.temp + "°C";
weatherHumidity.innerText = "Humidity: " + data.main.humidity + "%";
weatherWind.innerText = "Wind: " + data.wind.speed + " m/s";

}catch(err){

alert("City not found");

}

}