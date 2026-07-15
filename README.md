# ADC-SAP

[![TypeScript](https://img.shields.io/badge/lang-TypeScript-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Nx](https://img.shields.io/badge/monorepo-Nx-143055.svg?logo=nx)](https://nx.dev)
[![CI Status](https://github.com/hopelesstinkerer/adc-sap/actions/workflows/ci.yml/badge.svg)](https://github.com/hopelesstinkerer/adc-sap/actions/workflows/ci.yml)

**Agro Development Cooperative — Smart Agriculture Platform**

Production-grade digital platform for ADC, spanning cooperative and commercial agribusiness operations across Somalia.

## Tech Stack

- **Package Manager:** pnpm (workspaces)
- **Monorepo:** Nx
- **Language:** TypeScript (strict)
- **Frontend:** React, Vite, Panda CSS, Radix UI
- **Testing:** Vitest, Playwright
- **CI/CD:** GitHub Actions
- **Deploy:** Netlify
- **Standards:** Conventional Commits, GPG-signed, Git Flow

> **Status:** scaffolding — the toolchain above is the target architecture and is not yet implemented.

## Committing

This repo follows strict standards:

- [Conventional Commits](https://www.conventionalcommits.org/) with mandatory scope
- 50/72 subject/body rule (both are hard limits)
- All commits must be GPG-signed
- Each commit is atomic, self-contained, and independently buildable, testable, and deployable
- Every commit references its issue via a `Closes: #N` / `Refs: #N` footer
- Git Flow branching: `feature/*` → `develop`; `release/*` / `hotfix/*` → `main`

Full conventions are documented in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Proprietary — All rights reserved. No part of this repository may be copied, distributed, or used without written permission from Agro Development Cooperative.
