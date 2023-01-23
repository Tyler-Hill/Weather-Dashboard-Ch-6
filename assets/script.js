const apiKey = "049980ce88447ba2a5760c6844c0482d";
// global variables
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Chicago&units=imperial&appid=049980ce88447ba2a5760c6844c0482d";
// const sixteenDayApi = "api.openweathermap.org/data/2.5/forecast/daily?q=Chicago&cnt=6&appid=049980ce88447ba2a5760c6844c0482d";
const weatherApiImages = "https://openweathermap.org/img/wn/01d@2x.png";
// make it look like this https://openweathermap.org/img/wn/${data.list[0].weather.icon}@2x.png
// divs
const searchBtn = document.querySelector("#searchBtn");
const pastSearches = document.querySelector("#pastSearches");
const city_Div = document.querySelector("#city-Div");
const city_Name = document.querySelector("#city-Name");
const city_Date = document.querySelector("#city-Date");
const city_Weather = document.querySelector("#city-Weather");
const city_Temp = document.querySelector("#city-Temp");
const city_Wind = document.querySelector("#city-Wind");
const city_Humidity = document.querySelector("#city-Humidity");
const city_Cards = document.querySelector("#city-Cards");
const cityArray = [];
// date
let d = new Date();
let localTime = d.getTime();
let localOffset = d.getTimezoneOffset() * 60000;
let utc = localTime + localOffset;
let atlanta = utc + 1000 * -14400;
let nd = new Date(atlanta);

// functions
function init() {
  // grab last search results from local storage and put them on page
  // use code from challenge 4 or 5
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  cityArray.push(city);
  localStorage.setItem("Searched Cities", cityArray);
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
      let index = 1;
      for (const element of data.list) {
        let dateText = element.dt_txt.split(" ")[1];
        // console.log(dateText);
        let weatherCardImg = element.weather[0].icon;
        if (dateText === "00:00:00") {
          let cardDiv = document.createElement("div");
          cardDiv.setAttribute("class", `cardDiv${index} border-4 p-3 px-9 mx-auto inline`);
          city_Cards.appendChild(cardDiv);
          let firstCardDiv = document.querySelector(`.cardDiv${index}`);
          let futureDate = document.createElement("h2");
          futureDate.innerHTML = `${element.dt_txt.split(" ")[0]}`;
          futureDate.setAttribute("class", "text-base");
          firstCardDiv.appendChild(futureDate);
          let futureWeather = document.createElement("img");
          futureWeather.setAttribute("src", `https://openweathermap.org/img/wn/${weatherCardImg}@2x.png`);
          futureWeather.setAttribute("class", "inline");
          firstCardDiv.appendChild(futureWeather);
          let twhDiv = document.createElement("div");
          twhDiv.setAttribute("class", `twhDiv${index} grid gap-4 grid-cols-1 grid-rows-3 m-2`);
          firstCardDiv.appendChild(twhDiv);
          let secondCardDiv = document.querySelector(`.twhDiv${index}`);
          let futureTemp = document.createElement("h3");
          futureTemp.innerHTML = `Temperature: ${element.main.temp}°F`;
          futureTemp.setAttribute("class", "text-base");
          secondCardDiv.appendChild(futureTemp);
          let futureWind = document.createElement("h3");
          futureWind.innerHTML = `Wind Speed: ${element.wind.speed} MPH`;
          futureWind.setAttribute("class", "text-base");
          secondCardDiv.appendChild(futureWind);
          let futureHumidity = document.createElement("h3");
          futureHumidity.innerHTML = `Humidity: ${element.main.humidity}%`;
          futureHumidity.setAttribute("class", "text-base");
          secondCardDiv.appendChild(futureHumidity);
          console.log("this didnt work");
          index++;
          console.log(index);
        }
      }
    });
}

// calls + event listeners
init();

// search button event listener
searchBtn.addEventListener("click", citySearch);
// past search event listener

// 86400 seconds in 24 hours
