# AtlanticBike Mockup

Ce dossier contient le site statique de démonstration AtlanticBike prêt pour GitHub Pages.

Entrée principale: [Mockup/index.html](/Users/Tim/Desktop/all/dev/Pro/atlanticbike/New-atlanticBike/atlanticbike-frontend/Mockup/index.html)

Structure de démo:
- `accueil` sert de landing page publique.
- `Vélos`, `location-vélo`, `services`, `Cartes`, `contact` servent de hubs publics.
- `vélos-electriques`, `vélos-enfants`, `vélos tandem`, `vélos-occasions` prolongent le parcours catalogue.
- `detail-VAE`, `detail-vélos-occasions`, `Detail-VTT-VTC` servent de pages détail.
- `connexion` ouvre le parcours admin vers `admin-pages`, `Admin-location`, `Admin-reparation`, `Ajout-vélo`.

Déploiement:
- Le workflow publie directement `atlanticbike-frontend/Mockup` sur GitHub Pages.
- Le fichier `.nojekyll` force un déploiement statique direct.
- Dans les réglages GitHub Pages du dépôt, sélectionner `GitHub Actions` comme source de publication.
