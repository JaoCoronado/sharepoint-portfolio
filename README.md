# Jair Y. Coronado A. — SharePoint Developer Portfolio

A bilingual (EN/ES), static personal portfolio for a Senior Software Engineer &
SharePoint developer. Hero, experience timeline, filterable project grid with
image modals, animated stats, dark mode, and a working contact form — all with
no build step.

**Live:** open `index.html` in any browser.

---

## 🧱 Tech stack

- Plain **HTML + CSS + vanilla JS** — no framework, no bundler.
- `IntersectionObserver` for scroll reveals, scroll-spy, and stat count-ups.
- **Formspree** for the contact form (AJAX submit).
- Images served as **WebP**; the modal gallery injects screenshots on demand.
- Dark mode and language preference persisted in `localStorage`.

## 📂 Structure

| File | Purpose |
|------|---------|
| `index.html` | All markup — nav, hero, stats, experience, projects, skills, contact, modal |
| `style.css`  | Styles, dark mode, responsive breakpoint (768px), print & reduced-motion |
| `script.js`  | Modal, language toggle, dark mode, filters, reveal/stat animations, form |
| `images/`    | Project thumbnails (`projectN.webp`) and modal screenshots (`projectN.M.webp`) |
| `docs/`      | Downloadable CV (DOCX and PDF) |

## ▶️ Running locally

No dependencies are required to view the site — just open `index.html`.

For a local server (matches production paths) and the Playwright test tooling:

```bash
npm install          # dev tooling: serve, @playwright/test, sharp
npx serve .          # serves the site at http://localhost:3000
```

## 🖼️ Optimizing images

Screenshots are stored as WebP. To re-generate from source PNGs, `sharp` is the
image pipeline (see commit history for the conversion approach).

---

## 🚀 Featured projects

- **Flight Booking Platform** (Southwest Airlines · Omnicom) – React / TypeScript / Micro Frontends
- **Future You – Learning Platform** (AT&T · Omnicom) — SPFx / React / TypeScript
- **Self Nomination Portal** (AT&T · Omnicom) — Power Apps / Power Automate
- **Corporate Intranet Portal** — SPFx migration of a legacy intranet
- **P10 Intranet Portal** (P10 Holdings · SIIMPL) — real-time stock ticker
- **Financial Operations Management** — SharePoint + Power Automate approvals
- **Company Voting System** — secure, encrypted voting with real-time reporting
- **Corporate Requests System** — ticketing with Power Automate & Excel export

## 📬 Contact

- [LinkedIn](https://www.linkedin.com/in/jaircoronadoalbarracin/)
- [Email](mailto:jairyesidk@gmail.com)
