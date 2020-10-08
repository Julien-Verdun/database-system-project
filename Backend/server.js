var express = require("express");
var app = express();

let mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mydbinstance",
  database: "schema1",
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/query", (req, res) => {
  console.log("Query 2 ! ");
  res.send({ caca: "pipi" });
});

con.connect(function (err, db) {
  if (err) throw err;
  else {
    console.log("Connected ! ");
    app.get("/firstquery", (req, res) => {
      console.log("Query ! ");
      let query = "SELECT * FROM colocataire";
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
      });
    });
  }
});

app.listen(8080);
