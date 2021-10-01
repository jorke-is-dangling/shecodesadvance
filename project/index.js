//These should be initialized before the entire weather display so all functions can access them
let currentCity = null;
let celciusTemp = null;

//-------------Forecast cards-------------
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastEl = document.querySelector(".right");
  let forecastHTML = ``;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="card cardDay">
        <div class="card-body">
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" width="56 px">
          <h3 id="forecast-day">${
            days[new Date(forecastDay.dt * 1000).getDay()]
          }</h3>
          <h4 id="forecast-max"> ${Math.round(forecastDay.temp.max)}°C </h4>
          <h4 id="forecast-min"> ${Math.round(forecastDay.temp.min)}°C </h4>
        </div>
      </div>`;
    }
  });

  forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=9a3b65ea12488fdd227f03eda47a0bf6&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

  changeBackground(hours);

  return `Last Updated: ${days[day]} ${hours}:${minutes}`;
}

//-------------Main Weather Function-------------
function logWeatherData(response) {
  //Current city
  let selectedCity = document.querySelector("#selected-city");
  currentCity = response.data.name;
  selectedCity.innerHTML = currentCity;

  //Current city's temperature
  let tempEl = document.querySelector("#mainTemp");
  celciusTemp = response.data.main.temp;
  tempEl.innerHTML = Math.round(celciusTemp);

  //Current city's weather
  let descEl = document.querySelector("#description");
  descEl.innerHTML = response.data.weather[0].main;

  //Icon of current city's weather
  let iconEl = document.querySelector("#icon");
  let link = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  iconEl.setAttribute("src", link);
  iconEl.setAttribute("alt", response.data.weather[0].main);

  //Current city's humidity
  let humEl = document.querySelector("#hum");
  humEl.innerHTML = `Humidity: ${response.data.main.humidity}`;

  //Current city's wind
  let windEl = document.querySelector("#wind");
  windEl.innerHTML = `Wind: ${response.data.wind.speed}`;

  //Current city's date
  let dateEl = document.querySelector("#date");
  dateEl.innerHTML = dateFunc(response.data.dt);

  //Current city's forecast
  getForecast(response.data.coord);
}

//-------------Search City-------------
currentCity = "Jakarta";
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9a3b65ea12488fdd227f03eda47a0bf6&units=metric`;
  axios.get(apiUrl).then(logWeatherData);
}
search(currentCity);

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  currentCity = input.value;
  search(currentCity);
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
