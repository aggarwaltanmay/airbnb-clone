---
name: reference-fidelity
description: Compare the local Airbnb clone with its supplied live reference or screenshots and correct desktop visual or interaction differences. Use for focused parity audits of this project; do not use to invent features outside the assignment.
---

# Reference Fidelity

Work from the user-named section and the closest reference state. Preserve the assignment's desktop scope and the current three views: listing, photo tour, and lightbox.

## Audit method

1. Open the live reference and local page at the same viewport and route or hash.
2. Compare the largest structural values first: content width, section height, grid, sticky offsets, and major whitespace.
3. Then compare typography, icons, borders, radii, colors, and control states.
4. Exercise the same visible control in both versions. If the reference control is inert, keep the local control inert unless the user requests otherwise.
5. Make the smallest coherent CSS or JavaScript change that fixes the observed difference.
6. Check nearby breakpoints and views for regressions.
7. Run `npm run check` and `npm run build`, then inspect the changed state in the browser and review console errors.

## Project constraints

- Implement from observation; do not copy source code from the reference.
- Reuse the local Airbnb Cereal font, existing SVG treatment, and stored assets.
- Keep original asset provenance in `asset-sources.json`.
- Prefer accessible native controls and preserve visible focus behavior.
- Avoid adding dependencies when existing HTML, CSS, and JavaScript are sufficient.
- Do not publish or submit externally without an explicit destination and authorization.

## Evidence

For each material change, retain the reference screenshot or describe the live state used, record what was adjusted, and report the validation commands that passed.
