# Editing the portfolio

Almost every piece of visible information lives in one file:

`content/site-content.js`

The page layout, responsive styling, components, and chip animation are intentionally separated from that content.

## Common updates

### Add an experience

Find `experience.items`, copy one object, and change its values:

```js
{
  year: '2027',
  company: 'Company',
  role: 'Role',
  summary: 'One sentence describing your work in this role.',
  location: 'City, State',
  mark: 'CO',
  keywords: [
    { label: 'Research theme', papers: ['Exact publication title'] }
  ]
}
```

The timeline and its responsive layout update automatically. A keyword reveals its related publication links on hover or keyboard focus. Paper names must match titles in `publications.items`.

### Add a publication

Add an object to `publications.items`. Put a figure extracted from the paper in `images/publications/`, then set `image` to that relative path. Every publication needs a short `title`, the remaining paper title in `subtitle`, numeric `year`, venue, category, description, URL, image, alt text, and accent color. The short title is displayed prominently above the smaller full-title line. Publications are automatically shown newest first. `scripts/extract_publication_figures.py` documents the current paper-figure crops.

### Add news or an award

Copy an entry inside `news.items` or `awards.items`. The numbering and layout are generated automatically. The news panel becomes independently scrollable as it grows.

### Add a research area

Copy an object in `research.areas`. Research keywords use the same hover-to-paper relationship as experience:

```js
keywords: [
  { label: 'Quantization', papers: ['OuroMamba', 'MicroScopiQ'] }
]
```

### Add a gallery image

Put the image in `images/`, then add an entry to `beyond.gallery`. Set `large: true` only for the lead image.

### Change contact details or availability

Edit `identity`. The header, hiring link, email links, résumé link, portrait caption, and footer all reuse those values.

The `identity.links` object is the single source for LinkedIn, GitHub, and Google Scholar URLs.

### Change page and link-preview metadata

Edit `metadata`. It controls the browser title, search description, and social sharing information.

### Change the live agent trace

Edit the `title` and `detail` values inside `journey`. The technical camera path is isolated in `js/chip-config.js`.

## File responsibilities

- `content/site-content.js` — portfolio information and links
- `js/components.js` — reusable section templates
- `js/chip-config.js` — technical camera positions for the chip journey
- `script.js` — scroll behavior and chip animation
- `stylesheet.css` — visual design and responsive rules
- `index.html` — stable document shell and metadata

After editing, serve the folder through a local web server. ES modules do not run correctly when `index.html` is opened directly with a `file://` URL.
