# Systeme de base de données

Ce projet contient l'application web développé par **Maxime Peter** et **Julien Verdun** dans le cadre du cours **Système de base de données**, cours de S9 à l'Ecole Centrale de Lyon.

L'objectif est de créer une application web qui intéragit avec une base de données **MySQL**.

---

## Description du projet

Application permettant la réservation d'un billet d'avion.

---

## Choix des technologies

Le projet a été développé avec des technologies récentes.

Le front-end de l'application est basé sur le framework **ReactJS**.

Le back-end de l'appication a été réalisé en **NodeJS**.

Pour respecter le sujet, la base de données est une base **MySQL**.

---

## Guide d'installation

### Installation des outils nécessaires

Afin d'utiliser l'application les deux outils suivants devront être installés, assurez vous de les avoir téléchargé avant de continuer l'installation :

- [Node.JS](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

Cloner le répertoire [GitHub](https://github.com/Julien-Verdun/database-system-project) dans un répertoire local.

### Installation des dépendances

Le projet dépend de nombreux packages **npm** dont la liste des versions est disponible dans les deux fichiers :

- `database-system-project/Frontend/package-lock.json`
- `database-system-project/Backend/package-lock.json`

Afin d'installer les packages nécessaires :

- ouvrir un invité de commande et se placer au niveau du répertoire `database-system-project/Frontend` et exécuter la ligne de commande :

```
npm install
```

Réaliser la même opération dans le répertoire `database-system-project/Backend`.

Le gestionnaire de package **npm** va se charger d'installer la bonne version des packages nécessaires au bon fonctionnement de l'application.

### Création de la base de données

Dans le repertoire `database-system-project/Backend/database_creation`, créez un fichier `database_connection.js` avec le contenu suivant :

```
const databasePwd = "votre_mot_de_passe",
  host = "localhost",
  user = "root";

module.exports = {
  databasePwd,
  host,
  user
};

```

Prenez soin de renseigner le mot de passe de votre instance mysql en lieu et place de **votre_mot_de_passe**.

/!\ /!\ /!\ Si votre instance MySQL n'a pas été créée avec les paramètres **host** et **user** localhost et root, prenez soin de les remplacer par leurs valeurs.

Ces paramètres nous permettent de nous connecter à notre base de données locale.
Nous allons maintenant nous y connecter et générer une base de données contenant quelques données.

Pour ce faire, ouvrez une invité de commande, placez-vous au niveau du répertoire `database-system-project/Backend/database_creation` et exécutez successivement les lignes de commande :

```
node create_database.js
```

puis :

```
node feed_database.js
```

Une base de données MySQL portant le nom **mydb** est créée et contient les tables, les relations, et quelques données nécessaires à la manipulation de l'application.

---

## Lancement local de l'application

Afin de lancer en local la partie back-end de l'application, ouvrez un invité de commande, placez-vous au niveau du répertoire `database-system-project/Backend` et exécutez la ligne de commande :

```
npm start
```

Le serveur NodeJS se lance et écoute sur le port 8080.

Afin de lancer en local la partie front-end de l'application, ouvrez un invité de commande, placez-vous au niveau du répertoire `database-system-project/Frontend` et exécutez la ligne de commande :

```
npm start
```

Ouvrez ensuite un navigateur internet, de préférences **Google Chrome**, sur le port `http://localhost:3000/`.

---

## Description de l'application

### Structure de la base de données

La figure suivante, obtenue avec le logiciel **DBeaver**, représente les différentes tables de la base de données.

Les liens entre les tables, les clés primaires et les autres clés sont également représentés.

![Vue de la base de données](database_view.PNG)

La **base de données** est composée de 7 tables.

Les tables **avions** et **compagnies** contiennent les informations relatives aux avions (type d'avion, nombre de place) et aux compagnies aériennes.
Elles sont liées par la table **appareils** qui permet de connaître les avions possédés par chaque compagnie aérienne.

Une table **aeroports** contient les données des aéroports et une table **clients** les données des passagers.

Les vols sont stockés dans une table **vols**. Elle est aux tables **appareils** et **aeroports** et permet ainsi de connaître avec quel appareil (avion et compagnie) le vol sera réalisé, de quel aéroport le vol partira et dans quel aéroport le vol atterira, mais également des informations relatives au prix du billet, au nombre de place disponible et aux horaires de départ et d'arrivée.

Finalement, la table **reservations** fait le lien entre les tables **clients** et **avions** et permet de connaître les vols qu'ont réservé les clients, où les passagers de chaque vols, ainsi que le prix payé par chaque passager.

### L'application

![Demonstration de l'application](giphy.gif)

#### Système de management des données

#### Possibilité de choisir un utilisateur

#### Pour chaque utilisateur, réservation d'un avion, annulation de réservation, etc

# TODO

- rendre les vols complets quand plus de place disponible (menu management et flightsearch)
- faire une page de connection

BDD:

- géré les permissions des utilisateurs : tout pour l'admin, uniquement reservation, vol pour les autres
- ajouter une procédure à la base de donneés
- ajouter un trigger à la base de donneés
