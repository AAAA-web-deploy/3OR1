# CURSOR MASTER PROMPT — Vitalik+Anatoly+Raj ($3OR1)

**Paste this entire prompt in Cursor after extracting the ZIP and opening the `3OR1_COMPLETE_WEBSITE` folder.** No additional uploads, downloads, or separate instructions are necessary.

You are a senior creative front-end engineer, UI animator, and performance optimizer. **This folder already contains a fully implemented, dependency-free site and every required image.** Your goal is to **use and refine the provided working website**, not rebuild it from scratch or fabricate missing assets. Begin by reading `README_START_HERE.md`, `index.html`, `styles.css`, `app.js`, `site.config.js`, and the documents in `docs/`.

## 1. Non-negotiable identity

- Token name: **Vitalik+Anatoly+Raj** (preserve exact name in all site copy).
- Ticker: **$3OR1** (digit 3, letters O and R, digit 1; **never** change to $3ORI or $30R1).
- Tagline: **“Three faces. One mind—or Three?!”** (capitalize the last **Three**).
- Purpose: A humorous **question**, not a claim that integration succeeded: do three characters become one coherent mind, or retain three conflicting minds?
- Meme reference: **Vitalik → SPONGEBOB**, **Anatoly → TROLLFACE**, **Raj → DOGE**.
- This is an **unofficial fictional parody**, not affiliated with the founders, Netflix, Ethereum Foundation, Solana Foundation, or the represented memes' rights holders.
- Treat Anatoly's interpretation of the Netflix trailer as reported commentary; never claim Netflix officially created a composite of these three people.

## 2. Source website benchmarking

Primary reference researched: **https://www.wojakcto.com/**. Reference research is in `docs/REFERENCE_SITE_RESEARCH.md`. Use its **meme-first story, always-visible character, meme generator/gallery prominence, short how-to-buy path, scrolling reveal, and playful interactions** as inspiration. Also reviewed: `pepe.vip`, `froge.vip`, `apu.io`.

This design is **our original composition** (neon navy, cobalt/teal, gold, magenta, heavy expressive typography) based on the supplied $3OR1 artworks. Emulate reference **format, energy, hierarchy, interaction patterns**, not exact copyrighted site text, images, code or layout coordinates. Make it better suited to our token's unique three-to-one story.

**Image-first:** more visual content than prose. Short meme-friendly captions, no walls of text; preserve loaded images and alt text.

## 3. Mandatory story (three chapters, in precisely this order)

1. **Anatoly (Trollface) + Raj (Doge) → stage-one fusion**, powered by / accompanied by the **Solana** emblem, using `assets/story/step-01.webp` plus original portrait art.
2. The duo meets **Vitalik (SpongeBob)**, with the **Ethereum** emblem joining. Use `assets/story/step-02.webp`.
3. The final fusion is born but remains an open question **3 OR 1?** Show `assets/story/step-03.webp` and the final mascot images. No narrative that they have actually founded this token together.

For animation, keep performant CSS transforms and opacity only: gentle magnetic attraction of the two Solana characters in chapter 1; a subtle glow / ETH emblem arrival in chapter 2; a dramatic but brief reveal in chapter 3. Respect `prefers-reduced-motion`. Avoid heavyweight animation libraries and enormous video files.

## 4. Mandatory interactive Fusion Lab

`app.js` already implements this. Preserve and refine, do not replace with inert mockups:

- Three independent selectors: **Vitalik, Anatoly, Raj**.
- Five selectable emotion buttons **per person**: **Happy, Shocked, Angry, Sad, Smug**. All 15 individual art sprites are in `assets/faces/`.
- Whenever an emotion is clicked, update the live preview, active button/ARIA state, name combination, caption, and result type immediately.
- **All three pick same emotion:** show the **exact pre-rendered** artwork from `assets/results/match-{emotion}.webp`. These five artwork files are present (happy, shocked, angry, sad, smug).
- **Five specific mixed examples:** show the **exact pre-rendered** asset in `assets/gallery/mixed-*.webp`; mapping is in `app.js` under `mixed`.
- **All remaining selections:** show a **live locally drawn collage preview** via the existing Canvas composer (three selected emotion references + fusion mascot), clearly marked `LIVE COLLAGE`, **not** a fake AI generation. The preview is free and works immediately without network APIs or a wallet.
- Provide **randomizer**, **all-same quick presets**, **save-result** (download) button, and clickable result gallery.
- Display playful teaser for uncovered combos: **“🤯 The meme machine hasn’t painted this exact combo yet! Enjoy your free remix preview. Want to support more handcrafted madness? Join the $3OR1 chaos—no purchase needed to play.”** Use friendly tone, not promises of profits or false entitlement.
- There is **no actual AI image generator or token-gating service** in this folder. Do not advertise a real-time AI-generation capability or wallet-gated entitlement unless it is genuinely implemented and disclosed. A future phase could add server-side image generation via a securely stored API key and a separately agreed eligibility policy, but the static site must work without them.

## 5. Buyer CTA and safety

- `site.config.js` deliberately has an empty `contractAddress`. **Never invent a contract address**.
- `Get $3OR1` CTA should show a friendly **not yet configured** explanation until a verified Ethereum ERC-20 contract address (`0x` + exactly 40 hex chars) is configured.
- Once a verified address is entered in `site.config.js`, the existing CTA builds a Uniswap swap URL. Keep chain accurate; if token launches elsewhere, update the chain/link in a verified way.
- Never display fabricated price, market cap, tokenomics, LP-burn status, renouncement, claimed backing, or social proofs.
- No requirement to buy tokens just to interact with the mood selector.
- Optional X/Telegram links should only appear after valid URLs are provided.

## 6. Speed: choose the simplest methods/languages

**Keep vanilla HTML5 + modern CSS + plain JavaScript**. It is already implemented and loads without an NPM build step. No Next.js/React, no Tailwind install, no external icon/font library, no animation framework, no backend, no API calls. Do not introduce a framework unless there is a compelling functional need and explicitly document the tradeoff.

Use files already in `assets/`: optimized **WebP** illustrations, tiny inline SVG ETH/SOL emblems. Preserve:

- `loading="lazy"` and `decoding="async"` for below-the-fold images.
- `fetchpriority="high"` for hero, correct image aspect ratios, explicit sizes.
- Content-heavy HTML delivered immediately; JS enhances interactive region after parse.
- CSS transform/opacity animation, IntersectionObserver scroll-reveal, reduced-motion support.
- Pre-rendered imagery for critical expressions; Canvas only for novel combinations and only on demand.
- Responsive mobile-first breakpoints; keyboard navigation and descriptive accessible labels.
- Avoid expensive animated gradients, full-screen video/WebGL, large NPM bundles, runtime image generation, third-party font downloads.

**Goal:** responsive perceived load, ideally LCP under 2.5 seconds on a moderately fast connection *where real device/network conditions allow*; no invented measured performance. Run a real Lighthouse audit if browser tooling is available, then optimize based on measured results.

## 7. Expected pages/sections and UX details

1. Sticky compact nav with logo, Story / Fusion Lab / Results / Gallery, safe Get $3OR1 CTA.
2. Banner-driven hero using `assets/brand/hero-banner.webp` and a punchy Enter Fusion Lab button; don't repeat already baked-in headline as a duplicate overlay.
3. Three large visual story panels with blocky labels and ETH/SOL icons.
4. Interactive Fusion Lab visible prominently; 3 mini-character mood grids + 1 big artwork/result panel.
5. Five same-emotion presets in a bright gallery; click any to open selected combo in the lab.
6. Five mixed examples; click to see result.
7. Fun join CTA and honest parody/FAQ notices.
8. Responsive, touch-friendly, keyboard-operable, reduced-motion aware.

## 8. Exact assets

- Brand: `assets/brand/hero-banner.webp`, `mascot-white.webp`, `mascot-badge-blue.webp`, `mascot-badge-dark.webp`, `social-card.webp`.
- Story: `assets/story/step-01.webp`, `step-02.webp`, `step-03.webp`.
- Individual expressions: `assets/faces/{vitalik|anatoly|raj}-{happy|shocked|angry|sad|smug}.webp` (15).
- Match results: `assets/results/match-{happy|shocked|angry|sad|smug}.webp` (5).
- Mixed results: 5 `assets/gallery/mixed-*.webp`; plus 5 post images and a news-setup image.
- Icons: `assets/icons/ethereum.svg` and `solana.svg`.
- Optional visual style reference: `assets/reference/style-reference.webp`.

## 9. Required validation before declaring complete

1. Open `index.html` under a local static server: `python -m http.server 5173`; browse `http://localhost:5173`.
2. Desktop 1440px and mobile 390px; verify no horizontal scrolling and legible text.
3. Choose Happy×3, Shocked×3, Angry×3, Sad×3, Smug×3: exact match artwork appears each time.
4. Choose featured mixed combos (defined in JS array); exact correct example appears.
5. Choose an unfeatured combo (e.g. Sad / Angry / Happy): Canvas displays the three corresponding face images and a truthful teaser.
6. Randomizer works; select states update; galleries open respective combination; save downloads the shown media.
7. Unconfigured buy button displays caution and does not direct buyers to unrelated tokens. After verified config, links work.
8. All asset references resolve with HTTP 200, JS console contains no uncaught errors.
9. Check responsive image sizes, `prefers-reduced-motion`, accessible labels and focus states.
10. Do not write dummy user-facing text or placeholders claiming to be deployed. **Deliver production-ready output within this folder.**

This is an **enhancement prompt**, not a request to invent a different brand. All source artwork and functioning implementation are included here.
