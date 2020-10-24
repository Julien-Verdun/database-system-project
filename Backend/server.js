var express = require("express");
var app = express();

let mysql = require("mysql");

let utils = require("./utils.js");

let bodyParser = require("body-parser").json();
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

app.use(bodyParser);

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

    // this query returns all the airports in the table aeroports from the database
    app.get("/getAllAirports", (req, res) => {
      let query = "SELECT * FROM aeroports;";
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    // this query returns all the avions in the table avions from the database
    app.get("/getAllAvions", (req, res) => {
      let query = "SELECT * FROM avions;";
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    // this query returns all the compagnies in the table compagnies from the database
    app.get("/getAllCompagnies", (req, res) => {
      let query = "SELECT * FROM compagnies;";
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    // this query returns all the apparals in the table appareils from the database
    app.get("/getAllAppareils", (req, res) => {
      let query = `
        SELECT app.id_app,
          avi.type AS 'type_avion', 
          avi.nb_place AS 'nb_place', 
          cmp.nom AS 'nom_compagnie',
          cmp.code AS 'code_compagnie' 
        FROM appareils app
        JOIN avions avi ON avi.id_avn = app.id_avn
        JOIN compagnies cmp ON cmp.id_cmp = app.id_cmp;
      `;
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

    // this query returns the client in the table clients from the database with id id_cli
    app.get("/getClient/:id_cli", (req, res) => {
      let id_cli = Number(decodeURI(req.params.id_cli));
      let query =
        "SELECT * FROM clients WHERE id_cli = " + id_cli + " LIMIT 1;";
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    app.get(
      "/getFlights/:travelDate/:departureAirportId/:arrivalAirportId/:nbPassengers",
      (req, res) => {
        let travelDate = decodeURI(req.params.travelDate);
        let departureAirportId = Number(
          decodeURI(req.params.departureAirportId)
        );
        let arrivalAirportId = Number(decodeURI(req.params.arrivalAirportId));
        let nbPassengers = Number(decodeURI(req.params.nbPassengers));
        let query =
          `
        SELECT v.date_depart, v.heure_depart, v.date_arrivee, v.heure_arrivee, v.prix, v.id_vol, a_dep.nom AS aeroport_depart, a_arr.nom AS aeroport_arrivee
        FROM vols v
        JOIN aeroports a_dep ON v.id_aer_dep = a_dep.id_aer
        JOIN aeroports a_arr ON v.id_aer_dep = a_arr.id_aer
        WHERE date_depart = '` +
          travelDate +
          `'
          AND id_aer_dep = ` +
          departureAirportId +
          `
          AND id_aer_arr = ` +
          arrivalAirportId +
          `
          AND place_libre >= ` +
          nbPassengers +
          `;`;
        con.query(query, (err, results, fields) => {
          if (err) throw err;
          res.send(results);
        });
      }
    );

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
        results[0].date_depart = utils.processDate(results[0].date_depart);
        results[0].date_arrivee = utils.processDate(results[0].date_arrivee);
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
        results[0].date_depart = utils.processDate(results[0].date_depart);
        results[0].date_arrivee = utils.processDate(results[0].date_arrivee);
        res.send(results);
      });
    });

    // this query returns the flight in the database for the given client and the given flight id
    app.get("/getVol/:id_vol", (req, res) => {
      let id_vol = Number(decodeURI(req.params.id_vol));
      let query =
        `
        SELECT vol.date_depart, 
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
        FROM vols vol
        JOIN appareils app ON app.id_app = vol.id_app
        JOIN avions avn ON avn.id_avn = app.id_avn
        JOIN compagnies cmp ON cmp.id_cmp = app.id_cmp
        JOIN aeroports aer_dep ON aer_dep.id_aer = vol.id_aer_dep
        JOIN aeroports aer_arr ON aer_arr.id_aer= vol.id_aer_arr
        WHERE vol.id_vol = ` +
        id_vol +
        `
        LIMIT 1
        `;
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        results[0].date_depart = utils.processDate(results[0].date_depart);
        results[0].date_arrivee = utils.processDate(results[0].date_arrivee);
        res.send(results);
      });
    });

    // this query delete the reservation id_res in the table reservations
    app.post("/deleteReservation", (req, res) => {
      let id_res = req.body.id_res;
      console.log("id_res : ", id_res);
      let query =
        `
        DELETE FROM reservations res
        WHERE res.id_res = 
      ` +
        id_res +
        `
      LIMIT 1;
      `;
      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    // this query delete the appareil id_app in the table appareils
    app.post("/deleteAppareil", (req, res) => {
      // in order to delete an apparals
      let id_app = req.body.id_app;
      console.log("id_app : ", id_app);
      let query_app =
        `
        DELETE FROM appareils app
        WHERE app.id_app = 
        ` +
        id_app +
        `
        LIMIT 1;
        `;

      con.query(query_app, (err, results, fields) => {
        if (err) throw err;
        res.send( results );
      });
    });



    // this query delete the vol id_vol in the table vols
    app.post("/deleteVol", (req, res) => {
      // in order to delete a flight, we first need to delete the associated reservations
      let id_vol = req.body.id_vol;
      console.log("id_vol : ", id_vol);
      let query_res =
        `
        DELETE FROM reservations res
        WHERE res.id_vol = 
        ` +
        id_vol +
        `;`;

      let query_vol =
        `
        DELETE FROM vols vol
        WHERE vol.id_vol = 
        ` +
        id_vol +
        `
        LIMIT 1;
        `;
      con.query(query_res, (err_res, results_res, fields_res) => {
        if (err_res) throw err_res;
        // res.send(results_res);
        con.query(query_vol, (err, results, fields) => {
          if (err) throw err;
          res.send({ results_res: results_res, results: results });
        });
      });
    });

    // this query add a reservation with all information id_res in the table reservations
    app.post("/addReservation", function (req, res) {
      let reqBody = req.body;
      const id_cli = reqBody.id_cli,
        id_vol = reqBody.id_vol,
        prix = reqBody.prix,
        quantite = reqBody.quantite;

      console.log("reqBody : ", reqBody);
      let query =
        `INSERT INTO reservations (id_cli, id_vol, prix, quantite) VALUES (` +
        id_cli +
        `, ` +
        id_vol +
        `, ` +
        prix +
        `, ` +
        quantite +
        `);`;
      //('"+id_cli+"', '"+id_vol+"', '"+prix+"', '"+quantite+"');`;

      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });

    // this query add a reservation with all information id_res in the table reservations
    app.post("/addVol", function (req, res) {
      let reqBody = req.body;
      const id_app = reqBody.id_app,
        date_depart = reqBody.date_depart,
        heure_depart = reqBody.heure_depart,
        date_arrivee = reqBody.date_arrivee,
        heure_arrivee = reqBody.heure_arrivee,
        id_aer_dep = reqBody.id_aer_dep,
        id_aer_arr = reqBody.id_aer_arr,
        prix = reqBody.prix,
        place_libre = reqBody.place_libre;

      console.log("reqBody : ", reqBody);
      let query =
        `INSERT INTO vols (id_app, date_depart, heure_depart, date_arrivee, heure_arrivee, id_aer_dep, id_aer_arr, prix, place_libre) VALUES (` +
        id_app +
        `, "` +
        date_depart +
        `", "` +
        heure_depart +
        `", "` +
        date_arrivee +
        `", "` +
        heure_arrivee +
        `", ` +
        id_aer_dep +
        `, ` +
        id_aer_arr +
        `, ` +
        prix +
        `, ` +
        place_libre +
        `);`;

      con.query(query, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    });
  }




  // this query add an appareils with all information id_app in the table appareils
  app.post("/addAppareil", function (req, res) {
    let reqBody = req.body;
    const id_cmp = reqBody.id_cmp,
      id_avn = reqBody.id_avn;

    console.log("reqBody : ", reqBody);
    let query =
      `INSERT INTO appareils (id_cmp, id_avn) VALUES (` +
      id_cmp +
      `, ` +
      id_avn +
      `);`;

    con.query(query, (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    });
  });

  // this query add an avion with all information id_avn in the table avions
  app.post("/addAvion", function (req, res) {
    let reqBody = req.body;
    const type = reqBody.type,
      nb_place = reqBody.nb_place;

    console.log("reqBody : ", reqBody);
    let query =
      `INSERT INTO avions (type, nb_place) VALUES ("` +
      type +
      `", ` +
      nb_place +
      `);`;

    con.query(query, (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    });
  });


  // this query add a compagnie with all information id_cmp in the table compagnies
  app.post("/addCompagnie", function (req, res) {
    let reqBody = req.body;
    const nom = reqBody.nom,
      code = reqBody.code;

    console.log("reqBody : ", reqBody);
    let query =
      `INSERT INTO compagnies (nom, code) VALUES ("` +
      nom +
      `", "` +
      code +
      `");`;

    con.query(query, (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    });
  });




});

app.listen(8080);
