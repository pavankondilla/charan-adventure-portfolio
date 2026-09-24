# Charan’s adventure portfolio

A frontend-only, image-based village-to-city journey, focused on healthcare automation and the supplied Dispensed role. Nine stops cover foundations, Srikara Hospitals, Linlekunda, business automation, personal products, leadership, a proposed 90-day approach, and contact. No build step or runtime dependencies. Original raster character, landscape, city, landmarks, and terrain are in `assets/`. The scene is drawn with Canvas 2D; text and controls use semantic HTML and CSS for accessibility. No CSS or SVG character drawings are used.

## Preview

Open `index.html`, or run `python -m http.server 8080` in this directory and visit `http://localhost:8080`. The optional Google Fonts import falls back to system sans-serif when offline.

## Edit your information

Edit `content.js` for organization URLs, roles, build briefs, source links, and contact details. Set `links.email` to `mailto:your-address`, and `links.github` to a full HTTPS URL when available. LinkedIn is configured. Empty contact methods are omitted.

Intro copy and chapter content are in `sections.js`. Scene logic is in `script.js`; styling is in `style.css` and `premium.css`. After adding substantial text, check mobile and use Simple view for long content. Screens shorter than 680px start in Simple view. Adventure panels allow native scrolling for overflow; no wheel events are intercepted.

The 4+ years statement is supplied by Charan, not derived from an invented start date. SURE Trust's July 2024 role and approximate five-hours-to-minutes result come from his public LinkedIn profile and are identified as self-reported. Other results are not quantified. Bcon Ad Labs is shown as a six-month engagement without fabricated calendar dates. ISB is listed only under further background, with its role/relationship awaiting confirmation. Seven featured builds counts portfolio entries, not independently verified production deployments. AI Digital Companion is an additional stealth product, excluded from that count. The 90-day plan is prospective, not past employment at Dispensed. Confirm dates, stacks, demos, metrics, and ISB involvement before submitting an application.

## GitHub Pages deployment

1. Commit `index.html`, `style.css`, `premium.css`, `script.js`, `sections.js`, `content.js`, and the complete `assets/` folder to a GitHub repository.
2. In repository Settings → Pages, select deployment from a branch, choose your branch and `/ (root)`, and save.
3. Visit the deployment URL provided by GitHub. All local URLs are relative, so repository subpaths work.

No secrets, API keys, backend, package installation, or build command are needed. Image generation was done during development; the deployed site never calls an AI service.

## Journey architecture

Native page scrolling updates `target`. A short time-based ease produces one authoritative `progress` value. That value determines the active stop, world distance, walking gait, direction, camera, and progress indicator. The beginning 60% of each stop’s interval holds the avatar at its landmark to allow reading. The remainder advances to the next stop. Reverse scrolling retraces the same route. Village and city raster layers crossfade gradually during travel.

`ground(x)` is shared by terrain sampling, landmark placement, and the avatar foot position. Terrain is sampled from the generated raster atlas in narrow strips, following a gentle climbing curve. Character source rectangles were measured once from the transparent alpha and saved as static bounds, so direct file opening does not require restricted canvas pixel access. The camera stays centered on a bounded path position; scenery and foreground use different movement factors.

Adventure mode is the default. Reduced motion keeps the adventure usable with immediate scene updates and no idle or walking animation. The view switch preserves the current section. Asset load failures fall back to the conventional portfolio. Canvas is decorative and hidden from assistive technology. Inactive adventure panels are inert; Simple view exposes every section normally.

## Original artwork

The original five scene PNGs and the five current character animation atlases were produced with the built-in image generation tool. See `assets/PROMPTS.md` and `assets/CITY-PROMPTS.md` for production prompts and source geometry. Transparent alpha is retained for character and landmark sheets. No existing platform-game artwork, costumes, or branding are used. Architecture is illustrative rather than a reproduction of the organizations' real buildings.

## Checks

Run `node --check script.js`, `node --check sections.js`, and `node --check content.js` for syntax checks. `verify.cjs` is a development-only Playwright browser check; it uses the locally installed Playwright cache and Microsoft Edge. Change its require path for another machine. It checks all ten image-character checkpoints, greeting states, three traveler outfits, transparent click targets, detailed tools, keyboard dialogs, portrait overflow, simple view, reduced motion, image failure fallback, and JavaScript exceptions. Test again with your final content before publishing.


## September 2026 checkpoint edition

Adventure view now follows 10 career checkpoints from 2021 through September 2026. Scroll or select a numbered timeline stop, then click the character to open work, results, skills, and tools. Simple view displays the complete timeline as readable cards. The illustrated traveler progresses from casual clothes with a laptop to a tucked-in shirt and then a founder suit with a briefcase. Ten costume versions of the same illustrated male stand beside the landmarks. The traveler walks or runs with distance-driven sprite frames, decelerates near the host, then reaches, makes hand contact, releases, and returns to idle. Hosts remain idle outside the greeting. Click the host or its small plus marker to open the milestone; no large checkpoint box appears in the scene. Character artwork comes from transparent PNG atlases, not SVG or CSS figures. See `assets/GHIBLI-PROMPTS.md` for the complete prompts and final asset paths.

Timeline content is in `PORTFOLIO.milestones` in `content.js`. Shared later-career tools are explicitly distinguished from confirmed milestone-specific tools. The supplied 20K and 30K figures do not assume a currency or profit definition.

Run locally with `python -m http.server 8080` and open http://localhost:8080. Run `node verify.cjs` for desktop/mobile checkpoint, dialog, accessibility fallback, and browser exception checks.


## Adventure visibility fix

Open `index.html` directly or serve the folder over HTTP. Both entry points support Adventure mode. The header offers Reading mode while the adventure is active and Adventure mode while reading. Reduced-motion preferences disable animation rather than hide the adventure. If an image fails to load, select Adventure mode again to retry. Regression checks cover direct-file and HTTP entry points, all ten checkpoints, view switching, and both motion preferences.


## Character animation edition v5

- `sprite-sheets.html`: interactive walking, running, greeting, and costume previews with five PNG downloads.
- `assets/traveler-walk-v6.png`: 18 frames, six walking poses for each of three outfits, with the founder's briefcase in every frame.
- `assets/traveler-run-v5.png`: 18 frames, six running poses for each outfit.
- `assets/traveler-greet-v5.png`: 12 idle/reach/contact/release poses.
- `assets/milestones-idle-v5.png` and `assets/milestones-greet-v5.png`: the same male identity in ten matching milestone costumes.
- `assets/sprite-metadata.js`: saved crop, pivot, and hand coordinates. Runtime drawing does not require canvas pixel reads.
- `motion.js`: bounded speed and acceleration, distance-driven frame selection, and one-shot arrival greetings. Timeline links jump directly to their selected checkpoint; scrolling travels through the world.
- `assets/ANIMATION-PROMPTS.md`: final built-in generation prompts and asset paths.

Checks: `node verify-motion.cjs` for movement and handshake geometry, `node verify-animation.cjs` for browser animation and sheet previews, and `node verify.cjs` for the complete desktop/mobile, direct-file, reduced-motion, dialog, and loading-failure checks.
