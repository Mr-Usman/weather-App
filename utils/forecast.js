const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/3034ee0620dd4762aaac28af1a735cf6/${encodeURIComponent(
    lat
  )},${encodeURIComponent(long)}?units=si`;
  request({ url, json: true }, (error, { body }) => {
    //response.body
    if (error) {
      callback("Unable to Connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} it is currently ${
          body.currently.temperature
        } degrees out. There is a ${
          body.currently.precipProbability
        }% chance of rain`
      );
    }
  });
};

module.exports = forecast;
