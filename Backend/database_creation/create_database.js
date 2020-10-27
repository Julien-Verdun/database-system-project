// ce fichier permet de créer la base de données

let data = require("./data.js");

let utils = require("./database_utils.js");

let mysql = require("mysql");

/*

Créer un fichier database_coonection.js contenant le code suivant :


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

// connection à l'instance MySQL
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

// creation d'une base de données
utils.createDataBase(data.databaseName, con, () => {});

con.end(function (err) {
  if (err) {
    return console.log("error:" + err.message);
  } else {
    console.log("Connection à la base de données fermée.");
  }
});
