# nw-groupe

**Contexte**
- J'ai immaginé une API qui pourrait permettre à un opérateur de connaître la liste de ses clients, des batteries, et quel client aurait en location une ou des batteries.

**Objectif**

- API permettant des opérations CRUD

- Ce rendu nous met à la place d'un administrateur pour la gestion des clients inscrits et de leurs données (données de compte, batteries qu'ils possèdent)
- La suite pourrait être de developper une partie ouverte afin de délester la charge de travail de l'administrateur (automatiser les locations et donc les update par exemple)

**Avant de lancer le projet : **
- Cloner le repository
- Effectuer un npm i pour installer les dépendances
- Créer une base de données PostgreSQL
- Selon les besoins, modifier la configuration de la base dans le fichier 'config/db.config.js'

**Au lancement du projet**
- Effectuer un npm start pour lancer le projet
- Les tables de la base sont créés au démarrage du serveur

**Tester les appels**
- Depuis Postman, plusieurs routes sont accessibles

**Dans le dossier "routes"**
- Un fichier 'route.js' qui centralise le découpage de toutes les routes en fichiers spécifiques
- Un fichier 'user.route.js' où sont placées les routes qui tiennent du model User
- Un fichier 'battery.route.js' où sont placées les routes qui tiennent du model Battery

**Pour accéder aux routes**
Dans Postman, se placer à la racine **http://localhost:5000/api**
- **http://localhost:5000/api/user** pour l'accès aux routes User 
- **http://localhost:5000/api/battery** pour l'accès aux routes Battery

**IMPORTANT**
- Lors de la création du premier USER. Modifier son rôle en base dans la table "user" de "USER" à "ADMIN"

**Exemple de JSON pour l'ajout d'un utilisateur**
{
    "lastname":"Martin",
    "firstname": "Bernard",
    "birthdate": "10/02/1996",
    "email": "test@gmail.com",
    "password": "123456789",
    "phoneNumber": "0761362490"
}

**Exemple de JSON pour l'ajout d'une batterie**
{
    "name":"Batterie 418",
    "city": "Annecy",
    "UserId" : 5
}
