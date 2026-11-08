# 0002. Reconnaissance vocale sur le téléphone, notation tolérante

- **Date** : 2026-11-04
- **Statut** : Acceptée
- **Source** : reconstitué à partir des sessions de travail

## Contexte
La voix d'une enfant est une donnée personnelle (RGPD, mineure). Les moteurs reconnaissent mal les voix d'enfants. L'appli doit pourtant dire si le mot a été bien prononcé.

## Décision
`expo-speech-recognition` fonctionne sur l'appareil : on donne le mot attendu en `contextualStrings`, on demande 5 alternatives, et l'écoute s'arrête après 6 s. **Aucun audio n'est envoyé ni stocké** : le texte reconnu est utilisé puis oublié. La notation (`score.ts`) est tolérante : distance mot à mot, nombres et accents normalisés, seuils 0,85 et 0,5, retour toujours positif avec une astuce sur les sons difficiles. Dans Expo Go, où le module n'existe pas, le bouton devient « J'ai répété ! ».

## Conséquences
- **Positives** : gratuit, rien ne quitte le téléphone, fonctionne hors connexion selon le téléphone.
- **Négatives / risques** : la qualité varie selon le téléphone ; ce n'est pas une vraie évaluation phonétique.

## Alternatives écartées
- Azure Pronunciation Assessment : plus précis, mais payant et la voix part sur un serveur.
- `POST /v1/transcribe` et la WebSocket d'Okto : payants (0,02 €/min) et la voix part sur un serveur.
