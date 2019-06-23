const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidXNtYW5yZWhtYXQiLCJhIjoiY2p3eXZoZmx5MDFieDN5cW91YXl1MG9tcSJ9.-fHVDyAJke-4-MVeguFQgg&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    // response.body
    if (error) {
      callback("Unable to Connect to weather service!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to Connect to weather service. Try another search",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
