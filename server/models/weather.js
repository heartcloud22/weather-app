const request = require("request-promise");

const API_KEY = "20e4d2417210e38d065a0c020b9b47be";

class Weather {
  static retrieveByCity(city, callback) {
    request({
      uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
      json: true
    })
      .then(res => {
        callback(res);
      })
      .catch(err => {
        console.log(err);
        callback({ error: "Couldn't reach OpenWeatherMap API." });
      });
  }
}

module.exports = Weather;
