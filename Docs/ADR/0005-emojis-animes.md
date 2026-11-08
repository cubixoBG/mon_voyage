# 0005. Emojis animés : Noto Lottie, puis Fluent WebP, puis une animation maison

- **Date** : 2026-11-04
- **Statut** : Acceptée
- **Source** : demandes de Morgan (« des emojis plus jolis », « tous les emojis animés », « go pour Microsoft »)

## Contexte
Les emojis système diffèrent d'un téléphone à l'autre et sont figés. Morgan veut que tous bougent, sur l'appli comme sur le site.

## Décision
Pour chaque emoji, on prend la première source disponible :
1. **Noto Emoji Animation** de Google, en Lottie (48 codes, licence CC BY 4.0) ;
2. **Fluent Emoji** animé de Microsoft, en WebP animé (17 codes, licence MIT, joué par `expo-image` dans l'appli) ;
3. une animation maison : les drapeaux flottent (`rotateY` et `scaleY`), le reste se dandine, sur un `Animated.View`.

Le site utilise les mêmes fichiers et le même ordre (`site/app/effects.tsx`).

## Conséquences
- **Positives** : un rendu identique partout ; tout bouge ; les crédits sont dans le pied de page du site et dans le README.
- **Négatives / risques** : des fichiers en plus dans l'APK ; un nouvel emoji doit être cherché chez Noto, puis chez Fluent.

## Alternatives écartées
- Des Lottie faits à la main : trop long et moins beau.
- `Animated.Text` avec `skewY` : texte invisible sur Android avec la nouvelle architecture.
