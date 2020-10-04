function currentDateFormat() {
    let now = new Date();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[now.getDay()];
    let hours = now.getHours();
    let minutes = ("0" + now.getMinutes()).slice(-2);
    return `${day} ${hours}:${minutes}`;
}

function geolocation() {
  navigator.geolocation.getCurrentPosition(goToGeolocationAPI);
}
  
function goToGeolocationAPI(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "28db25b5b965562e80729db18525a71f";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lat=${lat}&lon=${lon}&units=${unit}`;
  
  axios.get(url).then(updateCityAndTemperature);
}

function goToWeatherAPI(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-input").value;
  let apiKey = "28db25b5b965562e80729db18525a71f";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${unit}`;
  
  axios.get(url).then(updateCityAndTemperature);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(updateForecast);
}
  
function updateCityAndTemperature(response) {
  let h2 = document.querySelector("#current-location");
  let tempElement = document.querySelector("#temperature");
  let weatherDescription = document.querySelector("#weather-description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let feelsLike= Math.round(response.data.main.feels_like);
  let humidity=Math.round(response.data.main.humidity);
  let wind=Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;
  
  h2.innerHTML = city;
  tempElement.innerHTML = temperature;
  weatherDescription.innerHTML = description;
  feelsLikeElement.innerHTML = feelsLike;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function formatAPITimeStamp(dttime){
  let timeStamp = dttime;
  let date = new Date(timeStamp * 1000);
  let hours = date.getHours();
  if (hours<10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes<10){
    minutes=`0${minutes}`;
  }
  let formattedTime = `${hours}:${minutes}`
  return formattedTime;
}

function updateForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
  forecast=response.data.list[index];
  forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatAPITimeStamp(forecast.dt)}
      </h3>
      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
      <div class="weather-forecast-temp">
          <span id="max-temp">${Math.round(forecast.main.temp_max)}° </span> |
            ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
          `;
  }
}

function conversionToFarenheit(event){
  event.preventDefault();
  let temperature = document.querySelector("#temperature");

  celsiusElement.classList.remove("active");
  farenheitElement.classList.add("active");

  let farenheitTemperature = (celsiusTemperature * 1.8) + 32;  
  temperature.innerHTML = Math.round(farenheitTemperature);
}

function conversionToCelsius(event){
  event.preventDefault();
  celsiusElement.classList.add("active");
  farenheitElement.classList.remove("active");

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.innerHTML = geolocation();

let lastUpdate = document.querySelector("#current-date");
lastUpdate.innerHTML = currentDateFormat();

let searchCity = document.querySelector("#search-btn");
searchCity.addEventListener("click", goToWeatherAPI);

var celsiusTemperature = document.querySelector("#temperature").innerHTML;

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", conversionToCelsius);

let farenheitElement = document.querySelector("#farenheit");
farenheitElement.addEventListener("click", conversionToFarenheit);

