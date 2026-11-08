# Contexte du projet : Mon voyage

> Point d'entrée pour une nouvelle session. Mis à jour le 2026-11-08.
> Détails : [architecture](contexte/architecture.md) · [exploitation](contexte/exploitation.md) (builds, déploiements, services, comptes) · [historique](contexte/historique.md) (versions, pièges déjà rencontrés) · [décisions (ADR)](ADR/).

## Le produit

- **Mon voyage** (anciennement « Mon voyage en Angleterre ») : une appli mobile Expo / React Native pour apprendre une langue **à l'oral** avant un séjour à l'étranger.
- **Pour qui** : au départ, une élève de CM2 (10-11 ans), débutante complète, qui part dans une famille en Angleterre. Le client est réel.
- **Cadre** : projet BUT MMI, IUT du Puy-en-Velay. Développeur : **BONNE Morgan** (GitHub `cubixoBG`, e-mail `cubixo2302@gmail.com`).
- **Hébergement** : l'**appli** sera « prochainement hébergée grâce à Oktopod » (l'agence est propriétaire du projet Expo). Le **site** n'est pas hébergé par Oktopod : il est sur le Hostinger de Morgan.
- **Langues** : anglais, espagnol, allemand, italien. L'enfant choisit au premier lancement, avec son prénom. Chaque langue a sa voix, ses mots, ses autocollants et son passeport.

## Le principe pédagogique

- Un **écureuil roux** compagnon dit le mot, l'enfant répète, et l'écureuil donne un retour **toujours positif** (« Presque ! », « Encore une fois ? », jamais « faux »).
- Une **séance** = 3 activités : *Écouter et répéter* (learn), *Memory* (memory), *Le perroquet* (parrot). Séance finie → **1 autocollant** dans le **passeport**.
- **Le voyage** : 9 étapes (Les présentations, L'aéroport, La famille, À table, La journée, Sortir, Jouer, Les urgences, La culture). **Seules les 2 premières ont des mots** (20 chacune). On change d'étape tous les 3 autocollants. On peut réviser une étape passée, sans gagner d'autocollant.
- Rappel quotidien par notification à 15 h 45, avec le prénom.

## Où on en est (2026-11-08)

- **Version courante du code : 1.2.0** (« Une vraie voix pour l'écureuil ») : voix IA Okto en streaming, via le relais du site. Sur le site, elle est marquée « BIENTÔT ». La version « ACTUELLE » téléchargeable reste la **1.1.2**.
- **Package** : `fr.morganbonne.monvoyage`. Projet Expo **`@oktopod/monvoyage`** (`d216eef1-5d85-41d0-9776-688cde40354b`). L'ancien projet a été supprimé (voir [ADR 0009](ADR/0009-package-et-projet-expo.md)).
- **Builds** : un build Android production (AAB) a été lancé le 2026-11-06 ; sa réussite n'a pas été vérifiée. Le build iOS demande une connexion Apple interactive : c'est à Morgan de le lancer. Les stores ne sont pas configurés (pas de `submit`).
- **Voix** : il faut la variable `OKTO_VOICE_KEY` sur Hostinger. Le 2026-11-06, `/api/voix` répondait encore 503 « Voix non configurée » : à vérifier avant tout test.
- **Git** : le travail se fait sur `dev`. Le dépôt GitHub s'appelle `cubixoBG/mon_voyage` (renommé depuis `Appli_anglais_kid` ; le dossier local garde l'ancien nom). GitLab est prévu mais pas encore créé ; [.gitlab-ci.yml](../.gitlab-ci.yml) est prêt.

## Ce qui reste à faire (idées du cahier des charges, pas encore faites)

- Les étapes 3 à 9 (mots à écrire dans `app/src/data.ts`, pour les 4 langues).
- Les autres jeux : Simon says, Le chef anglais, Valise à faire, Cherche dans la maison, Chanson karaoké, Défi du jour.
- L'espace parents : suivi du temps et des mots difficiles, phrases de survie imprimables, durée de séance réglable (5, 10, 15 ou 20 min).
- Les mini-conversations jouées (l'IA joue la mère d'accueil). Okto n'a pas d'API de texte : il faudrait un LLM, appelé par le relais du site.
- La publication sur les stores : politique de confidentialité, fiche, captures, règles « Familles » (Google) et catégorie « Enfants » (Apple).

## Règles produit à respecter

- **Données d'enfants (RGPD)** : pas de compte, pas d'enregistrement de la voix. La reconnaissance se fait sur le téléphone. Seuls le prénom, la langue et les autocollants sont stockés, localement. Le texte à dire part chez Okto (moteur Gemini, sans rétention).
- Retours bienveillants, notation tolérante (les voix d'enfants sont mal reconnues).
- Gros boutons, peu de texte, une action principale par écran, **tout tient sur un écran sans défiler**, police Lexend.
- Sous-titres en français sous chaque phrase dans la langue apprise.
