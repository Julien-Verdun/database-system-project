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

---

## Lancement local de l'application

Afin de lancer en local la partie front-end de l'application, ouvrez un invité de commande, placez-vous au niveau du répertoire `database-system-project/Frontend` et exécutez la ligne de commande :

```
npm start
```

Ouvrez ensuite un navigateur internet, de préférences **Google Chrome**, sur le port `http://localhost:3000/`.

Réalisez la même opération dans le répertoire `database-system-project/Backend` afin de lancer le serveur Back-end. Le serveur NodeJS écoute sur le port 8080.

---

## Description de l'application

Description technique de l'application, quelles sont les possibilité, les requêtes réalises, suppression, ajout, modification, etc **\*\*\*\***\*\***\*\*\*\***

### Structure de la base de données

Tables :

- vols (id_vol,id_app, date_depart, heure_depart, date_arrivee, heure_arrivee, id_aer_dep, id_aer_arr, prix, place_libre)
- appareils (id_app, id_cmp, id_avn)
- avions (id_avn, type, nb_place)
- compagnies (id_cmp, nom, code)
- aeroports (id_aer, nom, code, ville, pays)
- clients (id_cli, nom, prenom, mail, telephone)
- reservations (id_res, id_cli, id_vol, prix, quantite)

[inserer un schema UML]

Vols :

- id_vol
- id_app
- date_depart
- heure_depart
- date_arrivee
- heure_arrive
- id_aer_dep
- id_aer_arr
- duree
- prix
- place_libre

Appareils :

- id_app
- id_cmp
- id_avn

Avions :

- id_avn
- type
- nb_place

Compagnies :

- id_cmp
- nom
- code

Aeroports :

- id_aer
- nom
- code
- ville
- Pays

Clients :

- id_cli
- nom
- prenom
- mail
- telephone

Reservations :

- id_res
- id_cli
- id_vol
- prix
- quantite
