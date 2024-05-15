# Restaurant Management System

Ce projet est un système de gestion de restaurant développé en utilisant Node.js, Express.js, Prisma ORM, EJS (Embedded JavaScript) pour le moteur de templating, et plusieurs autres packages Node.js.

## Fonctionnalités

- **Gestion des Repas (Repas) :** Les utilisateurs peuvent consulter une liste de repas disponibles au restaurant.
- **Gestion des Employés :** Les utilisateurs peuvent consulter une liste des chefs et du personnel du restaurant.
- **Réservation de Table :** Les clients peuvent effectuer une réservation de table pour une date et une heure spécifiques.
- **Envoi de Mail :** Le système envoie des e-mails de confirmation de réservation aux clients.
- **Pages d'Information :** Les utilisateurs peuvent également accéder à des pages d'information sur le restaurant, y compris l'emplacement et les détails.

## Technologies Utilisées

- **Node.js et Express.js :** Pour le développement du backend de l'application et le routage des requêtes HTTP.
- **Prisma :** Pour l'interaction avec la base de données MySQL via un ORM (Object-Relational Mapping).
- **EJS (Embedded JavaScript) :** Pour la génération dynamique du contenu HTML côté serveur.
- **Dotenv :** Pour la gestion des variables d'environnement.
- **Moment :** Pour la manipulation des dates et heures dans l'application.
- **Multer :** Pour la gestion des téléchargements de fichiers (upload de photos, etc.).
- **Joi :** Pour la validation des données provenant des requêtes utilisateur.
- **Nodemailer :** Pour l'envoi d'e-mails de confirmation de réservation.

## Configuration Requise

- Node.js et npm doivent être installés localement.
- Une base de données MySQL doit être configurée et accessible.

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Exécutez `npm install` pour installer les dépendances.
3. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement nécessaires.

## Lancement de l'Application

- Exécutez `npm start` pour lancer le serveur.
- Accédez à l'application dans votre navigateur en visitant `http://localhost:1600`.
