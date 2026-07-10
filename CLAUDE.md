# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static, bilingual (EN/ES) portfolio website for a SharePoint developer. No build
toolchain — open `index.html` directly in a browser to preview. Three files
contain all logic: `index.html`, `style.css`, `script.js`. Dev tooling (`serve`,
`@playwright/test`, `sharp`) lives in `package.json` but is not needed to view
the site.

## Architecture

- **No runtime dependencies / no CDN scripts.** Everything is vanilla JS. (An
  earlier version used Swiper.js for a carousel — it has been removed.)
- **Modal system**: clicking a `.project-card` calls `openModal(projectId)`,
  which dynamically injects `<img>` tags from the `projectImages` map in
  `script.js`. `openModal`/`closeModal` are assigned to `window` at the top of
  `script.js` (outside `DOMContentLoaded`) because they are invoked via inline
  `onclick` attributes — they must stay globally scoped or the handlers break.
  The modal is a `role="dialog"` with focus management (focus moves to the close
  button on open and is restored on close).
- **Language toggle**: `#languageToggle` (in the nav) switches EN ↔ ES via the
  `translations`, `placeholders`, and `messages` objects in `script.js`. The
  choice is persisted to `localStorage` (`lang`) and the browser locale is used
  as the default. `applyLanguage()` also updates `<html lang>`.
- **Dark mode**: `#themeToggle` toggles a `.dark` class on `<body>`, persisted to
  `localStorage` (`theme`).
- **Progressive enhancement**: an inline `<head>` script adds a `.js` class to
  `<html>`. Reveal animations (`.js .reveal`, `opacity:0`) only hide content when
  JS is present, so the page stays fully readable without JavaScript.
- **Project images**: `images/projectN.webp` (card thumbnail) and
  `images/projectN.M.webp` (modal screenshots). Projects 6 & 7 use SVG
  placeholders. When adding a project, add an entry to `projectImages` in
  `script.js` and a `.project-card` in `index.html`.

## Conventions

- Brand colors: `#0078d4` (Microsoft blue, primary), `#005a9e` (darker blue,
  secondary/footer).
- Responsive breakpoint at `768px` — single column below, two-column grid above.
- CSS honors `@media print` and `@media (prefers-reduced-motion: reduce)`.
- Images are WebP; regenerate from source with `sharp` if needed.
