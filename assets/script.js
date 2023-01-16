const apiKey = "049980ce88447ba2a5760c6844c0482d";
const weatherApiUrl = "api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={API key}";
// want to use both APIs, as the city one gives the lat and long for the weather one
const searchBtn = document.querySelector("#searchBtn");

// global variables
// divs

// functions
function init() {
  // grab last search results from local storage and put them on page
  // use code from challenge 4 or 5
}

function citySearch() {
  fetch(weatherApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

// calls + event listeners
init();

// search button event listener
searchBtn.addEventListener("click", citySearch);
// past search event listener
