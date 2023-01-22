const apiKey = "049980ce88447ba2a5760c6844c0482d";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Chicago&units=imperial&appid=049980ce88447ba2a5760c6844c0482d";
// const sixteenDayApi = "api.openweathermap.org/data/2.5/forecast/daily?q=Chicago&cnt=6&appid=049980ce88447ba2a5760c6844c0482d";
const weatherApiImages = "https://openweathermap.org/img/wn/01d@2x.png";
// make it look like this https://openweathermap.org/img/wn/${data.list[0].weather.icon}@2x.png
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
  let city = document.querySelector("#cityInput").value;
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=049980ce88447ba2a5760c6844c0482d`;
  fetch(weatherApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      city_Name.innerHTML = data.city.name;
      // city_Date.innerHTML =
      let weatherImg = data.list[0].weather[0].icon;
      city_Weather.setAttribute("src", `https://openweathermap.org/img/wn/${weatherImg}@2x.png`);
      city_Temp.innerHTML = `Temperature: ${data.list[0].main.temp}°F`;
      city_Wind.innerHTML = `Wind Speed: ${data.list[0].wind.speed} MPH`;
      city_Humidity.innerHTML = `Humidity: ${data.list[0].main.humidity}%`;

      // City name date weather conditions, temperature, humidity, wind speed
      // data goes in here, make a loop function or summin
    });
}

// calls + event listeners
init();

// search button event listener
searchBtn.addEventListener("click", citySearch);
// past search event listener

// 86400 seconds in 24 hours
