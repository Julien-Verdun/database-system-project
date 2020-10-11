var express = require("express");
var app = express();

let mysql = require("mysql");

/*

Créer un fichier database_coonection.js contenant le code suivant :


const databasePwd = "votre_mot_de_passe";

module.exports = {
  databasePwd,
};


Prener soin de renseigner votre mot de base

*/

let databasePwd = require("./database_creation//database_connection.js")
  .databasePwd;

let data = require("./database_creation/data.js");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: databasePwd,
  database: data.databaseName,
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

con.connect(function (err, db) {
  if (err) throw err;
  else {
    console.log("Connected ! ");

    app.get("/getAllFlights", (req, res) => {
      let query = "SELECT * FROM vols";
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
      });
    });
  }
});

app.listen(8080);
