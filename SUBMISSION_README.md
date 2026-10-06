# Airbnb Clone — Submission Package

This package contains a desktop implementation of the Airbnb listing reference supplied in the assignment. It includes the listing page, photo tour, lightbox, local source assets, architecture documentation, and the AI-assisted development record.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4173/`.

## Validate

```bash
npm run check
npm run build
```

The project has no third-party runtime dependencies. `npm run check` validates JavaScript syntax. `npm run build` normalizes SVG assets and verifies application entry points, listing data, photos, and static files.

## Deliverables

- `dist/` — the runnable website and local assets
- `docs/architecture-diagram.pdf` — production-scale marketplace architecture
- `docs/architecture-diagram.png` — image version of the architecture diagram
- `docs/architecture-diagram.svg` — editable vector source for the architecture diagram
- `docs/architecture-notes.md` — architecture decisions and scaling notes
- `AI_PROMPT_SEQUENCE.md` — chronological user prompt record
- `AI_WORKFLOW.md` — tools, process, and verification record
- `.agents/skills/reference-fidelity/SKILL.md` — project-specific AI workflow configuration
- `AGENTS.md` — repository-level guidance used for continued development

## Scope

The submitted implementation targets desktop behavior, as requested in the brief. It recreates the reference through observation and original implementation; no source code was copied from the reference application.
