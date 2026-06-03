Replace all "imported from Turkey" references with "Made in Turkey" and swap the Ship icon for a Factory icon.

**Text replacements:**
- `src/routes/index.tsx` — hero tagline, meta description, feature card label
- `src/routes/about.tsx` — origin paragraph and feature card
- `src/routes/__root.tsx` — Open Graph and Twitter meta descriptions
- `src/components/Footer.tsx` — footer tagline
- `src/data/products.json` — Origin field values (consistency)

**Icon replacement:**
- `src/routes/index.tsx` — replace `Ship` with `Factory` in the feature grid
- `src/routes/about.tsx` — replace `Ship` with `Factory` in the value proposition cards

All changes are string replacements and icon imports. No functional or architectural changes.