# 0007. Quatre langues, un pack par langue, un passeport par langue

- **Date** : 2026-11-04
- **Statut** : Acceptée
- **Source** : version 1.1.0

## Contexte
L'appli était pensée pour l'anglais seulement (« Mon voyage en Angleterre »). D'autres enfants partent en Espagne, en Allemagne ou en Italie.

## Décision
- `data.ts` : une ligne de mots par sens, avec une colonne par langue (`en`, `es`, `de`, `it`), et les sous-titres en français.
- `lang.ts` : un `Pack` par langue (voix BCP-47, textes des jeux, nombres écrits pour la notation, astuces, 12 autocollants, couverture du passeport).
- Au premier lancement, on choisit son prénom et sa langue (`Welcome`).
- Chaque langue a son propre compteur d'autocollants. L'anglais garde l'ancienne clé `passport.stickers`, pour ne pas perdre ce qui avait déjà été gagné.
- L'appli s'appelle « Mon voyage ».

## Conséquences
- **Positives** : ajouter une langue, c'est ajouter une colonne et un pack.
- **Négatives / risques** : chaque nouvelle étape demande des mots dans les 4 langues ; seul l'anglais a des astuces de prononciation complètes.

## Alternatives écartées
- Une appli par langue : trop de maintenance.
- L'elfique (évoqué en plaisantant) : abandonné.
