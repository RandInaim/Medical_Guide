const fs = require("fs");
const path = require("path");
const request = require("request");

const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>Server Error</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.end(file);
    }
  });
};

const publicHandler = (request, response, endpoint) => {
  const extension = endpoint.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    png: "image/png",
    jpg: "image/jpg"
  };

  const filePath = path.join(__dirname, "..", endpoint);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, {
        "Content-Type": "text/html"
      });
      response.end("<h1>Server Error</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": extensionType[extension]
      });
      response.end(file);
    }
  });
};

const apiHandler = (req, res, endpoint) => {
  const queryString = endpoint.split("=")[1];
  console.log("query", queryString);
  const url = `https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inl1c3JhLmxhaGFsZWVoQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNTQxNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOS0wNy0xNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTYzMzc2Nzc4LCJuYmYiOjE1NjMzNjk1Nzh9.On52MBrJQ7CNgWhTILrNfDqGjeZPhoRZVvXoqRXOG2k&format=json&language=en-gb`;
  request(url, (error, response, body) => {
    if (error) {
      res.writeHead(404, {
        "Content-Type": "text/html"
      });
      res.end("<h1>Try again</h1>");
    }

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    const symptoms = JSON.parse(body);
    const disease = symptoms.filter(element => {
      {
        return element.Name === queryString;
      }
    });
    console.log(disease);

    let ID = disease[0].ID;

    // console.log("ID", ID);
    const url2 = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[${ID}]&gender=male&year_of_birth=1988&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Inl1c3JhLmxhaGFsZWVoQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiNTQxNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOS0wNy0xNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTYzMzc2OTE2LCJuYmYiOjE1NjMzNjk3MTZ9.hA0qyh4y_Eni_HeOGwZICdmmRfO4n8wz-3AqVYbcFtw&format=json&language=en-gb`;

    request(url2, (err, resp, bod) => {
      if (err) {
        res.writeHead(404, {
          "Content-Type": "text/html"
        });
        res.end("<h1>Try again</h1>");
      }

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      const diagnosis = JSON.parse(bod);

      const filterDiagnosis = diagnosis.map(element => {
        return element.Issue.Name;
      });

      console.log("kgasfd", filterDiagnosis);
      res.end(JSON.stringify(filterDiagnosis));
    });
  });
};

module.exports = {
  homeHandler,
  publicHandler,
  apiHandler
};
