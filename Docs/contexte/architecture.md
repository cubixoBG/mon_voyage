# Architecture

Le dépôt contient deux projets indépendants (chacun a son `package.json`) : l'appli dans [app/](../../app/) et le site dans [site/](../../site/).

## L'appli (`app/`)

Expo SDK 58, React Native 0.88.1 (nouvelle architecture), React 19.3, TypeScript 6. Pas de routeur : la navigation est un simple état dans `App.tsx`.

| Fichier | Rôle |
|---|---|
| `App.tsx` | Navigation par état (`home`, `learn`, `memory`, `parrot`, `sticker`, `passport`, `profile`). Charge le profil, gère la séance (3 activités → autocollant) et le bouton retour Android. Le chargement dure au moins 2 s. |
| `src/data.ts` | Les mots. Une ligne = `[emoji, fr, en, es, de, it]`. `STEPS` = 9 étapes (2 remplies). `wordsFor(step, lang)`, `currentStep(stickers)` (`SESSIONS_PER_STEP = 3`), `pick()`. |
| `src/lang.ts` | Tout ce qui change d'une langue à l'autre (`Pack`) : libellé, drapeau, `voice` (code BCP-47 de la synthèse et de la reconnaissance), textes des jeux, nombres écrits, astuces de prononciation, 12 autocollants. `profile` est un objet global modifié par `App` ; `T()` renvoie le pack de la langue courante. |
| `src/passport.ts` | Stockage local (AsyncStorage) : clé `profile` (prénom + langue), clés `passport.stickers` (anglais, clé historique) et `passport.stickers.<lang>`. |
| `src/score.ts` | Notation tolérante : distance de Levenshtein mot à mot, nombres en chiffres remis en lettres, accents ignorés. Seuils : ≥ 0,85 « great », ≥ 0,5 « almost », sinon « retry ». `hint()` donne une astuce (« th », « h »…). Tests : `score.test.ts`, `data.test.ts` (lancés par `npm test` avec Node, qui lit le TypeScript directement). |
| `src/speech.ts` | **Voix et micro.** `say(text, slow, voice)` : voix Okto en streaming via le relais du site, mise en cache en WAV, avec la voix du téléphone (`expo-speech`) en secours. `listen(expected)` : reconnaissance **sur l'appareil** avec `expo-speech-recognition` (6 s maximum, 5 alternatives). `canListen()` vaut false dans Expo Go. |
| `src/RepeatCard.tsx` | La carte « écouter, répéter » : mot, boutons ronds 🔊 et 🐢 de part et d'autre du micro, retour de l'écureuil, bouton Suivant. |
| `src/screens.tsx` | Écrans `Home` (billets et plan du voyage en ligne de métro), `Learn`, `Parrot`, `Memory` (paires image ↔ mot), `StickerWon`, `Passport` (4 colonnes). |
| `src/welcome.tsx` | `Loading` (animation Lottie de la valise), `Welcome` (prénom et choix de la langue). **Garder cette mise en page** : la version compactée a été refusée. |
| `src/ui.tsx` | Le design system : couleurs `C`, polices `F` (Lexend), `useScale()` (hauteur / 820, bornée entre 0,72 et 1), `Screen` (prop `fill` = sans défilement), `Card`, `Squirrel` (`big`, `compact`), `Button` (`icon`), `Stamp`. |
| `src/Emoji.tsx`, `src/emojiAnims.ts` | Emojis animés, du plus beau au plus simple : Lottie Noto de Google (48 codes, `assets/emoji/*.json`), puis WebP animé Fluent de Microsoft (17 codes, `assets/emoji-fluent/*.webp`, joué par `expo-image`), puis une animation React Native (les drapeaux flottent, le reste se dandine). |
| `src/reminder.ts` | `scheduleDailyReminder(name, 15, 45)` : notification locale quotidienne. |

### Le chemin de la voix (`say`)

```
say(text) ─► cache Paths.cache/okto-<hash(voix+texte)>.wav ? ──oui──► expo-audio joue le fichier
                 │ non
                 ▼
   POST https://langues.morgan-bonne.fr/api/voix   (le site garde la clé Okto)
                 ▼  { url }  adresse WebSocket à usage unique, 60 s
   WebSocket Okto (mode say), gardé ouvert : envoi {type:"say", text, id}
                 ▼  audio_start, morceaux PCM 16 bits mono 24 kHz, audio_end
   assemblage en WAV (toWav) → écriture dans le cache → lecture
```

- Échec (pas de réseau, relais en panne, plus de 15 s) : voix du téléphone, et Okto en pause pendant 60 s.
- Le bouton 🐢 utilise toujours la voix du téléphone : Okto n'a pas de réglage de vitesse.
- Deux appuis rapides sur 🔊 ne déclenchent qu'une génération (map `inflight`).
- La voix Okto est `Kore`. Elle est fixée deux fois : dans `speech.ts` (`OKTO_VOICE`, qui sert au nom du cache) et dans `site/app/api/voix/route.ts`. Les deux doivent rester identiques.

### Pièges propres à l'appli

- `Animated.Text` avec `skewY` rend le texte **invisible sur Android** (nouvelle architecture) : il faut animer un `Animated.View` qui contient le texte.
- `expo-image` n'accepte pas notre `style` d'opacité : on passe une prop `opacity`.
- `expo-dev-client` est installé : pour Expo Go, lancer `npx expo start --go`.

## Le site (`site/`)

Next.js 16.4.5 (Turbopack, `cacheComponents` activé), React 19.3. Déployé sur **langues.morgan-bonne.fr**.

| Chemin | Rôle |
|---|---|
| `app/page.tsx` | La page d'accueil vitrine : présentation, autocollants floutés sauf le premier, crédits « projet scolaire IUT » avec le logo MMI, mention « prochainement hébergée grâce à Oktopod » (l'appli seulement). |
| `app/versions/page.tsx` | Le journal des versions : tableau `VERSIONS`, de la plus récente à la plus ancienne. `status: "current"` = tampon ACTUELLE et bouton de téléchargement (**une seule**), `"next"` = BIENTÔT. |
| `app/telecharger/route.ts` | Envoie le fichier le plus récent de `site/apk/`. |
| `app/api/voix/route.ts` | **Relais voix** : lit `OKTO_VOICE_KEY` et demande un ticket `POST https://voice.okto.it/v1/stream` en mode `say`, voix `Kore`. Limite de 30 demandes par heure et par IP (compteur en mémoire). Renvoie 503 si la clé manque. |
| `app/chrome.tsx` | `Nav` (logo `public/logo.svg`, liens Versions et Télécharger) et `Footer` (crédits Noto CC BY 4.0 et Fluent MIT). |
| `app/effects.tsx` | `Emoji` (Lottie Noto chargé avec `lottie-web` en import dynamique pour éviter un crash au rendu serveur, puis WebP Fluent, puis CSS), `RevealOnScroll`, `HelloCycle`, `Suitcase`. |
| `app/icon.svg` | Le favicon (la valise). |
| `apk/mon-voyage.apk` | L'APK proposé au téléchargement (84 Mo, suivi par Git). |

## L'intégration continue

[.gitlab-ci.yml](../../.gitlab-ci.yml), image `node:24` : `app:check` (typecheck et tests, quand `app/` change) et `site:build` (tsc et `next build`, quand `site/` change), sur `dev`, sur `main` et sur les merge requests. Il n'a pas encore tourné, faute de dépôt GitLab.
