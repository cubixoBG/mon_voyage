# Historique

## Les versions

La source affichée sur le site est `site/app/versions/page.tsx`. Les numéros sont **choisis par Morgan** : ne pas les deviner (il a préféré 1.1.2 à 1.1.1, puis 1.2.0 à 1.1.3).

| Version | Date | Contenu | Statut sur le site |
|---|---|---|---|
| Prototypes | avant le 4 nov. 2026 | maquettes | — |
| 1.0.0 | 4 nov. 2026 | premier APK, anglais seulement, 2 étapes de 20 mots | — |
| 1.1.0 | 4 nov. 2026 | 4 langues, prénom, emojis animés, écran de chargement Lottie | — |
| 1.1.1 | 5 nov. 2026 | tout tient sur l'écran (`useScale`), bouton de test des notifications retiré | — |
| 1.1.2 | 5 nov. 2026 | nouveau logo (la valise rouge), nom « Mon voyage », nouvelle icône | **ACTUELLE** (APK sur le site) |
| 1.2.0 | à venir | voix IA Okto en streaming via le relais du site, nouveau package `fr.morganbonne.monvoyage` | BIENTÔT |

Les APK 1.0 à 1.1.2 (package `com.cubixobg.monvoyage`, ancien projet Expo supprimé) ne reçoivent plus de mises à jour à distance. La 1.2.0 s'installe **à côté** d'eux, et non par-dessus : la progression repart de zéro.

## Les grandes étapes

1. Cahier des charges, puis MVP Expo : l'écureuil, l'étape « Les présentations », Écouter et répéter, Memory, Perroquet, autocollants et passeport.
2. Étape « L'aéroport », notation tolérante, rappel quotidien.
3. 4 langues, prénom, un passeport par langue.
4. Emojis animés (Noto Lottie, puis Fluent WebP), sur l'appli comme sur le site.
5. Site vitrine Next.js, page des versions, route de téléchargement, mise en ligne sur Hostinger.
6. Mise en page sans défilement, nouveau logo, nouveau nom.
7. Projet Expo transféré à l'équipe `oktopod`, puis supprimé et recréé (`@oktopod/monvoyage`), package renommé.
8. Voix Okto : `/v1/say` (trop lent), puis le streaming `mode=say`, puis le relais sur le site pour ne plus mettre la clé dans l'APK.
9. Pipeline GitLab CI, dépôt GitHub renommé `mon_voyage`.

## Pièges déjà rencontrés (ne pas les refaire)

- Lottie écrit à la main : les images-clés à une dimension doivent être des tableaux (`[x]`).
- `lottie-web` plante au rendu serveur de Next : il faut un import dynamique.
- Les fichiers Fluent du dépôt GitHub sont des pointeurs Git LFS : les télécharger depuis `media.githubusercontent.com`, puis les convertir en WebP avec `ffmpeg-static`.
- Écrire un script dans un heredoc du shell pose des problèmes de guillemets : utiliser l'outil Write.
- Une mise à jour à distance envoyée avec une version égale à celle d'anciens APK risque de les atteindre : monter la version.
- `expo-file-system` : `file.create()` puis **`await file.write(bytes)`** avant de jouer le fichier.
- Hostinger : deux déploiements à la suite → le second échoue.
- Okto : le pare-feu bloque l'IP après des requêtes en rafale.
- Morgan a refusé la version compactée de l'écran d'accueil (« remets comme avant ») : on ne réduit que les cartes de langues.
