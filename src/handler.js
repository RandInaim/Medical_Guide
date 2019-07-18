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
  // console.log("query", queryString
  const decodedInput = decodeURI(queryString).toLowerCase();
  const url = `https://sandbox-healthservice.priaid.ch/symptoms?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNhaGFyLmFkZW05NUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjU0MTQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMTktMDctMTYiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTU2MzQzNTY0OSwibmJmIjoxNTYzNDI4NDQ5fQ.xhbZBKny0du36U_gWNfWpSfBeZOry5rVmInUOyczk_A&format=json&language=en-gb`;
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
        return element.Name.toLowerCase() === decodedInput;
      }
    });
    console.log(disease);
    let ID = disease[0].ID;
    // console.log("ID", ID);
    const url2 = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[${ID}]&gender=male&year_of_birth=1988&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNhaGFyLmFkZW05NUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjU0MTQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMTktMDctMTYiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTU2MzQzNTcwOSwibmJmIjoxNTYzNDI4NTA5fQ.n_veH4nwuGNz8S9mmxPyLOk9VwQB9ggNeGvN6ORIBYI&format=json&language=en-gb`;

    request(url2, (err, resp, body) => {
      if (err) {
        res.writeHead(404, {
          "Content-Type": "text/html"
        });
        res.end("<h1>Try again</h1>");
      }

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      const diagnosis = JSON.parse(body);

      const filterDiagnosis = diagnosis.map(element => {
        const obj = {};
        obj.id = element.Issue.ID;
        obj.name = element.Issue.Name;
        return obj;
      });

      console.log("kgasfd", filterDiagnosis);
      res.end(JSON.stringify(filterDiagnosis));
    });
  });
};

const treatmentHandler = (req, res, endpoint) => {
  //  const treatmentUrl
  console.log("endpoint", endpoint);
  const treatmentId = endpoint.split("=")[1];
  console.log("treatment id", treatmentId);
  const treatmentUrl = `https://sandbox-healthservice.priaid.ch/issues/${treatmentId}/info?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNhaGFyLmFkZW05NUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjU0MTQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMTktMDctMTYiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTU2MzQzNTc2MywibmJmIjoxNTYzNDI4NTYzfQ.jasl-Tm9Zlgj5dXlQ4GBO78kI4yswtXCzZ9ir2eU_yA&format=json&language=en-gb`;
  request(treatmentUrl, (err, resp, body) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/html"
      });
      res.end("<h1>Try again</h1>");
    }

    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    let treatmentObj = {};
    treatmentObj.Description = JSON.parse(body).DescriptionShort;
    treatmentObj.Treatment = JSON.parse(body).TreatmentDescription;
    treatmentObj.Symptoms = JSON.parse(body).PossibleSymptoms;

    // const filterTreatment = treatmentDescreption.map((element) => {

    // 	return element.;
    // });

    console.log("treatment", treatmentObj);
    console.log(JSON.stringify(treatmentObj));
    res.end(JSON.stringify(treatmentObj));
  });
};

module.exports = {
  homeHandler,
  publicHandler,
  apiHandler,
  treatmentHandler
};
