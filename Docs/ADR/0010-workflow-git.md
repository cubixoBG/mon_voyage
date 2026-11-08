# 0010. Workflow Git : main ← dev ← branches de travail

- **Date** : 2026-11-04
- **Statut** : Acceptée
- **Source** : skill `.claude/skills/workflow-git`

## Contexte
`main` doit rester une version stable à montrer (démo, client). Plusieurs sessions de Claude Code travaillent sur le dépôt.

## Décision
- Chaque tâche a sa branche de travail, créée depuis `dev` et fusionnée dans `dev` avec `--no-ff`.
- `dev` ne va dans `main` que pour une étape importante, **avec l'accord explicite de Morgan pour cette opération précise**.
- Pas de `push --force` sur `main` ni sur `dev`.
- **Claude ne commite que si Morgan le demande.**
- Le hook `.claude/hooks/garde.mjs` demande une confirmation avant toute opération Git sur `main`, et refuse les push forcés sur `main` et `dev`.

## Conséquences
- **Positives** : `main` reste toujours présentable ; l'historique de `dev` montre chaque tâche.
- **Négatives / risques** : il y a plus d'étapes ; la branche `Version1` utilisée autrefois a été supprimée (le déploiement automatique de Hostinger pointe encore dessus).

## Alternatives écartées
- Tout faire sur `main` : trop risqué avant une démo.
