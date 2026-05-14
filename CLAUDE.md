# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static portfolio website for a SharePoint developer. No build toolchain — open `index.html` directly in a browser to preview. Three files contain all logic: `index.html`, `style.css`, `script.js`.

## Architecture

- **Swiper.js** (loaded from CDN) drives the project carousel in `index.html`.
- **Modal system**: clicking a `.project` card calls `openModal(projectId)`, which dynamically injects `<img>` tags from a hardcoded map in `script.js`. The `openModal`/`closeModal` functions are defined inside a `DOMContentLoaded` callback but invoked via inline `onclick` attributes — they must remain globally scoped or the `onclick` handlers will break.
- **Language toggle**: `script.js` wires a `#languageToggle` button (EN ↔ ES) using a `translations` object. This button does not currently exist in `index.html`.
- **Project images**: named `images/projectN.png` (thumbnail shown in card) and `images/projectN.M.png` (additional images shown in modal). Add new entries to the `images` map in `openModal` when adding projects.

## Known inconsistencies to be aware of

- `script.js` `translations` covers only projects 1–4; the HTML has 5 projects.
- Project 5's modal references `images/project5.1.png` and `images/project5.2.png`, which may not exist yet.
- The `#languageToggle` button referenced in `script.js` is absent from `index.html`.

## Styling conventions

- Brand colors: `#0078d4` (Microsoft blue, primary), `#005a9e` (darker blue, secondary/footer).
- Responsive breakpoint at `768px` — single column below, two-column grid above.
