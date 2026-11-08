# 0006. Site vitrine Next.js sur Hostinger, déployé à la main avec le strict nécessaire

- **Date** : 2026-11-04
- **Statut** : Acceptée
- **Source** : demandes de Morgan (landing page, « mets que le site et l'essentiel pas plus »)

## Contexte
Il faut une page pour présenter l'appli et télécharger l'APK, et un endroit où publier le journal des versions. Morgan a un hébergement Hostinger avec Node.js.

## Décision
Next.js 16 dans `site/`, publié sur `langues.morgan-bonne.fr`. Le déploiement passe par le MCP Hostinger (`hosting_deploy`) à partir d'un dossier `deploy-langues/` qui ne contient que l'essentiel (voir `Docs/contexte/exploitation.md`). `/telecharger` envoie l'APK le plus récent de `site/apk/`. `/versions` affiche le tableau `VERSIONS`. Quand l'APK change, on suit le skill `maj-apk-site`.

## Conséquences
- **Positives** : le site sert aussi de serveur pour le relais voix (ADR 0004) ; on contrôle ce qui est envoyé.
- **Négatives / risques** : déploiement manuel ; l'APK de 84 Mo est suivi par Git (le dépôt grossit) ; le déploiement automatique par Git de Hostinger pointe vers une branche morte.

## Alternatives écartées
- Vercel ou Netlify : Morgan voulait utiliser son Hostinger.
- Déployer tout le dépôt : refusé par Morgan.
