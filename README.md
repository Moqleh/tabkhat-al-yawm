# طبخة اليوم

Static Arabic RTL recipe website hosted on the existing GitHub Pages path.

- `recipes.js`: the original 36 recipe entries retain their array indices and image names. Eight additional text-only recipes cover the new categories. Do not reorder entries: favorites and shared links use these IDs.
- `app.js`: filtering, local ingredient matching, portion scaling, grocery list, weekly planner, cooking mode, timer and installation UI.
- `styles.css`: responsive desktop/mobile layout and print styles.
- `sw.js`: app shell cache and explicitly saved recipe images. Only `tabkhat-*` cache names are cleaned up. Bump the cache name and asset query versions when releasing later changes.
- `manifest.webmanifest`, `icon*`: PWA metadata and icons.

All personal lists are stored in localStorage on the current browser. The original favorites key is retained; the original grocery list is migrated on first load. There is no account or cloud synchronization.

The kitchen helper is a local recipe/ingredient guide, not an AI API integration. No nutritional values are presented without a verified calculation source. Ingredients scale numerically, while time and cookware require the cook's judgment. Grocery lines merge only when ingredient text and unit match. Additional recipes deliberately have labeled typographic placeholders rather than unrelated food photos.

## Browser verification

Install Playwright and its Chromium browser in your development environment. Serve the repository root on port 8765:

```sh
python -m http.server 8765
node tests/tabkhat-smoke.cjs
```

The test covers all recipe dialogs, 36 original images, search/categories, favorites persistence, portion validation, grocery aggregation, planning, cooking steps, timer state, helper scope, offline saved recipes, mobile widths and malformed local storage. It produces desktop/mobile screenshots in the working directory.
