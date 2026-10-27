# Murali Krishna Kummagiri | React Developer Portfolio

A dark, premium portfolio built with **React 18, Vite, Motion, Lucide icons and plain CSS** (JavaScript and JSX only, no TypeScript).

## Features
- Sticky blurred navbar, active section indicator, mobile menu, theme toggle (saved in localStorage, no flash), resume button
- Hero with animated headline and your portrait in a rotating violet-to-cyan frame (float and glow)
- About, Skills (category filter), Projects, Experience, Education, Resume preview, Contact, Footer
- **Data-driven projects**: cards, search, category filter, details dialog all come from `src/data/projects.js`
- Command palette (`Ctrl+K` / `Cmd+K`), safe developer terminal, scroll progress bar, back-to-top
- Accessibility: keyboard use, focus trap in dialogs, labeled form errors, reduced-motion support
- Contact form that only shows success after a real send (Formspree), with a mailto fallback

## Requirements
Node.js **20.19 or newer** (check with `node -v`) and Git.

## Run locally (Windows PowerShell)
```powershell
cd path\to\murali-portfolio
npm install
npm run dev        # opens http://localhost:5173
npm test           # 18 automated interaction tests
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Folder structure
```
public/            resume.pdf, favicon.svg, robots.txt, images/ (profile photo, og-image, projects/)
src/
  components/      Navbar, Hero, About, Skills, Projects, ProjectCard, ProjectDetails, Experience,
                   Education, Resume, Contact, Footer, CommandPalette, DeveloperTerminal, ...
  data/            profile.js, skills.js, projects.js, timeline.js   <- edit content here
  hooks/           useTheme, useDialog, useScrollY, useActiveSection, useFinePointer
  utils/           scroll.js, validators.js, projectFilters.js
  styles/          variables.css, global.css, animations.css, responsive.css
tests/             interaction tests (Vitest + Testing Library)
```

## Add a new project
1. Put a screenshot in `public/images/projects/` (for example `weather.png`).
2. Open `src/data/projects.js`, copy one project object to the end of the array and edit it:
```js
{
  id: "weather-app", slug: "weather-app", title: "Weather App",
  shortDescription: "One line about the app.", fullDescription: "A longer description.",
  category: "Frontend", technologies: ["React.js", "CSS"], features: ["Real feature 1"],
  role: "What you built.", problem: "", solution: "", technicalDecisions: [], challenges: [], learnings: [],
  image: "/images/projects/weather.png", gallery: [],
  githubUrl: "https://github.com/muralikrishna-26/your-real-repo", liveUrl: "https://your-real-demo-url",
  featured: false, status: "Completed", year: 2026, kind: "Project",
}
```
3. Save. The card, filter, search and details dialog update automatically. Empty fields and missing links are hidden. Use only real URLs.

## Replace the profile photo
Replace `public/images/profile.jpg` and `public/images/profile.webp` (square, 600x600 or larger is best). Update the `alt` text in `src/data/profile.js` if needed.

## Update the resume
Replace `public/resume.pdf` with your new PDF (keep the file name). Update text in `src/data/*.js` so the preview matches.

## Contact form (Formspree)
1. Create a free form at https://formspree.io and copy its endpoint (looks like `https://formspree.io/f/xxxxxxxx`).
2. Locally: copy `.env.example` to `.env` and set `VITE_FORMSPREE_ENDPOINT=<your endpoint>`, then restart `npm run dev`.
3. On Vercel: add the same variable under Project Settings > Environment Variables, then redeploy.
The endpoint is a public form URL, not a secret key. Until it is set, the form explains that it is not connected and offers a mailto link. It never shows fake success. A hidden honeypot field blocks simple bots; you can also enable reCAPTCHA in your Formspree dashboard.

## Publish to GitHub (PowerShell)
Create an empty repository on https://github.com/new first (choose your own name, e.g. `portfolio`, no README). Then:
```powershell
cd path\to\murali-portfolio
git init
git add .
git commit -m "Initial commit: React portfolio"
git branch -M main
git remote add origin https://github.com/muralikrishna-26/YOUR-REPO-NAME.git
git push -u origin main
```
GitHub asks you to sign in in a browser the first time. `.env` and `node_modules` are ignored by `.gitignore`.

## Deploy on Vercel
1. Go to https://vercel.com, sign in with GitHub, click **Add New > Project**, and import your repository.
2. Settings should auto-detect: Framework **Vite**, Build Command `npm run build`, Output Directory `dist`, Install Command `npm install`.
3. Add `VITE_FORMSPREE_ENDPOINT` under Environment Variables, then click **Deploy**.
4. Every later `git push` to `main` redeploys automatically; other branches get preview URLs.
5. Verify: open the URL, test the nav, theme toggle, `Ctrl+K`, a project dialog, `/resume.pdf` and the contact form.

### After you have the real URL
In `index.html` add `<link rel="canonical" href="https://YOUR-URL/">` and set absolute URLs for `og:image` and add `og:url`. Optionally add a `sitemap.xml` with your URL and a `Sitemap:` line in `public/robots.txt`.

## Troubleshooting
- **Build fails on Vercel**: set Node to 20.x or 22.x (Project Settings > General), run `npm run build` locally to see the error.
- **Images or PDF 404**: files must be inside `public/` and referenced with a leading slash, like `/resume.pdf`. File names are case-sensitive on Vercel.
- **Form says "not connected"**: the env variable is missing or you did not redeploy/restart after adding it.
- **PowerShell blocks npm scripts**: run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.
