# 0004. La clé Okto reste sur le serveur : relais `/api/voix` du site

- **Date** : 2026-11-06
- **Statut** : Acceptée
- **Source** : demande de Morgan (« fais un truc sécurisé »)

## Contexte
Une clé mise dans l'appli (`EXPO_PUBLIC_*`) se récupère dans l'APK, et n'importe qui pourrait alors dépenser le crédit Okto. Le site Next.js est déjà en ligne sur Hostinger.

## Décision
La route `site/app/api/voix/route.ts` lit `OKTO_VOICE_KEY`, une variable d'environnement de Hostinger. Elle demande à Okto un ticket WebSocket `mode=say` (voix `Kore`), à usage unique et valable 60 s, et ne renvoie que son `url`. Elle limite à 30 demandes par heure et par IP. L'appli ne contient aucune clé.

## Conséquences
- **Positives** : aucun secret dans l'APK ; la clé peut changer sans nouveau build ; la voix est fixée côté serveur.
- **Négatives / risques** : la voix dépend aussi du site (s'il tombe, l'appli prend la voix du téléphone) ; le compteur en mémoire repart de zéro au redémarrage ; un ticket permet tout de même d'envoyer du texte libre pendant sa session (le plafond Okto de 30 min/jour limite les dégâts).

## Alternatives écartées
- Clé dans l'appli (le prototype du 2026-11-06) : extractible.
- Jeton propre à l'appli dans un en-tête : extractible lui aussi, donc ne protège rien de plus.
