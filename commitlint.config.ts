const META_SCOPES = ['repo', 'tooling', 'ci', 'deps'];
const PROJECT_LAYERS = [
  'app',
  'data-access',
  'feature',
  'ui',
  'utils',
  'models',
  'design-system',
  'environments',
  'e2e',
];
export const PROJECT_SCOPE_RE = new RegExp(
  `^[a-z][a-z0-9]*(?:-[a-z0-9]+)*-(?:${PROJECT_LAYERS.join('|')})$`,
);

export const scopeOrProject = (
  parsed: { type?: string; scope?: string | null },
  when = 'always',
): [boolean, string] => {
  const negated = when === 'never';
  if (parsed.type === 'revert') {
    return [true, ''];
  }
  if (parsed.scope === null || parsed.scope === undefined || parsed.scope === '') {
    return [false, 'scope is required (revert commits are exempt)'];
  }
  const valid = META_SCOPES.includes(parsed.scope) || PROJECT_SCOPE_RE.test(parsed.scope);
  const message = `scope must be one of [${META_SCOPES.join(
    ', ',
  )}] or a <domain>-<layer> / <app>-app project scope (see docs/architecture/naming.md)`;
  return [negated ? !valid : valid, valid ? '' : message];
};

const scopePlugin = {
  rules: {
    'scope-or-project': scopeOrProject,
  },
};

const config = {
  extends: ['@commitlint/config-conventional'],
  plugins: [scopePlugin],
  rules: {
    'scope-or-project': [2, 'always'],
    'scope-empty': [0, 'always'],
    'header-max-length': [2, 'always', 50],
    'body-max-line-length': [2, 'always', 72],
  },
};

export default config;
