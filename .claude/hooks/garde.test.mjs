// Auto-test du hook garde.mjs : node .claude/hooks/garde.test.mjs
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const hook = fileURLToPath(new URL('./garde.mjs', import.meta.url));
const decision = (tool_name, tool_input) => {
  const out = execFileSync('node', [hook], { input: JSON.stringify({ tool_name, tool_input, cwd: process.cwd() }), encoding: 'utf8' });
  return out ? JSON.parse(out).hookSpecificOutput.permissionDecision : 'allow';
};
const fakeKey = 'okto_key_' + 'a1'.repeat(6) + '_secret'; // construite ici pour ne pas être bloquée par le hook lui-même

assert.equal(decision('Bash', { command: 'git push --force origin dev' }), 'deny');
assert.equal(decision('Bash', { command: 'git push -f origin main' }), 'deny');
assert.equal(decision('Bash', { command: 'git switch main && git merge --no-ff dev' }), 'ask');
assert.equal(decision('Bash', { command: 'git push origin main' }), 'ask');
assert.equal(decision('Bash', { command: 'git status' }), 'allow');
assert.equal(decision('Bash', { command: 'npm test' }), 'allow');
assert.equal(decision('Write', { file_path: 'x.ts', content: `const k = "${fakeKey}"` }), 'deny');
assert.equal(decision('Write', { file_path: 'x.md', content: 'clé `okto_key_…` à mettre sur Hostinger' }), 'allow');
console.log('garde.mjs : tous les tests passent');
