//Days Arrays
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursdays",
  "Friday",
  "Saturday",
];

//Current time
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

//Daynightcycle bg
date.innerHTML = days[today] + ", " + hour + ":" + time;

function change_background(hour) {
  if (hour >= 6 && hour < 12) {
    document.body.className = "day";
  } else if (hour >= 12 && hour < 18) {
    document.body.className = " noon";
  } else if (hour >= 18 && hour <= 24) {
    document.body.className = "evening";
  } else if (hour >= 0 && hour < 6) {
    document.body.className = "night";
  }
}

change_background(hour);

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

//Search City
function logMainTemp(response) {
  let temp = document.querySelector("#mainTemp");
  let mainTemp = Math.round(response.data.main.temp);
  temp.innerHTML = mainTemp;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let selectedCity = document.querySelector("#selected-city");
  selectedCity.innerHTML = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=9a3b65ea12488fdd227f03eda47a0bf6&units=metric`;
  axios.get(apiUrl).then(logMainTemp);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

//Current City Button
function showTemp(response) {
  let mainTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#mainTemp");
  temp.innerHTML = mainTemp;
  let selectedCity = document.querySelector("#selected-city");
  selectedCity.innerHTML = response.data.name;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9a3b65ea12488fdd227f03eda47a0bf6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

//Change celcius and farenheit
function showCelcius(event) {
  event.preventDefault();
  //let temp = document.querySelector("#temperature");
  //let org = temp.innerHTML;
  //temp.innerHTML = Math.round(((org-32)*5)/9);
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);

function showFaren(event) {
  event.preventDefault();
  //let temp = document.querySelector("#temperature");
  //temp.innerHTML = "66";
}
let faren = document.querySelector("#farenheit");
faren.addEventListener("click", showFaren);
