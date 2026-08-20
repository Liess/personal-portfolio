# Ernest John Maskariño

Personal portfolio of a Senior Integration Consultant and Lead Consultant at CGI Philippines. The site covers API-led work, career history, selected projects, and how to get in touch.

**Live from this repo:** open `index.html` locally, or enable [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-github-pages-source) on the `main` branch (site root stays `index.html`).

## What’s here

- **Home** — about, what I do, metrics, career timeline, work, stack, Direct vs Layered connectivity, credentials, contact
- **Resume** — downloadable CV (`assets/docs/ejmaskarino-cv.pdf`)
- **Ask EJ** — on-page chat that answers from resume content (no live model)
- **Side quest** — more into me, travel atlas, desk/space, vlog, blogs
- **Investment portfolio** — placeholder for later

## Run locally

This is a static site. No build step or dependencies.

```bash
# Python 3
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

You can also open `index.html` directly in a browser. Some features work better from a local server.

## Layout

```
index.html                 Home (GitHub Pages entry)
side-quest.html            Off-the-clock page
travel.html                City photo galleries
investment.html            Placeholder
coming-soon.html           Generic coming-soon
css/styles.css             Theme, layout, motion
js/
  script.js                Chat, accordion, carousel, metric rollers
  travel-map.js            Travel atlas + city galleries
assets/
  images/portraits/        Profile photos
  images/brand/            Unused/source logos
  maps/                    World atlas SVG
  video/                   Desk setup clip
  docs/                    Resume PDF
  gallery/                 Travel photos by Country/City
```

Night-sky palette, Inter type, custom cursor on fine pointers, and scroll-in motion (respects `prefers-reduced-motion`).

## Contact

- Email: [maskarinoernestjohn@gmail.com](mailto:maskarinoernestjohn@gmail.com)
- LinkedIn: [linkedin.com/in/ejmaskarino](https://www.linkedin.com/in/ejmaskarino)
- Philippines
