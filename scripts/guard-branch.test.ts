import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';

const GUARD = join(process.cwd(), 'scripts', 'guard-branch.sh');

let repo: string;

const guardExit = (env: NodeJS.ProcessEnv = {}): number => {
  try {
    execFileSync('bash', [GUARD], {
      cwd: repo,
      env: { ...process.env, ...env },
      stdio: 'pipe',
    });
    return 0;
  } catch (e) {
    return (e as { status?: number }).status ?? 1;
  }
};

const git = (args: string[], env: NodeJS.ProcessEnv = {}) =>
  execFileSync('git', args, {
    cwd: repo,
    env: { ...process.env, ...env },
    stdio: 'pipe',
  });

beforeAll(() => {
  repo = mkdtempSync(join(tmpdir(), 'guard-'));
  git(['init', '-q', '-b', 'develop']);
  git(['config', 'user.email', 'test@example.com']);
  git(['config', 'user.name', 'test']);
  git(['commit', '-q', '--allow-empty', '-m', 'init']);
});

afterAll(() => rmSync(repo, { recursive: true, force: true }));

describe('guard-branch.sh', () => {
  it('blocks develop', () => {
    git(['checkout', '-q', 'develop']);
    expect(guardExit()).toBe(1);
  });

  it('blocks master', () => {
    git(['checkout', '-q', '-b', 'master']);
    expect(guardExit()).toBe(1);
  });

  it('allows feature branches', () => {
    git(['checkout', '-q', '-b', 'feature/x']);
    expect(guardExit()).toBe(0);
  });

  it('allows detached HEAD', () => {
    git(['checkout', '-q', '--detach']);
    expect(guardExit()).toBe(0);
    git(['checkout', '-q', 'develop']);
  });

  it('allows a protected branch when SKIP_BRANCH_GUARD=1 is set', () => {
    git(['checkout', '-q', 'develop']);
    expect(guardExit({ SKIP_BRANCH_GUARD: '1' })).toBe(0);
  });

  it('does not bypass when SKIP_BRANCH_GUARD is a non-"1" value', () => {
    git(['checkout', '-q', 'develop']);
    expect(guardExit({ SKIP_BRANCH_GUARD: 'false' })).toBe(1);
    expect(guardExit({ SKIP_BRANCH_GUARD: '0' })).toBe(1);
  });
});
