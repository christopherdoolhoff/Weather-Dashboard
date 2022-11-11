var APIKey = "ed3d004e5dc879ccfeedd30eab1f4cea";
var baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var baseFiveURL = "https://api.openweathermap.org/data/2.5/forecast?"
var cityInput = document.querySelector('#city').value;
var countryInput = document.querySelector('#country').value;
var stateInput = document.querySelector('#state').value;
var cityWeatherEl = document.querySelector('#city-weather');
var fiveDayEl = document.querySelector('#five-day');
var today = moment().format("ddd MMM Do, YYYY");

$("#today").text(today);

    console.log(cityInput);
    console.log(countryInput);
    console.log(stateInput);

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
          weatherToday(data);
          getFiveDayWeather(data);
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
          weatherToday(data);
          getFiveDayWeather(data);
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
          weatherToday(data);
          getFiveDayWeather(data);
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

  var getFiveDayWeather = function (data) {
    var apiUrl = baseFiveURL + 'lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&cnt=5&units=imperial&appid=' + APIKey;
    console.log(apiUrl); 
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
              console.log(data);
              weatherForecast(data);
            });
          } else {
            alert('Error: ' + response.statusText);
          }
        })
        .catch(function (error) {
          alert('Unable to connect');
        });
    }

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

var weatherToday = function (data){
    console.log(data);
    document.querySelector("#city-weather-div").style.display = "block";

    cityWeatherEl.innerHTML = "City: " + data.name + "<br>Temp: " + data.main.temp + "<br>Temp High: " + data.main.temp_max + "<br>Temp Low: " + data.main.temp_min + "<br>Wind Speed: " + data.wind.speed + "<br>Humidity: "+ data.main.humidity + "<br>Description: " + data.weather[0].description + '<br><img src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" alt="weather condition image">'
}

var weatherForecast = function (data){
    console.log(data);
    document.querySelector("#five-day-div").style.display = "block";
    for(var i = 0; i < data.list.length; i++){
    var date = "<h5>" + moment().add(i+1,'days').format("ddd MMM Do, YYYY") + "</h5>";
    var repoInfo = date + "City: " + data.city.name + "<br>Temp: " + data.list[i].main.temp + "<br>Temp High: " + data.list[i].main.temp_max + "<br>Temp Low: " + data.list[i].main.temp_min + "<br>Wind Speed: " + data.list[i].wind.speed + "<br>Humidity: "+ data.list[i].main.humidity + "<br>Description: " + data.list[i].weather[0].description + '<br><img src="http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png" alt="weather condition image">';
    var repoEl = document.createElement('div');
    repoEl.classList = 'weather-results';
    repoEl.innerHTML = repoInfo;
    fiveDayEl.appendChild(repoEl);
    }
};