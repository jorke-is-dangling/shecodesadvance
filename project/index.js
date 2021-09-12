//-------------Daynight Cycle Bg Change-------------
function changeBackground(hour) {
  if (hour >= 6 && hour < 12) {
    document.body.setAttribute("class", "morning");
  } else if (hour >= 12 && hour < 18) {
    document.body.setAttribute("class", "noon");
  } else if (hour >= 18 && hour <= 24) {
    document.body.setAttribute("class", "evening");
  } else if (hour >= 0 && hour < 6) {
    document.body.setAttribute("class", "night");
  }
}

//-------------Forecast cards-------------
function forecast(today, days) {
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
}

//-------------Change Time-------------
function dateFunc(currentDate) {
  let date = new Date(currentDate * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  forecast(day, days);
  changeBackground(hours);

  return `Last Updated: ${days[day]} ${hours}:${minutes}`;
}

//-------------Change Weather Data-------------
function logWeatherData(response) {
  //function for displaying weather data
  let selectedCity = document.querySelector("#selected-city");
  selectedCity.innerHTML = response.data.name;

  let tempEl = document.querySelector("#mainTemp");
  celciusTemp = response.data.main.temp;
  tempEl.innerHTML = Math.round(celciusTemp);

  let descEl = document.querySelector("#description");
  descEl.innerHTML = response.data.weather[0].main;

  let iconEl = document.querySelector("#icon");
  let link = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  iconEl.setAttribute("src", link);
  console.log(link);
  iconEl.setAttribute("alt", response.data.weather[0].main);

  let humEl = document.querySelector("#hum");
  humEl.innerHTML = `Humidity: ${response.data.main.humidity}`;

  let windEl = document.querySelector("#wind");
  windEl.innerHTML = `Wind: ${response.data.wind.speed}`;

  let dateEl = document.querySelector("#date");
  dateEl.innerHTML = dateFunc(response.data.dt);
}

//-------------Change Temp Unit-------------
let celciusTemp = null;

function displayFaren(event) {
  event.preventDefault();
  let farenTemp = (celciusTemp * 9) / 5 + 32;
  let farenEl = document.querySelector("#mainTemp");
  farenEl.innerHTML = Math.round(farenTemp);

  celLink.classList.remove("selected-temp");
  farenLink.setAttribute("class", "selected-temp");
}

let farenLink = document.querySelector("#farenheit");
farenLink.addEventListener("click", displayFaren);

function displayCelcius(event) {
  event.preventDefault();
  let celEl = document.querySelector("#mainTemp");
  celEl.innerHTML = Math.round(celciusTemp);

  farenLink.classList.remove("selected-temp");
  celLink.setAttribute("class", "selected-temp");
}

let celLink = document.querySelector("#celcius");
celLink.addEventListener("click", displayCelcius);

//-------------Search City-------------
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9a3b65ea12488fdd227f03eda47a0bf6&units=metric`;
  axios.get(apiUrl).then(logWeatherData);
}
search("Jakarta");

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
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
