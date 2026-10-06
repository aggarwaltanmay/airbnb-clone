# AI Workflow Record

## Environment

- AI development environment: Codex desktop
- Implementation: HTML, CSS, and modern JavaScript modules
- Local runtime: Node.js static server
- Reference evaluation: side-by-side browser inspection at the same desktop viewport

## Development process

1. Read the assignment PDF and separated its requirements from user-authored instructions.
2. Inspected the supplied reference application as a user would, without copying its source code.
3. Recorded the required page states: listing page, photo tour, and lightbox.
4. Built the page structure, local data model, icons, imagery, typography, and interactive states.
5. Compared the local result with the reference and iterated on measured spacing, sizing, sticky navigation, review chips, logo treatment, saved state, and control behavior.
6. Checked the browser console and exercised the primary visible interactions.
7. Ran syntax and static-asset validation before packaging.
8. Produced the architecture diagram as both PDF and PNG and visually verified the rendered PDF.

## AI configuration included

The repository contains a narrow project skill at `.agents/skills/reference-fidelity/SKILL.md` and repository guidance in `AGENTS.md`. These files capture the repeatable comparison and verification process for future iterations. The primary Codex agent performed the implementation; no custom subagent was used, so the package does not claim or fabricate a subagent run.

## Fidelity and provenance

The implementation was created from visual observation of the supplied reference and from the assignment requirements. Image and icon assets are stored locally so the submitted site does not depend on the reference application at runtime. `asset-sources.json` records asset provenance.

## Verification performed

- JavaScript syntax checks for every application module
- Static build validation for entry points, assets, listing data, and all 43 unique listing photos
- Browser rendering at the assignment’s desktop scope
- Manual interaction checks for listing navigation, photo tour, lightbox, carousel, amenities, save state, and reservation controls
- Visual inspection of the final architecture PDF after rasterization

