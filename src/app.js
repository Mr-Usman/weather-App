const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geolocation");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//tell express which template engine we are using
//customized view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve up
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Usman"
  }); // render views
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Usman"
  }); // render views
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help View",
    name: "Usman"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please Provide address"
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastdata) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            location,
            forecast: forecastdata
          });
        });
      }
    );
    // res.send({
    //   // json can be Object or an array
    //   forecast: "48 degress",
    //   location: "Lahore",
    //   address: req.query.address
    // });
  }
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "you must provide a search term"
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     products: []
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "usman",
    errorMsg: "Help Article not found!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "usman",
    errorMsg: "Page not found!"
  });
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
