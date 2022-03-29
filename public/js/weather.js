let cityLat = document.getElementById("lat").textContent;
let cityLong = document.getElementById("long").textContent;

let weather = {
  apiKey: "4be3e62ff06896e29bf327c160b23e92",

  fetchWeather: function (cityLat, cityLong) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        cityLat +
        "&lon=" +
        cityLong +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.log(error);
      });
  },

  displayWeather: function (data) {
    console.log(data);
    const { name } = data;
    let { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").textContent =
      "Weather in " + name + " (Circuit Located City)";
    document.querySelector(".temp").textContent = Math.floor(temp) + "°C";
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").textContent = description;
    document.querySelector(".humidity").textContent =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").textContent =
      "Wind Speed: " + speed + "km/h";
    document.querySelector(".feels-like").textContent =
      "Feels Like: " + feels_like + "°C";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
  },
};

weather.fetchWeather(cityLat, cityLong);
