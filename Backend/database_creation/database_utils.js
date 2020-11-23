function createDataBase(databaseName, con, callback) {
  // creation de la base de données
  con.query("CREATE SCHEMA IF NOT EXISTS " + databaseName + " ", function (
    err,
    result
  ) {
    if (err) throw err;
    else {
      console.log("Base de données créée");
    }
  });
}

function createTable(sql, con) {
  // cette fonction permet la création d'une table via la requête sql dans la base via la connection con
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table créée : ", sql);
  });
}

function updateTable(sql, con) {
  // cette fonction permet la modification d'une table via la requête sql dans la base via la connection con
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table modifiée : ", result.affectedRows);
  });
}

function insertElements(sql, values, con) {
  // inserer plusieurs elements dans une table
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Nombre de documents insérés : ", result.affectedRows);
  });
}

function deleteTable(sql, con) {
  // cette fonction permet de supprimer
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table supprimée : ", sql);
  });
}

function createProcedure(sql, con) {
  // cette fonction permet de supprimer
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Mise en place procédure : ", sql);
  });
}

module.exports = {
  createDataBase,
  createTable,
  updateTable,
  insertElements,
  deleteTable,
  createProcedure,
};
