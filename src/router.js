const { homeHandler, publicHandler, apiHandler } = require("./handler");

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint == "/") {
    homeHandler(request, response);
  } else if (endpoint.indexOf("public") !== -1) {
    publicHandler(request, response, endpoint);
  } else if (endpoint.indexOf("/search") !== -1) {
    apiHandler(request, response, endpoint);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("<h1>404 dosen't found</h1>");
  }
};

module.exports = router;
