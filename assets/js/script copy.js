// function getWeatherApi(location){
//   console.log(location);
//   let {lat, lon} = location;
//   let city = location.name;
//   const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  

const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");


const apiKey = "8cdd7775eb0718887c45fd5129681ea1";
const createWeatherCard = (cityName, weatherItem, index) => { 
  if(index === 0) { // HTML for the main weather card
     return ` <div class="details">
          <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
          <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
          <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
          <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </div>
        <div class="icon">
          <img src="https://openweathermap.org/img/wn${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
          <h4>${weatherItem.weather[0].description}</h4>
   </div>`;
  } else { // HTML for the 5 day weather forecast cards
    return `
    <li class="card">
      <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
      <img src="https://openweathermap.org/img/wn${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
      <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
      <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
      <h4>Humidity: ${weatherItem.main.humidity}%</h4>
    </li>`;
  }


}

const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
    // Filter the forecasts to get only one forecast per day
    const uniqueForecastDays = [];
    const fiveDaysForecast = data.list.filter(forecast => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if(!uniqueForecastDays.includes(forecastDate)) {
        return uniqueForecastDays.push(forecastDate);
      }
    });

    // clears the previous weather data
    cityInput.value = "";
    currentWeatherDiv.innerHTML = "";
    weatherCardsDiv.innerHTML = "";


// creating weather cards and adding them to the DOM
fiveDaysForecast.forEach((weatherItem, index) => {
  if(index === 0){
    currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));

  } else{
    weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));

  }
});
  }).catch (() => {
    alert("An error occured while fetching the weather forecast");
  });
}


const getCityCoordinates = () => {
  const cityName = cityInput.value.trim(); // get user to enter city name and remove extra spaces
  if(!cityName) return; //returns if cityName is empty
const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

//Get entered city coordinates (latitude, longitude, and name) from the API response
fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
if(!data.length) return alert (`No coordinates found for ${cityName}`);  
const { name, lat, lon } = data [0];
getWeatherDetails(name, lat, lon);
}).catch (() => {
  alert("An error occured while fetching coordinates");
});
}

searchButton.addEventListener("click", getCityCoordinates);