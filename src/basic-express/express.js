// in this example, we see how express is compared to the native http module.
const express = require("express");
const { PORT } = require("../config");
const app = express(); // creates an http server

// we define routes in our server like this.
app.get("/", (req, res) => {
  res.send("Hello World! 3"); // we call this line to send the response back to the client.
});

// for each http method there a function with the same name in the `app` variable
// GET -> app.get
// POST-> app.post
// PUT -> app.put
// DELETE -> app.delete

// this means that for the same route you can have 4 types of requests.

app.get("/products", (req, res) => {
  // when we want to return a json in the response, we call `res.json()` instead of `res.send()`
  res.json({
    list: [],
  });
});

// if we want to have routes that have route parameters, we can do it like this.
app.get("/products/:productId", (req, res) => {
  // the route params are available under req.params
  const productId = req.params.productId;

  console.log(`req.params.productId:${productId}`);
  res.send(`req.params.productId:${productId}`);
});

app.listen(PORT, () => {
  console.log(`App Running on port ${PORT} ...`);
});
