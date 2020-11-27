const nbReservations = 60,
  nbClients = 10,
  nbPersonnels = 100,
  nbVols = 100;

function randomG(v) {
  var r = 0;
  for (var i = v; i > 0; i--) {
    r += Math.random();
  }
  return 2 * Math.abs(r / v - 0.5);
}

const liste_tables = [
  "vols",
  "appareils",
  "avions",
  "compagnies",
  "aeroports",
  "clients",
  "reservations",
  "equipages",
  "personnels",
];

const databaseName = "mydb";

const avions = [
  ["A320", 150],
  ["A318", 107],
  ["A319", 124],
  ["A321", 185],
  ["A330-300", 300],
  ["A380-800", 350],
];

const compagnies = [
  ["EasyJet", "EAJ"],
  ["RyanAir", "RYA"],
  ["Virgin Atlantic Airways", "VAA"],
  ["Aeroflot Russian Airlines", "ARA"],
  ["Norwegian", "NOR"],
  ["Finnair", "FIN"],
  ["KLM", "KLM"],
  ["Air France", "AIF"],
  ["Austrian Airlines", "AUA"],
  ["Swiss International Air Lines", "SIA"],
  ["Turkish Airlines", "TUA"],
  ["Lufthansa", "LUF"],
];

const aeroports = [
  ["Aéroport de Londres-Heathrow", "LHW", "Londres", "Royaume-Uni"],
  ["Aéroport de Paris-Charles-de-Gaulle", "CDG", "Paris", "France"],
  ["Aéroport d'Amsterdam-Schiphol", "AMS", "Amsterdam", "Pays-Bas"],
  ["Aéroport de Francfort-Rhin/Main", "FRM", "Francfort", "Allemagne"],
  ["Aéroport Adolfo-Suarez de Madrid-Barajas", "ASM", "Madrid", "Espagne"],
  ["Aéroport internatiol de Barcelone-El Prat", "BEL", "Barcelone", "Espagne"],
  ["Aéroport d'Istanbul", "IST", "Istanbul", "Turquie"],
  ["Aéroport de Moscou-Cheremetievo", "MCO", "Moscou", "Russie"],
  ["Aéroport Franz-Josef-Strauss de Munich", "FJS", "Munich", "Allemagne"],
  ["Aéroport de Londres-Gatwick", "LGK", "Londres", "Royaume-Uni"],
];

const appareils = [
  [100, 100],
  [102, 105],
  [106, 104],
  [104, 103],
  [110, 103],
  [109, 102],
  [105, 101],
  [111, 105],
];

// new Date(2018, 8, 22, 15, 0, 0);

function createVol(nbAppareil, nbAeroport) {
  let app1 = parseInt(Math.random() * nbAeroport);
  let app2 = parseInt(Math.random() * nbAeroport);
  while (app2 === app1) {
    app2 = parseInt(Math.random() * nbAeroport);
  }
  let time1 =
    new Date().getTime() + parseInt(3600 * 1000 * 24 * 10 * Math.random());
  let time2 = time1 + parseInt(3600 * 1000 * 10 * Math.max(0.2, Math.random()));
  let id_app = 100 + parseInt(Math.random() * nbAppareil),
    date_depart = new Date(time1).toJSON().split("T")[0],
    heure_depart = new Date(time1).toJSON().split("T")[1].split(".")[0],
    date_arrivee = new Date(time2).toJSON().split("T")[0],
    heure_arrivee = new Date(time2).toJSON().split("T")[1].split(".")[0],
    id_aer_dep = 100 + app1,
    id_aer_arr = 100 + app2,
    prix = 100 + parseInt(Math.random() * 90000) / 100,
    place_libre = 120 + parseInt(randomG(4) * 201);
  return [
    id_app,
    date_depart,
    heure_depart,
    date_arrivee,
    heure_arrivee,
    id_aer_dep,
    id_aer_arr,
    prix,
    place_libre,
  ];
}

let vols = [];
for (var i = 0; i < nbVols; i++) {
  vols.push(createVol(appareils.length, aeroports.length));
}

let noms = [
  "Martin",
  "Bernard",
  "Thomas",
  "Petit",
  "Robert",
  "Richard",
  "Durand",
  "Dubois",
  "Moreau",
  "Laurent",
  "Simon",
  "Michel",
  "Lefèvre",
  "Leroy",
  "Roux",
  "David",
  "Bertrand",
  "Morel",
  "Fournier",
  "Girard",
  "Bonnet",
  "Dupont",
  "Lambert",
  "Fontaine",
  "Rousseau",
  "Vincent",
  "Muller",
  "Lefevre",
  "Faure",
  "Andre",
  "Mercier",
  "Blanc",
  "Guerin",
  "Boyer",
  "Garnier",
  "Chevalier",
  "Francois",
  "Legrand",
  "Gauthier",
  "Garcia",
  "Perrin",
  "Robin",
  "Clement",
  "Morin",
  "Nicolas",
  "Henry",
];

let prenoms = [
  "ABEL",
  "ACHILLE",
  "ADRIEN",
  "ALAIN",
  "ALAN",
  "ALEXANDRE",
  "ALEXIS",
  "ALIX",
  "ANATOLE",
  "ANTHONY",
  "ANTOINE",
  "ANTONIN",
  "ARMAND",
  "ARMEL",
  "ARNAUD",
  "ARSÈNE",
  "ARTHUR",
  "AUBIN",
  "AUGUSTIN",
  "AURÉLIEN",
  "AXEL",
  "AYDEN",
  "BAPTISTE",
  "BENJAMIN",
  "BRUNO",
  "CAMILLE",
  "CÉDRIC",
  "CHARLES",
  "CHARLIE",
  "CHRISTOPHE",
  "ADÉLAÏDE",
  "ADÈLE",
  "AGATHE",
  "ALBANE",
  "ALEXANDRA",
  "ALEXIA",
  "ALICE",
  "ALICIA",
  "ALIÉNOR",
  "ALIX",
  "ALIZÉE",
  "AMALIA",
  "AMANDINE",
  "ANAÉ",
  "ANNE",
  "ARIANE",
  "ARMELLE",
  "ASTRID",
  "AUDE",
  "AUDREY",
  "AURÉLIE",
  "AURORE",
  "BÉATRICE",
  "BÉRÉNICE",
  "BLANCHE",
  "BRUNE",
  "CAPUCINE",
  "CAROLE",
  "CAROLINE",
  "CASSANDRA",
];

let mailExtensions = [
  "@gmail.com",
  "@outlook.com",
  "@yahoo.fr",
  "@orange.fr",
  "@ec-lyon.fr",
  "@wanadoo.com",
  "@sfr.fr",
];

function createClient(noms, prenoms, mailExtensions) {
  let nom = noms[parseInt(Math.random() * noms.length)],
    prenom = prenoms[parseInt(Math.random() * prenoms.length)],
    mail =
      prenom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gi, "") +
      "." +
      nom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gi, "") +
      mailExtensions[parseInt(Math.random() * mailExtensions.length)],
    tel = "06" + parseInt(Math.random() * 90000000 + 10000000),
    hash = "sha1$b506264e$1$9260cc65156f4c2c90b5c5cbde28b91e7bbbb756";
  return [nom, prenom, mail, tel, hash];
}

let clients = [
  [
    "Julien",
    "VERDUN",
    "julien.verdun@ecl17.ec-lyon.fr",
    "0678987656",
    "sha1$b506264e$1$9260cc65156f4c2c90b5c5cbde28b91e7bbbb756",
  ],
  [
    "Maxime",
    "PETER",
    "maxime.peter@ecl17.ec-lyon.fr",
    "0678657612",
    "sha1$b506264e$1$9260cc65156f4c2c90b5c5cbde28b91e7bbbb756",
  ],
  [
    "superuser",
    "admin",
    "superuser@admin",
    "xxxxxxxxxx",
    "sha1$b506264e$1$9260cc65156f4c2c90b5c5cbde28b91e7bbbb756",
  ],
];

for (var i = 0; i <= nbClients; i++) {
  clients.push(createClient(noms, prenoms, mailExtensions));
}

let reservations = [
  [100, 102, 345.9, 1],
  [101, 102, 75.9, 4],
  [100, 103, 415.9, 1],
  [101, 103, 95.9, 1],
  [101, 104, 145.9, 23],
  [100, 100, 91.2, 10],
];

function createReservation(nbClient, nbVol) {
  let id_cli = 100 + parseInt(Math.random() * nbClient),
    id_vol = 100 + parseInt(Math.random() * nbVol),
    prix = 100 + parseInt(randomG(4) * 80000) / 100,
    quantite = 1 + parseInt(randomG(4) * 15);
  return [id_cli, id_vol, prix, quantite];
}

let nbPlaceVols = vols.map((array) => array[array.length - 1]);

let newRes;
for (var i = 0; i <= nbReservations; i++) {
  newRes = createReservation(clients.length, vols.length);
  if (nbPlaceVols[newRes[0] - 100] >= newRes[3]) {
    nbPlaceVols[newRes[0] - 100] -= newRes[3];
    reservations.push(newRes);
  }
}

let fonctions = {
  CDB: "Commandant de bord",
  OPL: "Copilote",
  OMN: "Officier Mécanicien Navigant",
  CCP: "Chef de Cabine",
  STW: "Steward",
  HDA: "Hôtesse de l'air",
};

let salaires = {
  CDB: [3500, 15000],
  OPL: [2500, 10000],
  OMN: [2000, 2000],
  CCP: [2000, 3000],
  STW: [1800, 2000],
  HDA: [1800, 2000],
};

let rues = [
  "Rue de l'arbre sec",
  "Place du 22 Novembre 1943",
  "Place des 44 enfants d'Izieu",
  "Place du 8 Février 1962",
  "Rue du 8 mai 1945",
  "Place du 8 novembre 1942",
  "Esplanade du 9 novembre 1989",
  "Rue de l'Abbaye",
  "Place de l'Abbé-Basset",
  "Rue de l'Abbé-Carton",
  "Rue de l'Abbé-de-l'Épée",
  "Place de l'Abbé-Franz-Stock",
  "Place de l'Abbé-Georges-Hénocque",
  "Rue de l'Abbé-Gillet",
  "Rue de l'Abbé-Grégoire",
  "Rue de l'Abbé-Groult",
  "Place de l'Abbé-Jean-Lebeuf",
  "Rue de l'Abbé-Migne",
  "Rue de l'Abbé-Patureau",
  "Rue de l'Abbé-Roger-Derry",
  "Avenue de l'Abbé-Roussel",
  "Rue de l'Abbé-Rousselot",
  "Rue de l'Abbé-Soulange-Bodin",
  "Rue des Abbesses",
  "Rue d'Abbeville",
  "Rue Abel",
  "Rue Abel-Ferry",
  "Rue Abel-Gance",
  "Rue Abel-Hovelacque",
  "Passage Abel-Leblanc",
];

function createPersonnels(noms, prenoms, fonctions, salaires, rues) {
  let trgFonction = Object.keys(fonctions)[
    parseInt(Math.random() * Object.keys(fonctions).length)
  ];
  let nom = noms[parseInt(Math.random() * noms.length)].toUpperCase(),
    prenom = prenoms[parseInt(Math.random() * prenoms.length)],
    fonction = fonctions[trgFonction];
  (adresse =
    parseInt(Math.random() * 200) +
    " " +
    rues[parseInt(Math.random() * rues.length)]),
    (numero_securite_sociale = parseInt(
      Math.random() * 9 * 10 ** 12 + 10 ** 12
    )),
    (salaire =
      salaires[trgFonction][0] +
      parseInt(randomG(4) * salaires[trgFonction][0])),
    (nombre_heure_vol = parseInt(randomG(4) * 200)),
    (numero_licence =
      trgFonction === "CDB" || trgFonction === "OPL"
        ? parseInt(Math.random() * 9 * 10 ** 5 + 10 ** 5)
        : null);
  prenom =
    prenom.slice(0, 1).toUpperCase() +
    prenom.slice(1, prenom.length).toLowerCase();
  return [
    nom,
    prenom,
    fonction,
    adresse,
    numero_securite_sociale,
    salaire,
    nombre_heure_vol,
    numero_licence,
  ];
}

let personnels = [];

for (var i = 0; i < nbPersonnels; i++) {
  personnels.push(createPersonnels(noms, prenoms, fonctions, salaires, rues));
}

let equipages = [];

let repartitions = {
  CDB: 1,
  OPL: 1,
  OMN: 1,
  CCP: 1,
  STW: 1,
  HDA: 1,
};

function createEquipages(pers, id_vol) {
  let id_per = pers[parseInt(Math.random() * pers.length)];
  return [id_vol, id_per];
}

Object.keys(fonctions).forEach((fonction, j) => {
  let pers = personnels
    .map((personnel, index) => {
      return personnel[2] === fonctions[fonction] ? 100 + index : null;
    })
    .filter((value) => value !== null);
  for (var i = 0; i < nbVols; i++) {
    for (var k = 0; k < repartitions[fonction]; k++) {
      equipages.push(createEquipages(pers, 100 + i));
    }
  }
});

module.exports = {
  liste_tables,
  databaseName,
  avions,
  compagnies,
  aeroports,
  appareils,
  vols,
  clients,
  reservations,
  personnels,
  equipages,
};
