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

const vols = [
  [
    100,
    "2020-11-15",
    "09:34:21",
    "2020-11-15",
    "11:34:21",
    109,
    100,
    245.42,
    130,
  ],
  [
    101,
    "2020-11-16",
    "11:42:21",
    "2020-11-15",
    "21:34:00",
    104,
    102,
    125.42,
    104,
  ],
  [
    102,
    "2020-10-15",
    "19:40:00",
    "2020-10-16",
    "20:34:23",
    108,
    109,
    235.0,
    56,
  ],
  [
    103,
    "2020-11-01",
    "02:49:21",
    "2020-11-01",
    "09:34:27",
    101,
    103,
    456.2,
    23,
  ],
  [
    104,
    "2020-11-15",
    "14:34:21",
    "2020-11-15",
    "16:32:31",
    106,
    107,
    22.42,
    130,
  ],
  [
    107,
    "2020-12-05",
    "12:34:21",
    "2020-12-05",
    "16:56:24",
    100,
    107,
    1224.92,
    200,
  ],
  [
    101,
    "2020-12-13",
    "23:54:41",
    "2020-11-14",
    "04:22:13",
    103,
    102,
    145.02,
    20,
  ],
  [
    100,
    "2020-11-30",
    "17:34:21",
    "2020-12-01",
    "00:32:31",
    109,
    101,
    230.12,
    120,
  ],
  [
    103,
    "2021-01-01",
    "16:34:21",
    "2021-01-01",
    "20:32:31",
    104,
    105,
    204.93,
    100,
  ],
];

const clients = [
  [
    "Julien",
    "Verdun",
    "julien.verdun@ecl17.ec-lyon.fr",
    "0678987656",
    "sha1$b506264e$1$9260cc65156f4c2c90b5c5cbde28b91e7bbbb756",
  ],
  [
    "Maxime",
    "Peter",
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

const reservations = [
  [100, 102, 345.9, 1],
  [101, 102, 75.9, 4],
  [100, 103, 415.9, 1],
  [101, 103, 95.9, 1],
  [101, 104, 145.9, 23],
  [100, 100, 91.2, 10],
];

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
