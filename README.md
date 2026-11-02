# Abhishek Sharma — Apple-inspired editorial portfolio

A restrained, responsive portfolio with system-controlled light/dark appearance, native system typography, large editorial project showcases and subtle motion.

## Design decisions
- Follows the visitor's device appearance through `prefers-color-scheme`.
- Uses the native system font stack (`-apple-system`, `BlinkMacSystemFont`, SF family names where installed, then standard fallbacks). No proprietary font files are bundled.
- No copied parallax demo, no `parallax.js`, no GSAP/ScrollTrigger, no Google Fonts, and no external animation dependencies.
- Preserves the supplied portfolio narrative, employment history, projects, skills, education, contact links, portrait and public GitHub API panel.
- Uses CSS reveal transitions and a small scroll progress indicator; respects reduced-motion preferences.

## Deploy to GitHub Pages
Upload the contents of this folder to the root of your repository's `main` branch, then enable GitHub Pages from `main` / root if it is not already enabled.

## Validate locally
Open `index.html` in a browser. The page works without a build step. GitHub live data requires internet access; all other content is static.

## Before public sharing
Review `CONTENT-TO-VERIFY.md`, particularly workplace naming and project descriptions. Do not publish confidential employer or customer information.


## SEO and lead generation
See `SEO-AND-LEADS.md` for Google Search Console setup, sitemap submission, indexing steps and lead form behaviour. The form opens an email draft locally; it does not store leads on a server.
