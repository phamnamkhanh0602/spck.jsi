const API_KEY = "5634849698f284eba828945eec5edfee";

const btnSearch = document.getElementById("btnSearch");

if(btnSearch){
btnSearch.onclick = searchWeather;
}

async function searchWeather(){

const city = document.getElementById("cityInput").value.trim();

if(!city){
alert("Enter city name");
return;
}

try{

const res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);

const data = await res.json();

if(data.cod != 200){
alert("City not found");
return;
}

document.getElementById("city").innerText = data.name;

document.getElementById("temp").innerText =
Math.round(data.main.temp) + "°C";

document.getElementById("desc").innerText =
data.weather[0].description;

document.getElementById("humidity").innerText =
"Humidity: " + data.main.humidity + "%";

document.getElementById("wind").innerText =
"Wind: " + data.wind.speed + " m/s";

document.getElementById("icon").src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

}catch(err){

alert("Error loading weather");

}

}