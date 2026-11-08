# Mon voyage : appli Expo pour apprendre une langue à l'oral + site vitrine Next.js

Projet BUT MMI (IUT du Puy-en-Velay) de **BONNE Morgan**. L'appli est dans `app/` (Expo SDK 58), le site dans `site/` (Next.js 16, en ligne sur langues.morgan-bonne.fr). Le contexte complet est importé ci-dessous. Les décisions sont dans `Docs/ADR/`, l'historique et les pièges dans `Docs/contexte/historique.md`.

@Docs/context.md
@Docs/contexte/architecture.md
@Docs/contexte/exploitation.md

# Préférences de Morgan (à respecter)

- Réponds **en français**. Morgan écrit vite et de façon familière (« stp », « ma poule ») ; un ton détendu et direct convient.
- **Ne commite jamais sans qu'on te le demande.** Avant toute opération Git, suis le skill `workflow-git`. Rien ne va sur `main` sans un accord explicite pour cette opération.
- **Numéros de version** : c'est Morgan qui les choisit. Ne les invente pas. Quand l'APK de `site/apk` change, suis le skill `maj-apk-site` et **demande quelle version marquer « actuelle »**.
- **Mise en ligne du site** : n'envoie que le site, et seulement l'essentiel (procédure dans `exploitation.md`).
- **Changement visuel important** (logo, charte) : **montre avant d'appliquer** (aperçu, choix entre plusieurs propositions).
- Mises en page : **tout tient sur un écran, sans défilement**. Garde la mise en page de l'écran d'accueil telle qu'elle est.
- Crédits : Oktopod hébergera **l'appli** « prochainement, grâce à Oktopod ». Le site n'est pas hébergé par Oktopod.
- **Secrets** : jamais dans le code ni dans l'APK. Tu n'as pas le droit de les écrire dans un coffre (EAS, Hostinger) : donne à Morgan l'endroit exact où les mettre.
- **Services externes** (Okto, Hostinger, EAS) : ne lance pas de requêtes en rafale. Ne relance pas un déploiement pendant qu'un build tourne.
- Avant un build ou une mise à jour à distance : si un module natif a changé, il faut une nouvelle version et un nouveau build, **jamais une mise à jour à distance**.
- Tiens `Docs/` à jour quand une décision, une procédure ou un état change (ADR dans `Docs/ADR/`, au format du skill `proposition-idees`).

# Hooks du projet (`.claude/settings.json`)

- `SessionStart` → `.claude/hooks/session-start.mjs` : branche, fichiers non commités, version et projet EAS, derniers commits.
- `PreToolUse` → `.claude/hooks/garde.mjs` : demande confirmation pour Git sur `main`, refuse les push forcés sur `main` et `dev`, refuse l'écriture d'une vraie clé Okto. Test : `node .claude/hooks/garde.test.mjs`.

# Vérifications usuelles

- Appli : `cd app && npx tsc --noEmit && npm test`
- Site : `cd site && npx tsc --noEmit && npm run build`

# Règles de travail

Utilise des sous-agents quand ils permettent de séparer le contexte ou de lancer des tâches indépendantes en parallèle. Travaille directement pour les modifications simples, les étapes séquentielles et les tâches qui exigent de garder le même contexte.

## Routage des modèles
- `fable` : architecture, stratégie ambiguë, bugs complexes et revue finale
- `opus` : implémentations complexes, développements multi-fichiers et refactorisations
- `sonnet` : modifications simples, tests, documentation, SEO technique et commits
- `haiku` : recherches rapides, inventaires et résumés
- Passe `model` à chaque appel Agent

## Délégation
- Planifie avant de déléguer
- L'agent principal garde la responsabilité du plan, des décisions finales et de l'intégration
- Lance en parallèle uniquement les tâches réellement indépendantes
- Ne délègue pas en parallèle des modifications qui touchent les mêmes fichiers ou le même système
- Consulte directement les fichiers, références et captures quand la décision en dépend
- Utilise les rapports pour résumer un travail isolé, pas pour remplacer les sources essentielles
