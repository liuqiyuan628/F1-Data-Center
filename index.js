//import required modules
const express = require("express");
const path = require("path");
const axios = require("axios");
const qs = require("querystring");
const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
dotenv.config();

//set up express object
const app = express();
const port = process.env.PORT || "8886";

// set up paths to important folders and files

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/public", express.static(path.join(__dirname, "public")));

// list all schedules for 2022 f1 races

app.get("/", (req, res) => {
  f1Data(res);
  // rid = f1PageData.races.MRData.total;
});

// show more data for one grand prix
app.get("/race/:rid", (req, res) => {
  var rid = req.params.rid;
  pageDataAll(res, rid);
  // weatherData(res);
});

// show the weather information for a selected race
app.get("/weather", (req, res) => {
  weatherData(res);
});

//set up server listening
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

//f1 LIST data
function f1Data(res) {
  let f1PageData = {
    title: "Home",
    races: null,
  };
  axios({
    method: "get",
    url: "http://ergast.com/api/f1/current" + ".json",
    headers: {},
  })
    .then(function (response) {
      // console.log(response.data);
      f1PageData.races = response.data; //store JSON results in f1PageData.shows (previously null)
      res.render("index", f1PageData);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// call 2 APIs(F1 data and Weather Data) and sent their data to one page
function pageDataAll(res, rid) {
  //Promise.all Doc: https://github.com/axios/axios#concurrency-deprecated
  Promise.all([
    // F1 Data API call [0]
    axios({
      method: "get",
      url: "http://ergast.com/api/f1/current/" + rid + ".json",
      headers: {},
    }),
    // OpenWeather Data API call [1]
    //!CHANGED THIS FUNCTION IN A STATIC JS FILE. NO LONGER USE THE DATE GET FROM HERE
    axios({
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather",
      headers: {},
      params: {
        lat: "32",
        lon: "45",
        appid: process.env.OpenWeatherApiKey,
        units: "metric",
      },
    }),
  ]).then(function (response) {
    let f1ApiData = response[0].data;
    let weatherApiData = response[1].data;
    res.render("race", {
      title: "race",
      f1GpData: f1ApiData,
      f1WeatherData: weatherApiData,
      // console.log("response[0].data:" + response[0].data);
      // console.log("response[1].data:" + response[1].data);
      // console.log("response[1].data.nama" + response[1].data.name);
    });
  });
}

// /* F1 API Doc:
// https://documenter.getpostman.com/view/11586746/SztEa7bL#4d61845d-aae4-4bed-a97e-1189abe90c7d */
