const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

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

app.post("/", function (req, res) {
  var arr = req.body["data"];
  //   var id = req.body["id"];
  console.log(arr);
  var s = 0;
  for (var i = 0; i < arr.length; i++) {
    s += arr[i];
  }
  const result = { id: process.env.NODE_NAME, data: s };

  res.send(JSON.stringify(result));
  //   res.send("hai");
});

app.listen(port, function () {
  console.log(`Slave listening on port ${port}!`);
});
