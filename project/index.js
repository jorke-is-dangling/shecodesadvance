//-------------Initialize-------------
let days = [
  //Array for storing dates
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursdays",
  "Friday",
  "Saturday",
];
function logWeatherData(response) {
  //function for displaying weather data
  let selectedCity = document.querySelector("#selected-city");
  selectedCity.innerHTML = response.data.name;

  let temp = document.querySelector("#mainTemp");
  let mainTemp = Math.round(response.data.main.temp);
  temp.innerHTML = mainTemp;

  let descEl = document.querySelector("#description");
  let desc = response.data.weather[0].main;
  descEl.innerHTML = desc;

  let iconEl = document.querySelector("#icon");
  let link = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  iconEl.setAttribute("src", link);
  console.log(link);
  iconEl.setAttribute("alt", response.data.weather[0].main);

  let humEl = document.querySelector("#hum");
  humEl.innerHTML = `Humidity: ${response.data.main.humidity}`;

  let windEl = document.querySelector("#wind");
  windEl.innerHTML = `Wind: ${response.data.wind.speed}`;
}

//-------------Current Time-------------
let now = new Date();
let today = now.getDay();
let date = document.querySelector("#date");
let hour = now.getHours();
let minute = now.getMinutes();

let time = minute;
if (minute < 10) {
  time = "0" + minute;
} else {
  time = minute;
}

//-------------DaynightCycle Background-------------
date.innerHTML = days[today] + ", " + hour + ":" + time;

//-------------Search City-------------
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9a3b65ea12488fdd227f03eda47a0bf6&units=metric`;
  axios.get(apiUrl).then(logWeatherData);
}
search("Jakarta");

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let selectedCity = document.querySelector("#selected-city");
  selectedCity.innerHTML = input.value;
  search(input.value);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

//-------------Current City-------------
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9a3b65ea12488fdd227f03eda47a0bf6&units=metric`;
  axios.get(apiUrl).then(logWeatherData);
}

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

//Forecast
let dayTwo = document.querySelector("#day-two");
dayTwo.innerHTML = days[(today + 1) % 7];
let dayThree = document.querySelector("#day-three");
dayThree.innerHTML = days[(today + 2) % 7];
let dayFour = document.querySelector("#day-four");
dayFour.innerHTML = days[(today + 3) % 7];
let dayFive = document.querySelector("#day-five");
dayFive.innerHTML = days[(today + 4) % 7];
let daySix = document.querySelector("#day-six");
daySix.innerHTML = days[(today + 5) % 7];
