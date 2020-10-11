// ce fichier contient le code nécessaire pour créer une base de données MySQL
// import des fonctions utils à la création de la base de données
let data = require("./data.js");

let utils = require("./database_utils.js");

let mysql = require("mysql");

// connection à la base de données crées
con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mydbinstance",
  database: data.databaseName,
});

con.connect(function (err) {
  if (err) throw err;
  else console.log("Connecté !");
});

// on s'assure que la table n'existe pas en la supprimant dans un premier temps
let drop_table_sql = "DROP TABLE IF EXISTS ";
// let drop_tables = "";
data.liste_tables.forEach((value, index) => {
  utils.deleteTable(drop_table_sql + value, con);
  // drop_tables += drop_table_sql + value + "; ";
});
// console.log(drop_tables);

// utils.deleteTable(drop_tables, con);

liste_tables = [
  "CREATE TABLE vols (id_vol INT AUTO_INCREMENT PRIMARY KEY, id_app INT, heure_depart DATE, heure_arrivee DATE, id_aer_dep INT, id_aer_arr INT, prix FLOAT, place_libre INT) AUTO_INCREMENT = 100;",
  "CREATE TABLE appareils (id_app INT AUTO_INCREMENT PRIMARY KEY, id_cmp INT, id_avn INT) AUTO_INCREMENT = 100;",
  "CREATE TABLE avions (id_avn INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(255), nb_place INT)  AUTO_INCREMENT = 100;",
  "CREATE TABLE compagnies (id_cmp INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(255), code VARCHAR(255)) AUTO_INCREMENT = 100;",
  "CREATE TABLE aeroports (id_aer INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(255), code VARCHAR(255), ville VARCHAR(255), pays VARCHAR(255)) AUTO_INCREMENT = 100;",
  "CREATE TABLE clients (id_cli INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(255), prenom VARCHAR(255), mail VARCHAR(255), telephone VARCHAR(255)) AUTO_INCREMENT = 100;",
  "CREATE TABLE reservations (id_res INT AUTO_INCREMENT PRIMARY KEY, id_cli INT, id_vol INT, prix INT, quantite INT) AUTO_INCREMENT = 100;",
];

liste_tables.forEach((query) => {
  utils.createTable(query, con);
});

liste_frg_key = [
  "ALTER TABLE vols ADD FOREIGN KEY (id_app) REFERENCES Appareils(id_app);",
  "ALTER TABLE vols ADD FOREIGN KEY (id_aer_dep) REFERENCES Aeroports(id_aer);",
  "ALTER TABLE vols ADD FOREIGN KEY (id_aer_arr) REFERENCES Aeroports(id_aer);",
  "ALTER TABLE appareils ADD FOREIGN KEY (id_cmp) REFERENCES Compagnies(id_cmp);",
  "ALTER TABLE appareils ADD FOREIGN KEY (id_avn) REFERENCES Avions(id_avn);",
  "ALTER TABLE reservations ADD FOREIGN KEY (id_cli) REFERENCES Clients(id_cli);",
  "ALTER TABLE reservations ADD FOREIGN KEY (id_vol) REFERENCES Vols(id_vol);",
];

// create link beetwen tables
// vols
liste_frg_key.forEach((query) => {
  utils.createTable(query, con);
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
  "INSERT INTO vols (id_app, heure_depart, heure_arrivee, id_aer_dep, id_aer_arr, prix, place_libre) VALUES ?",
  data.vols,
  con
);

con.end(function (err) {
  if (err) return console.log("error:" + err.message);
  else console.log("Connection à la base de données fermée.");
});
