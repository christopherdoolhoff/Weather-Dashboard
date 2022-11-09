var APIKey = "ed3d004e5dc879ccfeedd30eab1f4cea";
var baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var cityInput = document.querySelector('#city').value;
var countryInput = document.querySelector('#country').value;
var stateInput = document.querySelector('#state').value;
var cityWeatherEl = document.querySelector('#city-weather');
var repoSearchTerm = document.querySelector('#five-day');


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
    var apiUrl = baseURL + cityInput + ',' + countryInput + '&units=imperial&appid=' + APIKey;
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
    var apiUrl = baseURL + cityInput + ',' + stateInput + ',' + countryInput + '&units=imperial&appid=' + APIKey;
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

var displayRepos = function (repos, searchTerm) {
    if (repos.length === 0) {
      cityWeatherEl.textContent = 'No repositories found.';
      return;
    }
  
    cityWeatherEl.textContent = searchTerm;
  
    for (var i = 0; i < repos.length; i++) {
      var repoName = repos[i].weather + '/' + repos[i].name;
  
      var repoEl = document.createElement('a');
      repoEl.classList = 'list-item flex-row justify-space-between align-center';
      repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);
  
      var titleEl = document.createElement('span');
      titleEl.textContent = repoName;
  
      repoEl.appendChild(titleEl);
  
      var statusEl = document.createElement('span');
      statusEl.classList = 'flex-row align-center';
  
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
  
      repoEl.appendChild(statusEl);
  
      cityWeatherEl.appendChild(repoEl);
    }
  };