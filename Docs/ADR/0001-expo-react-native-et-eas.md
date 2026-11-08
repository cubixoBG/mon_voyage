# 0001. Appli en Expo / React Native, construite avec EAS

- **Date** : 2026-11-04
- **Statut** : Acceptée
- **Source** : reconstitué à partir des sessions de travail (cahier des charges, MVP)

## Contexte
L'appli doit tourner sur tablette et téléphone, sous iOS et Android, et être livrée vite par un seul développeur. Elle a besoin du micro, de la synthèse vocale et d'animations.

## Décision
Expo SDK 58 (React Native 0.88, nouvelle architecture), en TypeScript. Les builds et les mises à jour à distance passent par EAS. La navigation est un simple état dans `App.tsx` (7 écrans), sans Expo Router. Les données restent sur l'appareil, dans AsyncStorage.

## Conséquences
- **Positives** : un seul code pour iOS et Android ; Expo Go pour tester ; corrections JavaScript publiées sans nouveau build.
- **Négatives / risques** : les modules natifs (reconnaissance vocale, audio) ne marchent pas tous dans Expo Go ; chaque ajout natif impose un nouveau build et une nouvelle version (voir 0009) ; la navigation par état sera à revoir si l'appli grossit.

## Alternatives écartées
- Applis natives séparées (Swift / Kotlin) : deux fois le travail.
- Flutter : moins connu de l'équipe, et sans l'écosystème Expo.
