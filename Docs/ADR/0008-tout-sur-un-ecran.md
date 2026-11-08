# 0008. Tout tient sur un écran, sans défilement

- **Date** : 2026-11-05
- **Statut** : Acceptée
- **Source** : demande de Morgan (« éviter le plus possible le scroll »), version 1.1.1

## Contexte
Un enfant de 10 ans ne doit pas chercher un bouton caché en bas de l'écran. Les mini-jeux débordaient sur les petits téléphones.

## Décision
`useScale()` (dans `ui.tsx`) calcule un facteur (hauteur ÷ 820, borné entre 0,72 et 1) qui règle les tailles. `Screen fill` donne un écran sans défilement. Le Memory calcule la hauteur de ses cartes à partir de l'écran. Écouter et Lentement sont deux boutons ronds de part et d'autre du micro.

## Conséquences
- **Positives** : une action principale toujours visible, sur tous les téléphones.
- **Négatives / risques** : il faut vérifier chaque nouvel écran sur un petit téléphone. L'écran d'accueil (`Welcome`) garde sa mise en page d'origine : la version compactée a été refusée, on n'y a réduit que les cartes de langues.

## Alternatives écartées
- Des écrans qui défilent : refusé.
