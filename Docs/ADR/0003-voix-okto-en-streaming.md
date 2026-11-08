# 0003. Voix de l'écureuil : Okto Voice en streaming, avec un cache

- **Date** : 2026-11-06
- **Statut** : Acceptée
- **Source** : reconstitué à partir des sessions de travail (mesures de latence du 2026-11-06)

## Contexte
La voix du téléphone (`expo-speech`) sonne robotique. Oktopod propose Okto Voice (Gemini). `POST /v1/say` met 2,3 à 4 s avant de répondre, ce qui est trop long pour un enfant qui appuie sur 🔊.

## Décision
- Utiliser la WebSocket `/v1/stream?mode=say` : environ 1,1 s jusqu'au premier son. La connexion reste ouverte entre deux phrases.
- Assembler les morceaux PCM en WAV, puis le jouer avec `expo-audio` (pas de lecture morceau par morceau, qui demanderait une librairie native de plus).
- **Garder chaque phrase en cache** (`Paths.cache/okto-<hash>.wav`) : une seule génération, payée une seule fois.
- Voix du téléphone en secours (erreur, pas de réseau, plus de 15 s d'attente), puis 60 s de pause avant de retenter Okto. Le bouton 🐢 garde la voix du téléphone.

## Conséquences
- **Positives** : une voix naturelle ; instantanée dès la deuxième écoute ; marche hors ligne pour les phrases déjà entendues ; coût minime (0,04 €/min de voix).
- **Négatives / risques** : la première écoute prend 1,3 à 2 s ; dépendance à un service jeune (sa doc et ses formules ont changé pendant le projet) ; plafond de 30 min par jour et par clé ; le texte part chez Google (sans rétention).

## Alternatives écartées
- `POST /v1/say` : 2 à 4 s à chaque nouvelle phrase.
- Générer tous les audios au moment du build et les mettre dans l'APK : aucune attente, mais un APK plus lourd d'environ 10 Mo et un script à relancer à chaque nouveau mot. Reste une piste.
- Pré-générer les phrases au choix de la langue : proposé, pas encore fait.
- Lecture morceau par morceau (`react-native-audio-api`) : ne gagne que 0,2 à 0,9 s, pour une dépendance native de plus.
