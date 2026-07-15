import { describe, it, expect } from 'vitest';
import { scopeOrProject, PROJECT_SCOPE_RE } from './commitlint.config';

const check = (type: string, scope: string | null): boolean =>
  scopeOrProject({ type, scope }, 'always')[0];

describe('scopeOrProject', () => {
  it('accepts meta scopes', () => {
    for (const s of ['repo', 'tooling', 'ci', 'deps']) {
      expect(check('feat', s)).toBe(true);
    }
  });

  it('accepts valid project scopes per naming.md', () => {
    expect(check('feat', 'auth-data-access')).toBe(true);
    expect(check('feat', 'shared-ui')).toBe(true);
    expect(check('feat', 'adc-web-app')).toBe(true);
    expect(check('feat', 'catalog-feature')).toBe(true);
    expect(check('feat', 'shared-design-system')).toBe(true);
  });

  it('rejects scopes whose layer is not in the controlled set', () => {
    expect(check('feat', 'auth-bogus')).toBe(false);
    expect(check('feat', 'foo-bar-baz')).toBe(false);
  });

  it('rejects missing/empty scope', () => {
    expect(check('feat', null)).toBe(false);
    expect(check('feat', '')).toBe(false);
  });

  it('exempts revert commits', () => {
    expect(check('revert', null)).toBe(true);
    expect(check('revert', 'auth-data-access')).toBe(true);
  });

  it('regex matches the controlled layer vocabulary', () => {
    expect(PROJECT_SCOPE_RE.test('auth-data-access')).toBe(true);
    expect(PROJECT_SCOPE_RE.test('auth-bogus')).toBe(false);
  });
});
