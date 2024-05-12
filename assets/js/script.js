const APIKey = "8cdd7775eb0718887c45fd5129681ea1";
const tableBody = document.getElementById('repoTable')
const citySearchBtn = document.getElementById('citySearchBtn')
let city;

// Browser Fetch Method
// fetch returns an api call by calling the fetch() method itself and the method acceots a parameter which happens to be 
// the location of our endpoiint i.e. the url link to weather api
// once the fetch method has finished calling the endpoint, it then calls the 'then' function() and passes a function with a 
// parameter named response.
// the function then returns an JSON object after calliung the response.json() method
// which then also calls another then () function() and passes the parameter named "data" which is 
// based off the "return" of the previous "then()" function
// this is then followed by logging of the "data" object.

function getApi() {
    const requestUrl = 'https://openweathermap.org/forecast5'; //when you have your weather forecast API web link insert HERE
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        //using a `for...of` loop here to write less code than 'for' loops, and we don't need to keep track of the index `(i)`.

        for (const repo of data) {
            //creating the elements of the table, row, data and anchor
            const createTableRow = document.createElement('tr');
            const tableData = document.createElement('td');
            const link = document.createElement('a');

            //setting the text of Link and the href of the link
            link.textContent = repo.html_url;
            link.href = repo.html_url;

            //appending the link to the tabledata and then appending the tabledata to the tablerow 
            // the tablerow then gets appended to the tablebody 
            tableData.appendChild(link);
            createTableRow.appendChild(tableData);
            tableBody.appendChild(createTablerow);
        }
    });
};

fetchSearchBtn.addEventListener('click', getApi);


// DONE: GIVEN a weather dashboard with form inputs

// TO DO: WHEN I search for a city
    // THEN I am presented with current and future conditions for that city and that city is added to the search history

// TO DO: WHEN I view current weather conditions for that city
    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

// TO DO: WHEN I view future weather conditions for that city
    // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// TO DO: WHEN I click on a city in the search history
    // THEN I am again presented with current and future conditions for that city





/* NOTES NOTES NOTES NOTES NOTES NOTES 
class="navBar"
<h1>Weather Dashboard

<main>
<section class="citySearchBtn">
<div>
<h4>Search for a city:</h4>
<form>
<input type="text" id="cityInput" placeholder="Enter your City Here..."><br><br>
<button class="btn btn-danger" type="submit" id="citySearchBtn">Search</button>

<!-- We place the delete button in a different section so that we wont have to keep reloading it each time we generate the history buttons. -->
<div class="btn-group" role="group" aria-label="Search history" id="searchHistory"></div>
<button type="button" class="btn btn-danger col" id="deleteBtn">Delete Search History</button>


<!-- Top Results of Weather forecaset TODAY'S result -->
<section class="topResult">
<div id="currentWeather"></div>

<!-- 2nd section of the 5-day Results -->

<section class="remainingRslts flex-row justify-center align-center col-auto p-4 bg-light">
<div class="text-center pt-4">
<table class="card-body table mx-auto my-4">
<th><p class="my-4">5-Day Forecast:</p>
<tbody id="repo-table" class="mx-auto text-center">
 */
