# Abhishek Sharma — GitHub Pages Portfolio

A responsive, dark developer portfolio for **Abhishek Sharma** (`Nithinxharma`).

## Publish on GitHub Pages

1. Create a public repository named **`Nithinxharma.github.io`** (the repository name must match your GitHub username exactly).
2. Upload `index.html`, `styles.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then Save.
6. Wait for the deployment. Your site should appear at `https://nithinxharma.github.io`.

## Before publishing

- Replace the initials placeholder in the hero with a real profile photo if desired. To do this, add a photo such as `assets/profile.jpg` and replace the `.avatar-placeholder` block in `index.html` with an `<img>` element. Add suitable CSS for the image.
- Review every employment date and role.
- Confirm the exact legal employer spelling and job titles.
- Add repository links only after verifying the repositories and your contributions.
- Add project screenshots or demos when available.
- Review the contact links before making the site public.

## GitHub integration

The GitHub section calls the public GitHub REST API without an access token. This means:
- It only shows information GitHub makes public.
- GitHub's unauthenticated API rate limits apply.
- The site still works if the API is unavailable; the fallback message is shown.
- No private repositories, private commits or private activity are exposed.

## Notes

- No build system or package installation is required. This is plain HTML, CSS and JavaScript.
- The site is designed to work as a static GitHub Pages website.
- The terminal widget is a local portfolio information simulator, not a real shell.
- The PDF can be created from the browser using **Print → Save as PDF**. The browser print layout may be refined after content verification.


## Visual direction update
The portfolio now uses an editorial monochrome “The Journey” direction: oversized outlined typography, grayscale portrait, chapter-numbered experience timeline, fine grid/noise texture, restrained acid-lime accents, and sharper glass/outline panels. The original interactive terminal, GitHub public-data section, navigation, and responsive layout are retained.


## Integrated parallax animation

The supplied SVG parallax scene is integrated as a fixed, decorative background controlled by GSAP ScrollTrigger. The original portfolio sections, navigation, terminal simulator, GitHub API integration, and profile image are retained. The animation reference is credited to its original author: https://codepen.io/isladjan/pen/abdyPBw (project information: https://isladjan.com/work/4/). See `LICENSE-parallax.txt` for the supplied license.

GSAP and ScrollTrigger are loaded from their public CDN. The page remains readable if those scripts are unavailable. Users who prefer reduced motion receive a static background treatment.
