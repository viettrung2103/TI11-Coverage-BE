const http = require("http");
const { Http2ServerResponse, Http2ServerRequest } = require("http2");
const PORT = 3000; // this is the port that will be used for the server;

/**
 * handles all incoming requests from a client.
 * @param {Http2ServerRequest} request contains all the information about the request that was sent from the client.
 * @param {Http2ServerResponse} response a response object that will be used to send the response back to the client.
 */
function requestHandler(request, response) {
  response.writeHead(
    200, // (read more: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
    {
      // additional headers
    }
  ); // we can add response headers here and the status code.
  response.end("Hello there!"); // response.end is meant to send the response back to the client
}

/**
 * handles all incoming requests from a client. unlike requestHandler function, this function uses routes to define end points for the server.
 * @param {Http2ServerRequest} request contains all the information about the request that was sent from the client.
 * @param {Http2ServerResponse} response a response object that will be used to send the response back to the client.
 */
function router(request, response) {
  switch (request.url) {
    case "/": // will be the home url
      // we are just gonna say hello
      response.end("Hello there!");
      return;
    case "/products": // this route will be used to interact with products for your store for example:
      // we are gonna return an empty list for now
      const products_list = []; // this list can be queried from the database instead.

      // when returning json back to the client, there are a couple of things to be done.
      // set the header content-type to `application/json`
      response.setHeader("Content-Type", "application/json");
      response.writeHead(200);

      // transform any data we wanna send as json
      response.write(JSON.stringify([]));
      response.end(); // this line sends the response back to the client; mandatory to signal to the server that it should response, otherwise the client will not receive a response.
      return;
    default:
      response.setHeader('Content-Type','text/html; charset=utf-8'); // set the content type to be text
      response.writeHead(404); // send an error when trying to go to non-defined routes.

      response.write('Hello There'); // append the content
      response.end(); // send the response
      return;
  }
}

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ...`);
});
