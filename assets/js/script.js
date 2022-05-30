let citiesArr = [];


document.getElementById('search-button').addEventListener('click', handleClick);



function handleClick() {
  let city = document.querySelector('input').value;
  if (!city) return;
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  fetch(url).then(data => data.json()).then(data => {
    let { lat, lon } = data[0];

    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    
    fetch(url2).then(data => data.json()).then(data => {
      console.log(data);
      let icon = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`

      let main = data.current.weather[0].main;
      let description = data.current.weather[0].description;
      let temp = Math.round(data.current.temp);
      let humidity = data.current.humidity;
      let windSpeed = Math.round(data.current.wind_speed);
      let uvi = data.current.uvi;
      let name = city;

      document.getElementById('icon').setAttribute('src',icon);
      document.getElementById("cityDescription").innerHTML = description;
      document.getElementById("cityTemp").innerHTML = temp + "°";
      document.getElementById("cityHumididty").innerHTML = humidity + "%";
      document.getElementById("cityWindSpeed").innerHTML = windSpeed + " mph";
      document.getElementById("cityUVI").innerHTML = uvi;
      document.getElementById("cityName").innerHTML = name;
      document.getElementById("currentDate").innerHTML = moment().format("MMM Do YYYY"); 

      // Daily weather data

      for (let i = 0; i < 5; i++) {
        let date =  moment().add(i+1,"days").format("MM/DD/YYYY"); 
        let icon2 = data.daily[i].weather[0].icon;
        let temp = data.daily[i].temp.day;
        let wind = data.daily[i].wind_speed;
        let humidity = data.daily[i].humidity;

        document.getElementById('forecast').innerHTML += 
        `<div class="forecastCard">
              <h5>${date}</h5>
              <img src="http://openweathermap.org/img/w/${icon2}.png">
              <h6>Temp: ${Math.round(temp) + "°"}</h6>
              <h6>Wind: ${Math.round(wind) + " mph"}</h6>
              <h6>Humidity: ${humidity + "%"}</h6>
              </div>`

             
      }
        citiesArr.unshift(city);

        handleCities();

   
    });
    document.querySelector(".hide").style.display = "block";
    
   
  });
}


function handleCities () {
  $("#searchHistory").empty();

  for (let i = 0; i < citiesArr.length; i++) {
    
    let cityBtn = $('<button>');
    cityBtn.addClass("city btn btn-primary");
    cityBtn.attr("city-input", citiesArr[i]);
    cityBtn.text(citiesArr[i]);
    $("#searchHistory").append(cityBtn);
    
  }
}