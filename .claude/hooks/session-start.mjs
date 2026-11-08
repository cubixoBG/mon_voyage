// Hook SessionStart : donne à Claude l'état réel du dépôt au début de chaque session (le contexte stable est dans CLAUDE.md et Docs/).
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const run = (c) => {
  try {
    return execSync(c, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '?';
  }
};

let app = {};
try {
  app = JSON.parse(readFileSync(join(root, 'app', 'app.json'), 'utf8')).expo ?? {};
} catch {}

const changes = run('git status --short');
console.log(
  [
    'État du dépôt Mon voyage (hook SessionStart) :',
    `- Branche : ${run('git branch --show-current')} ; fichiers non commités : ${changes ? changes.split('\n').length : 0}`,
    `- Appli : version ${app.version ?? '?'}, package ${app.android?.package ?? '?'}, projet EAS ${app.extra?.eas?.projectId ?? '?'} (owner ${app.owner ?? '?'})`,
    `- Derniers commits :\n${run('git log --oneline -5').replace(/^/gm, '    ')}`,
    'Contexte complet : Docs/context.md, Docs/contexte/*.md, décisions : Docs/ADR/. Les mettre à jour quand une décision ou une procédure change.',
  ].join('\n'),
);
