var APIKey = "ed3d004e5dc879ccfeedd30eab1f4cea";
var baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var cityInput = document.querySelector('#city').value;
var countryInput = document.querySelector('#country').value;
var stateInput = document.querySelector('#state').value;
var cityWeatherEl = document.querySelector('#city-weather');
var repoSearchTerm = document.querySelector('#five-day');
var today = moment().format("ddd MMM Do, YYYY");

$("#today").text(today);

    console.log(cityInput);
    console.log(countryInput);
    console.log(stateInput);

// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}"

var getCityWeather = function () {
    if(countryInput == 0 && stateInput == 0){
    var apiUrl = baseURL + cityInput + '&units=imperial&appid=' + APIKey;
    console.log(apiUrl); 
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          weatherToday(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
    } else if(stateInput == 0){
    var apiUrl = baseURL + cityInput + ',' + countryInput + '&units=imperial&appid=' + APIKey;
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          weatherToday(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
    } else{
    var apiUrl = baseURL + cityInput + ',' + stateInput + ',' + countryInput + '&units=imperial&appid=' + APIKey;
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          weatherToday(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
    }
  };

//   $("#country").change(console.log(countryInput));
//   $("state").change(console.log(stateInput));
$("#country").change(function(){
    cityInput = document.querySelector('#city').value;
    countryInput = document.querySelector('#country').value;
    stateInput = document.querySelector('#state').value;
    if(document.querySelector("#country").value == "US"){
        document.querySelector("#state").style.display = "block";
    }else{
        document.querySelector('#state').value = 0  
        document.querySelector("#state").style.display = "none";
    }
})
  $("#searchBtn").click(function(){
    cityInput = document.querySelector('#city').value;
    countryInput = document.querySelector('#country').value;
    stateInput = document.querySelector('#state').value;
    console.log(cityInput);
    console.log(countryInput);
    console.log(stateInput);
    getCityWeather();
}
);

var weatherToday = function (data, city){
    console.log(data);
    console.log(city);
    document.querySelector("#city-weather-div").style.display = "block";

    cityWeatherEl.innerHTML = "City: " + data.name + "<br>Temp: " + data.main.temp + "<br>Temp High: " + data.main.temp_max + "<br>Temp Low: " + data.main.temp_min + "<br>Wind Speed: " + data.wind.speed + "<br>Humidity: "+ data.main.humidity + "<br>Description: " + data.weather[0].description + '<br><img src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" alt="weather condition image">'
}
