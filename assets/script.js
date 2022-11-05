var APIKey = "ed3d004e5dc879ccfeedd30eab1f4cea";
var baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var cityInput = $('#city').val();
var countryInput = $('#country').val();
var stateInput = $('#state').val();
console.log(cityInput);
console.log(countryInput);
console.log(stateInput);

// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}"

var getCityWeather = function () {
    if(countryInput == 0 && stateInput == 0){
    var apiUrl = baseURL + cityInput + '&appid=' + APIKey;
    console.log(apiUrl); 
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, state);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
    } else if(stateInput == 0){
    var apiUrl = baseURL + cityInput + ',' + countryInput + '&appid=' + APIKey;
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, state);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
    } else{
    var apiUrl = baseURL + cityInput + ',' + stateInput + ',' + countryInput + '&appid=' + APIKey;
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, state);
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
