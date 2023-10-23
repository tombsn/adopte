# Adopte

**Point de situation**
- Un utilisateur peut se créer un compte
- Un utilisateur peut se créer un compte
- Un Cron vérifie les dates d'abonnements
- L'admin peut lister ses utilisateurs et les achats

**A Faire par la suite**
- Mettre en place l'api externe pour lier les achats et le paiment réel
- Un Front pour lister les Users et leurs achats facilement
- Un Front afin de vérifier le CA facilement

**Avant de lancer le projet : **
- Cloner le repository
- Effectuer un npm i pour installer les dépendances
- Selon les besoins, modifier la configuration de la base dans le fichier 'config/db.config.js'

**Au lancement du projet**
- Effectuer un npm start pour lancer le projet
- Les tables de la base sont créés au démarrage du serveur

**Tester les appels**
- Depuis Postman, plusieurs routes sont accessibles

**Dans le dossier "routes"**
- Un fichier 'route.js' qui centralise le découpage de toutes les routes en fichiers spécifiques
- Un fichier 'user.route.js' où sont placées les routes qui tiennent du model User
- Un fichier 'transaction.route.js' où sont placées les routes qui tiennent du model Transaction

**Pour accéder aux routes**
Dans Postman, se placer à la racine **http://localhost:5000/api**
- **http://localhost:5000/api/user** pour l'accès aux routes User 
- **http://localhost:5000/api/transaction** pour l'accès aux routes Transaction

**Route "principales"**
- **http://localhost:5000/api/transaction/total-sum** en GET pour l'accès aux routes Transaction en tant qu'admin avec le json suivant :
      {
          "start_date" : "2023-08-14",
          "end_date" : "2023-10-23"
      }

- Une vérification de l'administration étant en place, veuillez copier le token reçu lors de la connexion et le mettre en Bearer Auth sur Postman pour les routes concernées.

**IMPORTANT**
- Lors de la création du premier USER. Modifier son rôle en base dans la table "user" de "USER" à "ADMIN"

**Exemple de JSON pour l'ajout d'un utilisateur**
{
    "lastname":"Martin",
    "firstname": "Bernard",
    "birthdate": "10/02/1996",
    "email": "test@gmail.com",
    "password": "123456789",
    "cvv": "354",
    "card_number": "1234567891234567"
}

**Exemple de JSON pour l'ajout d'une transaction**
- Se connecter via Postman puis meffectuer le JSON suivant :
{
    "amount": float,
    "type_subscription: "15" / "30" / "45"
}

**SUM Total des transactions**

