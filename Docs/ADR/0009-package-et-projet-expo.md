# 0009. Package `fr.morganbonne.monvoyage`, projet `@oktopod/monvoyage`, versions liées aux mises à jour

- **Date** : 2026-11-06
- **Statut** : Acceptée
- **Source** : décisions de Morgan (transfert à Oktopod, nouveau package, ancien projet supprimé)

## Contexte
Le projet Expo est passé de `@morganbos-team` à l'équipe `oktopod` (`@oktopod/applianglaiskid`, ID `779f89fb…`), puis il a été supprimé. Le package `com.cubixobg.monvoyage` ne convenait plus pour les stores.

## Décision
- Nouveau projet `@oktopod/monvoyage` (ID `d216eef1-5d85-41d0-9776-688cde40354b`), slug `monvoyage`, `owner: oktopod`.
- Package Android et bundle iOS : `fr.morganbonne.monvoyage`.
- `runtimeVersion.policy = appVersion` : chaque version ne reçoit que les mises à jour à distance de son propre numéro. **Tout changement natif impose une nouvelle version et un nouveau build.**
- La 1.2.0 est la première version de ce projet.

## Conséquences
- **Positives** : un identifiant propre pour Google Play et l'App Store ; une mise à jour à distance ne peut pas casser un APK d'une autre version.
- **Négatives / risques** : les APK 1.0 à 1.1.2 ne reçoivent plus rien ; la 1.2.0 s'installe à côté de l'ancienne appli (progression perdue) ; nouvelles clés de signature ; Morgan n'est que Developer chez `oktopod`.

## Alternatives écartées
- Garder `com.cubixobg.monvoyage` : refusé par Morgan.
- Une politique `fingerprint` : moins lisible pour Morgan, qui raisonne en numéros de version.
