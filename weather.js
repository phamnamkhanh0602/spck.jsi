const API_KEY = "5634849698f284eba828945eec5edfee";

const btnSearch = document.getElementById("btnSearch");

if(btnSearch){
btnSearch.onclick = searchWeather;
}

async function searchWeather(){

const city = document.getElementById("cityInput").value;

const res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);

const data = await res.json();

document.getElementById("city").innerText = data.name;
document.getElementById("temp").innerText = Math.round(data.main.temp)+"°C";
document.getElementById("desc").innerText = data.weather[0].description;
document.getElementById("humidity").innerText = data.main.humidity+"%";
document.getElementById("wind").innerText = data.wind.speed+" m/s";
document.getElementById("icon").src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

getForecast(city);
}

async function getForecast(city){

const res = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
);

const data = await res.json();

const forecastDiv = document.getElementById("forecast");
forecastDiv.innerHTML="";

const daily = data.list.filter(item =>
item.dt_txt.includes("12:00:00")
);

daily.slice(0,5).forEach(day=>{

const d = new Date(day.dt_txt);
const name = d.toLocaleDateString("en-US",{weekday:"short"});
const temp = Math.round(day.main.temp);
const icon = day.weather[0].icon;

forecastDiv.innerHTML += `
<div class="forecast-item">
<p>${name}</p>
<img src="https://openweathermap.org/img/wn/${icon}@2x.png">
<p>${temp}°C</p>
</div>
`;

});
}