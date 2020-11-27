// ce fichier contient le code nécessaire pour créer une base de données MySQL
// import des fonctions utils à la création de la base de données
let data = require("./data.js");

let utils = require("./database_utils.js");

let mysql = require("mysql");

/*

Créer un fichier database_conection.js contenant le code suivant :


const databaseParams = 
  { 
    databasePwd : "votre_mot_de_passe",
    host : "localhost",
    user : "root"
  };

module.exports = {
  databaseParams
};


Prener soin de renseigner votre mot de base

*/

let databaseParams = require("./database_connection.js").databaseParams;

// connection à la base de données crées
con = mysql.createConnection({
  host: databaseParams.host,
  user: databaseParams.user,
  password: databaseParams.databasePwd,
  database: data.databaseName,
});

con.connect(function (err) {
  if (err) throw err;
  else console.log("Connecté !");
});

// on verifie d'abord que la base est vide avant de la remplir, sinon on supprime tout avant de la remplir
let is_filled_in = false;
let query =
  "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" +
  data.databaseName +
  "';";
con.query(query, (err, results, fields) => {
  if (err) throw err;
  else {
    is_filled_in = results.length !== 0;

    if (is_filled_in) {
      // suppression des foreign keys
      liste_frg_key_drop = [
        "ALTER TABLE vols DROP FOREIGN KEY vols_ibfk_1;",
        "ALTER TABLE vols DROP FOREIGN KEY vols_ibfk_2;",
        "ALTER TABLE vols DROP FOREIGN KEY vols_ibfk_3;",
        "ALTER TABLE appareils DROP FOREIGN KEY appareils_ibfk_1;",
        "ALTER TABLE appareils DROP FOREIGN KEY appareils_ibfk_2;",
        "ALTER TABLE reservations DROP FOREIGN KEY reservations_ibfk_1;",
        "ALTER TABLE reservations DROP FOREIGN KEY reservations_ibfk_2;",
        "ALTER TABLE equipages DROP FOREIGN KEY equipages_ibfk_1;",
        "ALTER TABLE equipages DROP FOREIGN KEY equipages_ibfk_2;",
      ];

      liste_frg_key_drop.forEach((query) => {
        utils.deleteTable(query, con);
      });

      // on s'assure que la table n'existe pas en la supprimant dans un premier temps
      let drop_table_sql = "DROP TABLE IF EXISTS ";
      data.liste_tables.forEach((value, index) => {
        utils.deleteTable(drop_table_sql + value, con);
      });
    }

    liste_tables = [
      "CREATE TABLE vols (id_vol INT AUTO_INCREMENT PRIMARY KEY, id_app INT, date_depart DATE, heure_depart TIME, date_arrivee DATE, heure_arrivee TIME, id_aer_dep INT, id_aer_arr INT, prix FLOAT, place_libre INT) AUTO_INCREMENT = 100;",
      "CREATE TABLE appareils (id_app INT AUTO_INCREMENT PRIMARY KEY, id_cmp INT, id_avn INT) AUTO_INCREMENT = 100;",
      "CREATE TABLE avions (id_avn INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(255), nb_place INT)  AUTO_INCREMENT = 100;",
      "CREATE TABLE compagnies (id_cmp INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(255), code VARCHAR(255)) AUTO_INCREMENT = 100;",
      "CREATE TABLE aeroports (id_aer INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(255), code VARCHAR(255), ville VARCHAR(255), pays VARCHAR(255)) AUTO_INCREMENT = 100;",
      "CREATE TABLE clients (id_cli INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(255), prenom VARCHAR(255), mail VARCHAR(255), telephone VARCHAR(255), hashpassword VARCHAR(255)) AUTO_INCREMENT = 100;",
      "CREATE TABLE reservations (id_res INT AUTO_INCREMENT PRIMARY KEY, id_cli INT, id_vol INT, prix FLOAT, quantite INT) AUTO_INCREMENT = 100;",
      "CREATE TABLE equipages (id_eqp INT AUTO_INCREMENT PRIMARY KEY, id_vol INT, id_per INT) AUTO_INCREMENT = 100;",
      "CREATE TABLE personnels (id_per INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(255), prenom VARCHAR(255), fonction VARCHAR(255), adresse VARCHAR(255), numero_securite_sociale VARCHAR(255), salaire FLOAT, nombre_heure_vol INT, numero_licence INT) AUTO_INCREMENT = 100;",
    ];

    liste_tables.forEach((query) => {
      utils.createTable(query, con);
    });

    liste_frg_key = [
      "ALTER TABLE vols ADD CONSTRAINT vols_ibfk_1 FOREIGN KEY (id_app) REFERENCES appareils(id_app);",
      "ALTER TABLE vols ADD CONSTRAINT vols_ibfk_2 FOREIGN KEY (id_aer_dep) REFERENCES aeroports(id_aer);",
      "ALTER TABLE vols ADD CONSTRAINT vols_ibfk_3 FOREIGN KEY (id_aer_arr) REFERENCES aeroports(id_aer);",
      "ALTER TABLE appareils ADD CONSTRAINT appareils_ibfk_1 FOREIGN KEY (id_cmp) REFERENCES compagnies(id_cmp);",
      "ALTER TABLE appareils ADD CONSTRAINT appareils_ibfk_2 FOREIGN KEY (id_avn) REFERENCES avions(id_avn);",
      "ALTER TABLE reservations ADD CONSTRAINT reservations_ibfk_1 FOREIGN KEY (id_cli) REFERENCES clients(id_cli);",
      "ALTER TABLE reservations ADD CONSTRAINT reservations_ibfk_2 FOREIGN KEY (id_vol) REFERENCES vols(id_vol);",
      "ALTER TABLE equipages ADD CONSTRAINT equipages_ibfk_1 FOREIGN KEY (id_per) REFERENCES personnels(id_per);",
      "ALTER TABLE equipages ADD CONSTRAINT equipages_ibfk_2 FOREIGN KEY (id_vol) REFERENCES vols(id_vol);",
    ];

    // create link beetwen tables
    liste_frg_key.forEach((query) => {
      utils.createTable(query, con);
    });

    // create procedures
    liste_procedures = [
      "DROP PROCEDURE IF EXISTS procedure_add_avion",
      "CREATE PROCEDURE procedure_add_avion (IN model CHAR(20), IN nb_places INT) INSERT INTO avions (type, nb_place) VALUES (model, nb_places);",
    ];

    liste_procedures.forEach((query) => {
      utils.createProcedure(query, con);
    });

    // remplissages des tables avions, compagnies et aeroports

    utils.insertElements(
      "INSERT INTO avions (type, nb_place) VALUES ?",
      data.avions,
      con
    );

    utils.insertElements(
      "INSERT INTO compagnies (nom, code) VALUES ?",
      data.compagnies,
      con
    );

    utils.insertElements(
      "INSERT INTO aeroports (nom, code, ville, pays) VALUES ?",
      data.aeroports,
      con
    );

    utils.insertElements(
      "INSERT INTO appareils (id_cmp, id_avn) VALUES ?",
      data.appareils,
      con
    );

    utils.insertElements(
      "INSERT INTO vols (id_app, date_depart, heure_depart, date_arrivee, heure_arrivee, id_aer_dep, id_aer_arr, prix, place_libre) VALUES ?",
      data.vols,
      con
    );

    utils.insertElements(
      "INSERT INTO clients (nom, prenom, mail, telephone, hashpassword) VALUES ?",
      data.clients,
      con
    );

    utils.insertElements(
      "INSERT INTO reservations (id_cli, id_vol, prix, quantite) VALUES ?",
      data.reservations,
      con
    );

    utils.insertElements(
      "INSERT INTO personnels (nom, prenom, fonction, adresse, numero_securite_sociale, salaire,nombre_heure_vol,numero_licence) VALUES ?",
      data.personnels,
      con
    );

    utils.insertElements(
      "INSERT INTO equipages (id_vol, id_per) VALUES ?",
      data.equipages,
      con
    );

    // rattrapage des nombres de places libres par vol avec le nombre de place disponible dans les avions
    // rattrapage avec les reservations effectuées

    rattraPlaceLibre = [
      `
      UPDATE vols vol
      JOIN appareils app ON app.id_app = vol.id_app
      JOIN avions avn ON avn.id_avn = app.id_avn
      SET vol.place_libre = avn.nb_place
      WHERE 1 = 1;
      `,
      `
      UPDATE vols vol
      JOIN reservations res ON res.id_vol = vol.id_vol
      JOIN clients cli ON cli.id_cli = res.id_cli
      SET vol.place_libre = vol.place_libre - res.quantite
      WHERE 1 = 1;
      `,
    ];
    rattraPlaceLibre.forEach((query) => {
      utils.updateTable(query, con);
    });

    con.end(function (err) {
      if (err) return console.log("error:" + err.message);
      else console.log("Connection à la base de données fermée.");
    });
  }
});
