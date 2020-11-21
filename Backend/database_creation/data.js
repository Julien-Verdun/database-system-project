const liste_tables = [
  "vols",
  "appareils",
  "avions",
  "compagnies",
  "aeroports",
  "clients",
  "reservations",
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
    place_libre = 120 + parseInt(Math.random() * 201);
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
for (var i = 0; i < 100; i++) {
  vols.push(createVol(appareils.length, aeroports.length));
}

// console.log(vols);

// const vols = [
//   [
//     100,
//     "2020-11-15",
//     "09:34:21",
//     "2020-11-15",
//     "11:34:21",
//     109,
//     100,
//     245.42,
//     130,
//   ],
//   [
//     101,
//     "2020-11-16",
//     "11:42:21",
//     "2020-11-15",
//     "21:34:00",
//     104,
//     102,
//     125.42,
//     104,
//   ],
//   [
//     102,
//     "2020-10-15",
//     "19:40:00",
//     "2020-10-16",
//     "20:34:23",
//     108,
//     109,
//     235.0,
//     56,
//   ],
//   [
//     103,
//     "2020-11-01",
//     "02:49:21",
//     "2020-11-01",
//     "09:34:27",
//     101,
//     103,
//     456.2,
//     23,
//   ],
//   [
//     104,
//     "2020-11-15",
//     "14:34:21",
//     "2020-11-15",
//     "16:32:31",
//     106,
//     107,
//     22.42,
//     130,
//   ],
//   [
//     107,
//     "2020-12-05",
//     "12:34:21",
//     "2020-12-05",
//     "16:56:24",
//     100,
//     107,
//     1224.92,
//     200,
//   ],
//   [
//     101,
//     "2020-12-13",
//     "23:54:41",
//     "2020-11-14",
//     "04:22:13",
//     103,
//     102,
//     145.02,
//     20,
//   ],
//   [
//     100,
//     "2020-11-30",
//     "17:34:21",
//     "2020-12-01",
//     "00:32:31",
//     109,
//     101,
//     230.12,
//     120,
//   ],
//   [
//     103,
//     "2021-01-01",
//     "16:34:21",
//     "2021-01-01",
//     "20:32:31",
//     104,
//     105,
//     204.93,
//     100,
//   ],
// ];

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

for (var i = 0; i <= 10; i++) {
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

function createReservation(nbClients, nbVol) {
  let id_cli = 100 + parseInt(Math.random() * nbClients),
    id_vol = 100 + parseInt(Math.random() * nbVol),
    prix = 100 + parseInt(Math.random() * 80000) / 100,
    quantite = 1 + parseInt(Math.random() * 15);
  return [id_cli, id_vol, prix, quantite];
}

for (var i = 0; i <= 30; i++) {
  reservations.push(createReservation(clients.length, vols.length));
}

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
};
