const express = require("express");
// const { PORT } = require("../config");
const PORT = "8080";
const APP_ROUTES = require("./modules/routes");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

function initializeFramework() {
  console.log("Initialize Server");
  const app = express(); // create a new express app
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  console.log("Enable Cors");
  // add cors origin: * or specific address to allow cors from specific website
  // add creditials: true to add cache
  app.use(
    cors({
      origin: "http://localhost:4200",
    })
  ); // enable cors

  console.log("Initialize Routes");
  // retrieves the routes from the modules and define them in express app
  APP_ROUTES.forEach((route) => {
    switch (route.method) {
      case "get":
        app.get(route.path, route.handlers);
        return;
      case "post":
        app.post(route.path, route.handlers);
        return;
      case "put":
        app.put(route.path, route.handlers);
        return;
      case "delete":
        app.delete(route.path, route.handlers);
        return;
    }
  });

  // this is a fallback handler when the server fails to find a handler for an undefined route
  app.get("*", (req, res) => {
    res.send("Hello! This route is not available!");
  });

  console.log("Starting server ...");
  // start the server on the configured port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ...`);
  });
}

module.exports = initializeFramework;
