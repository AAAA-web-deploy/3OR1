# $3OR1 — Complete website & Cursor-ready package

**The website is already built, not just a mockup.** Extract the ZIP, open `index.html` in your browser (or preferably run a local static server), and try the Fusion Lab. For edits, open this folder in Cursor and paste `CURSOR_MASTER_PROMPT.md`. The entire package is self-contained; images, CSS, JS, benchmark analysis, and prompt are all present.

## Brand

- **Name:** Vitalik+Anatoly+Raj
- **Ticker:** $3OR1
- **Tagline:** Three faces. One mind—or Three?!
- **Reference:** https://www.wojakcto.com/ (benchmarking only; original site/assets here)

## Run it in under a minute

**Option A — simplest:** double-click `index.html` (most features will work; Canvas saving may behave differently under `file://` restrictions).

**Option B — recommended:** run a local static server from this folder:

```sh
python -m http.server 5173
```

Then open `http://localhost:5173` in any modern browser. Python 3 is sufficient; **no NPM, dependencies, compilation, or API key required**. You may host this folder on any static hosting provider such as Cloudflare Pages, Netlify, Vercel static hosting, GitHub Pages, or a conventional web server.

## Source files

| File | Purpose |
|---|---|
| `index.html` | Fully implemented responsive site / sections |
| `styles.css` | Unique neon comic branding, layout, animation, breakpoints |
| `app.js` | Working Fusion Lab (15 choices, 5 preset results, 5 mixed results, fallback canvas, randomizer and downloads) |
| `site.config.js` | Verified contract/URLs to fill later |
| `assets/` | All optimized WebP and SVG artwork |
| `CURSOR_MASTER_PROMPT.md` | Complete zero-extra-instructions Cursor prompt |
| `docs/REFERENCE_SITE_RESEARCH.md` | Website design benchmark analysis |
| `docs/ASSET_INVENTORY.json` | Asset inventory |
| `docs/TEST_PLAN.md` | How to check site function and performance |

## The live Fusion Lab

All 125 possible selections work as interactions. **Exactly five equal-emotion triples** show specific premade artwork. **Five featured mixed triples** show sample images. The other 115 triple combinations render a visually distinct, locally composited remix preview; they are **not unique AI-generated art**. A friendly message encourages joining the $3OR1 community while keeping the initial lab free to everyone.

## Before launching real trading

`site.config.js` intentionally contains an empty Ethereum `contractAddress`. After the REAL token contract is deployed and independently verified, place it there. Until then, Buy/Get buttons show a cautionary message instead of sending people to an unrelated or nonexistent token. Don't invent taxes, liquidity conditions, on-chain guarantees, price stats, or a verified launch status.

## Content / brand notes

All character artwork was derived from the images supplied in the conversation and/or visually composed into site-specific scenes; it is an independent parody concept. It depicts familiar memes and marks. Confirm your rights to use the component art, brand logos, and likeness-based associations before a commercial campaign. Clearly keep the parody/non-endorsement notice.

## Need future fully AI-generated custom fusions?

A real generative-image service is a separate feature. It needs a hosted inference service/API key, moderation, cost controls, storage, and (only if desired) clearly disclosed wallet verification. Nothing here incorrectly claims purchases currently unlock it.
