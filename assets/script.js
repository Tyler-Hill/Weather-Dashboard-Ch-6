const apiKey = "049980ce88447ba2a5760c6844c0482d";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Chicago&units=imperial&appid=049980ce88447ba2a5760c6844c0482d";
const searchBtn = document.querySelector("#searchBtn");
const pastSearches = document.querySelector("#pastSearches");
const city_Div = document.querySelector("#city-Div");
const city_Name = document.querySelector("#city-Name");
const city_Date = document.querySelector("#city-Date");
const city_Weather = document.querySelector("#city-Weather");
const city_Temp = document.querySelector("#city-Temp");
const city_Wind = document.querySelector("#city-Wind");
const city_Humidity = document.querySelector("#city-Humidity");

// global variables
// divs

// functions
function init() {
  // grab last search results from local storage and put them on page
  // use code from challenge 4 or 5
}

function citySearch(event) {
  event.preventDefault();
  fetch(weatherApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      city_Name.innerHTML = data.city.name;
      city_Weather.innerHTML = data.list.weather.icon;

      // City name date weather conditions, temperature, humidity, wind speed
      // data goes in here, make a loop function or summin
    });
}

// calls + event listeners
init();

// search button event listener
searchBtn.addEventListener("click", citySearch);
// past search event listener
