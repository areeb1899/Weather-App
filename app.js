const cityName = document.querySelector(".location")
const searchBar = document.getElementById('searchBar')
const searchBtn = document.getElementById('search-btn')
const additionalDetailsBtn = document.getElementById('moreDetails')
const moreLessText = document.querySelector('.more-less');


async function checkWeather(city) {
  let apiKey = "4aeb1e265437d3c29803abcb71f12b67"; //openweathermap api key
  let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric` //openweathermap url
  try {
    let response = await fetch(api_url)
    //if response shows 200 ok report else throw error
    if (response.ok) {

      let data = await response.json();
      showDetails(data);
      additionalDetails(data);
      showDate();
      searchBar.innerHTML = "";
      console.log(data)

    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.log("There was a problem while fetching the data", error);
  }
}


//displaying the details of data from the API using data as the parameter.
function showDetails(data) {
  let showIcon = data.weather[0].icon
  cityName.textContent = `${data.name}`;
  temperature.textContent = `${Math.floor(data.main.temp)}° C`
  icon.src = `https://openweathermap.org/img/wn/${showIcon}.png` //small icon besides weather condition
  weatherCondition.textContent = `${data.weather[0].description}`
  humidity.textContent = `Humidity: ${data.main.humidity}%`
  windSpeed.textContent = `Wind Speed: ${data.wind.speed}km/h`
  feelsLike.textContent = `Feels Like: ${data.main.feels_like}° C`
  searchBar.value = ""; //clear search input after typing

}

//additional details
function additionalDetails(data) {
  pressure.textContent = `Pressure: ${data.main.pressure} hPa`
  maxTemp.textContent = `Max Temp: ${data.main.temp_max}° C`
  minTemp.textContent = `Min Temp: ${data.main.temp_min}° C`
  country.textContent = `Country: ${data.sys.country}`
  visibility.textContent = `Visibility: ${data.visibility} m`
  clouds.textContent = `Clouds: ${data.clouds.all}`
}

//event listener on the search icon
searchBtn.addEventListener("click", () => {

  checkWeather(searchBar.value)


})


//Functionality using enter key.
searchBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBar.value)

  }
})

//show more details on clicking the "Click here to see more details"
additionalDetailsBtn.addEventListener("click", (data) => {
  document.querySelector('.icon').classList.toggle('active')
  document.querySelector('.second-container').classList.toggle('active');
  moreLessText.textContent = moreLessText.textContent === "See less details" ? "See more details" : "See less details";

})

//show date, month and year
function showDate() {
  let currentTime = new Date()

  let month = currentTime.getMonth() + 1

  let day = currentTime.getDate()

  let year = currentTime.getFullYear()

  time.textContent = `${day}-${month}-${year}`
}


checkWeather("delhi"); //By default weather before entering the new city name
