// Hook PreToolUse : garde-fous du projet (voir Docs/ADR/0010 et 0004).
// - Git sur main (commit, merge, push, rebase, reset, cherry-pick) : demande confirmation à Morgan.
// - Push forcé sur main ou dev : refusé.
// - Une vraie clé Okto écrite dans un fichier : refusée (elle va dans OKTO_VOICE_KEY sur Hostinger).
import { execSync } from 'node:child_process';

let raw = '';
for await (const chunk of process.stdin) raw += chunk;
const input = JSON.parse(raw || '{}');
const tool = input.tool_name ?? '';
const args = input.tool_input ?? {};

function decide(permissionDecision, permissionDecisionReason) {
  console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision, permissionDecisionReason } }));
  process.exit(0);
}

if (['Write', 'Edit', 'MultiEdit', 'NotebookEdit'].includes(tool)) {
  if (/okto_key_[0-9a-f]{12}_[A-Za-z0-9]+/.test(JSON.stringify(args))) {
    decide('deny', "Une vraie clé Okto ne doit jamais être écrite dans un fichier : elle va dans la variable d'environnement OKTO_VOICE_KEY sur Hostinger.");
  }
  process.exit(0);
}

const cmd = String(args.command ?? '');
if (!['Bash', 'PowerShell'].includes(tool) || !/\bgit\b/.test(cmd)) process.exit(0);

let branch = '';
try {
  branch = execSync('git branch --show-current', { cwd: input.cwd || process.cwd(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
} catch {}

const forced = /\bgit\s+push\b[^\n]*(\s--force(-with-lease)?\b|\s-f\b)/.test(cmd);
if (forced && (/\b(main|dev)\b/.test(cmd) || ['main', 'dev'].includes(branch))) {
  decide('deny', 'Pas de push forcé sur main ni sur dev (workflow-git).');
}

const writesGit = /\bgit\s+(commit|merge|push|rebase|reset|cherry-pick)\b/.test(cmd);
if (writesGit && (branch === 'main' || /\bmain\b/.test(cmd))) {
  decide('ask', `Opération Git qui touche main (branche courante : ${branch || '?'}) : il faut l'accord explicite de Morgan pour cette opération précise.`);
}
process.exit(0);
