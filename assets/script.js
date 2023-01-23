const apiKey = "049980ce88447ba2a5760c6844c0482d";
// global variables
// divs
const searchBtn = document.querySelector("#searchBtn");
const city_Div = document.querySelector("#city-Div");
const city_Name = document.querySelector("#city-Name");
const city_Date = document.querySelector("#city-Date");
const city_Weather = document.querySelector("#city-Weather");
const city_Temp = document.querySelector("#city-Temp");
const city_Wind = document.querySelector("#city-Wind");
const city_Humidity = document.querySelector("#city-Humidity");
const city_Cards = document.querySelector("#city-Cards");
const searchBar = document.querySelector("#cityInput");
const searchHistory = document.querySelector("#searchHistory");
let a = 0;
let cityArray = [];
let city = "";
// date
// let d = new Date();
// let localTime = d.getTime();
// let localOffset = d.getTimezoneOffset() * 60000;
// let utc = localTime + localOffset;
// let atlanta = utc + 1000 * -14400;
// let nd = new Date(atlanta);

// functions
// Init function
function init() {
  let initCities = JSON.parse(localStorage.getItem("cityArray"));
  if (initCities !== null) {
    cityArray = initCities;
  }
  // appending searches to past search section
  let newCityArray = cityArray.filter((item, index) => cityArray.indexOf(item) === index);
  newCityArray.forEach((city) => {
    let searchList = document.createElement("li");
    searchList.setAttribute("class", "border-double border-2 rounded-lg m-2 p-2 pl-4 shadow-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-violet-300");
    searchList.innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
    searchHistory.appendChild(searchList);
  });
  city = "Chicago";
  citySearch();
  // grab last search results from local storage and put them on page
}

// Look for new city
function newSearch(event) {
  event.preventDefault();
  city = searchBar.value;
  citySearch();
}

function searchAppend() {
  let no = 0;
  cityArray.forEach((element) => {
    if (element == city) {
      no++;
    }
  });
  if (no === 1) {
    let searchList = document.createElement("li");
    searchList.setAttribute("class", "border-double border-2 rounded-lg m-2 p-2 pl-4 shadow-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-violet-300");
    searchList.innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
    searchHistory.insertBefore(searchList, searchHistory.firstChild);
    no++;
  }
}

function historySearch(event) {
  let oldSearch = event.target.innerHTML;
  let element = event.target;
  if (element.matches("li")) {
    city = oldSearch;
    citySearch();
  }
}

// Main fetch Function
function citySearch() {
  tryAgain.innerHTML = "";
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=049980ce88447ba2a5760c6844c0482d`;
  fetch(weatherApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.cod === "404") {
        let tryAgain = document.createElement("h4");
        tryAgain.innerHTML = "Unable to find city, please try another location";
        tryAgain.setAttribute("class", "font-bold txt-large text-slate-200 p-4");
        let tryAgainDiv = document.querySelector("#tryAgain");
        tryAgainDiv.appendChild(tryAgain);
        return;
      }
      city_Name.innerHTML = data.city.name;
      let weatherImg = data.list[0].weather[0].icon;
      city_Weather.setAttribute("src", `https://openweathermap.org/img/wn/${weatherImg}@2x.png`);
      city_Temp.innerHTML = `Temperature: ${data.list[0].main.temp}°F`;
      city_Wind.innerHTML = `Wind Speed: ${data.list[0].wind.speed} MPH`;
      city_Humidity.innerHTML = `Humidity: ${data.list[0].main.humidity}%`;
      city_Cards.innerHTML = "";
      let index = 1;
      for (const element of data.list) {
        let dateText = element.dt_txt.split(" ")[1];
        let weatherCardImg = element.weather[0].icon;
        if (dateText === "00:00:00") {
          // element creation
          let cardDiv = document.createElement("div");
          let futureDate = document.createElement("h2");
          let futureWeather = document.createElement("img");
          let twhDiv = document.createElement("div");
          let futureTemp = document.createElement("h3");
          let futureWind = document.createElement("h3");
          let futureHumidity = document.createElement("h3");
          //Setting attributes & appending
          cardDiv.setAttribute("class", `cardDiv${index} border-double border-4 rounded-lg p-3 px-9 mx-auto inline shadow-lg shadow-slate-500/40 bg-blue-300 text-slate-800`);
          city_Cards.appendChild(cardDiv);
          let firstCardDiv = document.querySelector(`.cardDiv${index}`);
          futureDate.innerHTML = `${element.dt_txt.split(" ")[0]}`;
          futureDate.setAttribute("class", "text-base font-bold underline underline-offset-4");
          firstCardDiv.appendChild(futureDate);
          futureWeather.setAttribute("src", `https://openweathermap.org/img/wn/${weatherCardImg}@2x.png`);
          futureWeather.setAttribute("class", "inline");
          firstCardDiv.appendChild(futureWeather);
          //Setting temp, wind, & humidity
          twhDiv.setAttribute("class", `twhDiv${index} grid gap-4 grid-cols-1 grid-rows-3 m-2`);
          firstCardDiv.appendChild(twhDiv);
          let secondCardDiv = document.querySelector(`.twhDiv${index}`);
          futureTemp.innerHTML = `Temperature: ${element.main.temp}°F`;
          futureWind.innerHTML = `Wind Speed: ${element.wind.speed} MPH`;
          futureHumidity.innerHTML = `Humidity: ${element.main.humidity}%`;
          futureTemp.setAttribute("class", "text-base");
          futureWind.setAttribute("class", "text-base");
          futureHumidity.setAttribute("class", "text-base");
          secondCardDiv.appendChild(futureTemp);
          secondCardDiv.appendChild(futureWind);
          secondCardDiv.appendChild(futureHumidity);
          index++;
        }
      }
      cityArray.unshift(city);
      localStorage.setItem("cityArray", JSON.stringify(cityArray));
      searchBar.value = "";
      searchAppend();
    });
}

// calls + event listeners
init();

// search button event listener
searchBtn.addEventListener("click", newSearch);
// past search event listener
searchHistory.addEventListener("click", historySearch);
