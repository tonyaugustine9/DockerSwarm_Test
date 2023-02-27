const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3000;
var d = 3;
var nodes = [];

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/test", (req, res) => {
  res.send(process.env.NODE_NAME);
});

app.post("/", async (req, res) => {
  // var arr = req.body["data"];
  // var piece = { data: arr.slice(1) };
  // const apiResponse = await axios.post("http://slave:3001/", piece);
  // console.log(apiResponse.data.data);
  // res.send(`sum is ${apiResponse.data.data}`);
  // res.send(`sum is 15`);
  var sum = 0;
  var arr = req.body["data"];
  console.log(arr);
  var j = d;
  for (var i = 0; i < arr.length; i += d) {
    if (j > arr.length) {
      // j=arr.length;
      //   console.log(arr.slice(i));
      var piece = { data: arr.slice(i) };
      const apiResponse = await axios.post(`http://slave:3001/`, piece);
      //   console.log(apiResponse.data);
      sum += apiResponse.data.data;
      if (!nodes.includes(apiResponse.data.id)) {
        nodes.push(apiResponse.data.id);
      }
      break;
    }
    // console.log(arr.slice(i, j));
    var piece = { data: arr.slice(i, j) };
    const apiResponse = await axios.post(`http://slave:3001/`, piece);
    // console.log(apiResponse.data);
    sum += apiResponse.data.data;
    if (!nodes.includes(apiResponse.data.id)) {
      nodes.push(apiResponse.data.id);
    }
    j += d;
  }
  //   // var i = 0;
  //   // var j=2;
  //   // var piece = { data: arr.slice(i,j) };
  //   // const apiResponse = await axios.post(
  //   //   `http://localhost:3001/`,
  //   //   piece
  //   // );
  //   // console.log(apiResponse.data)
  //   console.log(sum);
  var nodestring = "";
  nodes.forEach((node) => {
    nodestring = nodestring + "-" + node;
  });
  res.send(`sum is ${sum} and nodes: ${nodestring}`);
  // });
});

app.listen(port, function () {
  console.log(`Master listening on port ${port}!`);
});
