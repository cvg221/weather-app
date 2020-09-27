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

    url = `http://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}&units=${unit}`;
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

  function updateForecast(){
      alert("hello");
  }
  

  let searchCity = document.querySelector("#search-btn");
  searchCity.addEventListener("click", goToWeatherAPI);

  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = geolocation();
  
  let lastUpdate = document.querySelector("#current-date");
  lastUpdate.innerHTML = currentDateFormat();
  