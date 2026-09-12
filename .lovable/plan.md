## Update Location to Specific Address

Replace all vague "Lagos, Nigeria" / "Based in Lagos" references with the full physical address:
**185 Adeniji Adele Road, Beside Wema Bank, Lagos Island, Lagos**

### Pages & Components to Update

| File                        | Current Text                                                                         | New Text                                                |
| --------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| `src/components/Footer.tsx` | "Based in Lagos, Nigeria" (tagline) + "Lagos, Nigeria" (footer bottom)               | Full address in tagline; full address in footer bottom  |
| `src/routes/contact.tsx`    | "Lagos, Nigeria — serving contractors nationwide" (location card) + meta description | Full address in location card; update meta              |
| `src/routes/about.tsx`      | "Based in <strong>Lagos</strong>" (paragraph) + "Based in Lagos" card                | Full address in paragraph; update card title to address |
| `src/routes/index.tsx`      | "Lagos · Nigeria" (hero tagline)                                                     | Full address                                            |
| `src/routes/__root.tsx`     | "in Lagos, Nigeria" (meta descriptions)                                              | "in Lagos Island, Lagos" or full address where it fits  |

### No structural or design changes

Only text replacements. Layout, styling, and icons remain exactly as they are.
