// declaring variables 

const weatherContainer = document.getElementById('weather-container')
const tableBody = document.getElementById('repo-table');
const fetchBtn = document.getElementById('fetch-btn');
const apiKey = '8cdd7775eb0718887c45fd5129681ea1';
const search = document.getElementById('city');


function getApi(searchCity){
console.log(searchCity);
// url to openweathermap resource
const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}`;


// fetching a response of data 
fetch(requestUrl)
.then(function (response) {
return response.json();
})
.then(function (data) {
console.log(data);
getWeatherApi(data[0])
}
)};


// EXAMPLE OF Storing data:
  // const myObj = { name: "John", age: 31, city: "New York" };
  // const myJSON = JSON.stringify(myObj);
  // localStorage.setItem("testJSON", myJSON);
  // console.log(localStorage);

// EXAMPLE OF Retrieving data:
  // let text = localStorage.getItem("testJSON");
  // let obj = JSON.parse(text);
  // document.getElementById("demo").innerHTML = obj.name;


function getWeatherApi(location){
console.log(location);
let {lat, lon} = location;
let city = location.name;
const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// Initiating a fetch request to the URL specified in requestURL
fetch(requestUrl) 
.then(function (response) {
return response.json(); 

// A promise callback that handles the response from the fetch request. 
// It takes the response object and calls the json() method on it to parse the response body as JSON. 
// This returns another Promise that resolves to the parsed JSON data.
})
.then(function (data) {
console.log(data);
currentDay(data.list[0], city)
// This is another Promise callback that handles the parsed JSON data from the previous step. 
// It logs the data to the console using console.log(data) and then calls the currentDay() function
// with the first item in the list property of the data object and the city variable as arguments.
})
.catch(function(error) {
}
)};

function getCity (e){
if (!search.value) {
return;
}
e.preventDefault();
const searchCity = search.value.trim();
if (searchCity) {
  getApi(searchCity);
search.value = ''; // Clear the input field
} else {
  alert('Please enter a city name');
} return;
};

// functions aren't variables so you don't need a semi-colon

fetchBtn.addEventListener('click', getCity);    

// Retrieve weather data from local storage
const weatherData = JSON.parse(localStorage.getItem('weatherData'));

// Extract relevant information from the data
const city = weatherData.getCity;
const temperature = weatherData.temperature;
const description = weatherData.description;

// Create HTML elements to display the weather information
const sideContainer = document.getElementById('side-container');
const cityElement = document.createElement('h2');
cityElement.textContent = `City: ${getCity}`;
const tempElement = document.createElement('p');
tempElement.textContent = `Temperature: ${temperature}°C`;
const descElement = document.createElement('p');
descElement.textContent = `Description: ${description}`;

// Append the elements to the container
weatherContainer.appendChild(CityElement);
weatherContainer.appendChild(tempElement);
weatherContainer.appendChild(descElement);
   