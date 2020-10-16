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

    // this query returns all the flights in the table vols from the database
    app.get("/getAllFlights", (req, res) => {
      let query = "SELECT * FROM vols;";
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    // this query returns all the users in the table clients from the database
    app.get("/getAllClients", (req, res) => {
      let query = "SELECT * FROM clients;";
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    app.get("/getAllAirportsIdName", (req, res) => {
      let query = "SELECT id_aer, nom FROM aeroports;";
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    // this query returns all the reservations in the database for the given client
    app.get("/getReservation/:id_cli/:id_res", (req, res) => {
      let id_cli = Number(decodeURI(req.params.id_cli));
      let id_res = Number(decodeURI(req.params.id_res));
      let query =
        `
        SELECT res.id_res, 
          res.prix as 'prix_res', 
          res.quantite, 
          cli.nom AS 'cli_nom', 
          cli.prenom, 
          cli.mail, 
          cli.telephone,
          vol.date_depart, 
          vol.heure_depart, 
          vol.date_arrivee, 
          vol.heure_arrivee,
          vol.prix as 'prix_vol', 
          vol.place_libre, 
          aer_arr.nom AS 'aer_arr_nom', 
          aer_arr.ville AS 'aer_arr_ville', 
          aer_arr.pays AS 'aer_arr_pays',
          aer_dep.nom AS 'aer_dep_nom', 
          aer_dep.ville AS 'aer_dep_ville', 
          aer_dep.pays AS 'aer_dep_pays', 
          avn.type, 
          avn.nb_place, 
          cmp.nom AS 'cmp_nom'
        FROM reservations res
        JOIN clients cli ON res.id_cli = cli.id_cli AND cli.id_cli = ` +
        id_cli +
        `
        JOIN vols vol ON vol.id_vol = res.id_vol
        JOIN appareils app ON app.id_app = vol.id_app
        JOIN avions avn ON avn.id_avn = app.id_avn
        JOIN compagnies cmp ON cmp.id_cmp = app.id_cmp
        JOIN aeroports aer_dep ON aer_dep.id_aer = vol.id_aer_dep
        JOIN aeroports aer_arr ON aer_arr.id_aer= vol.id_aer_arr
        WHERE res.id_res = ` +
        id_res +
        `
        ORDER BY vol.date_depart ASC, vol.heure_depart ASC;
        `;
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    // this query returns all the reservations in the database for the given client
    app.get("/getAllReservations/:id_cli", (req, res) => {
      let id_cli = Number(decodeURI(req.params.id_cli));
      let query =
        `
        SELECT res.id_res, 
          res.prix as 'prix_res', 
          res.quantite, 
          cli.nom AS 'cli_nom', 
          cli.prenom, 
          cli.mail, 
          cli.telephone,
          vol.date_depart, 
          vol.heure_depart, 
          vol.date_arrivee, 
          vol.heure_arrivee,
          vol.prix as 'prix_vol', 
          vol.place_libre, 
          aer_arr.nom AS 'aer_arr_nom', 
          aer_arr.ville AS 'aer_arr_ville', 
          aer_arr.pays AS 'aer_arr_pays',
          aer_dep.nom AS 'aer_dep_nom', 
          aer_dep.ville AS 'aer_dep_ville', 
          aer_dep.pays AS 'aer_dep_pays', 
          avn.type, 
          avn.nb_place, 
          cmp.nom AS 'cmp_nom'
        FROM reservations res
        JOIN clients cli ON res.id_cli = cli.id_cli AND cli.id_cli = ` +
        id_cli +
        `
        JOIN vols vol ON vol.id_vol = res.id_vol
        JOIN appareils app ON app.id_app = vol.id_app
        JOIN avions avn ON avn.id_avn = app.id_avn
        JOIN compagnies cmp ON cmp.id_cmp = app.id_cmp
        JOIN aeroports aer_dep ON aer_dep.id_aer = vol.id_aer_dep
        JOIN aeroports aer_arr ON aer_arr.id_aer= vol.id_aer_arr
        ORDER BY vol.date_depart ASC, vol.heure_depart ASC;
        `;
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });
  }
});

app.listen(8080);
