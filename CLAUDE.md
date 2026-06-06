# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bundle install                      # install gems (first run / after Gemfile changes)
bundle exec jekyll serve            # local dev server at http://localhost:4000 with live reload
bundle exec jekyll serve --drafts   # include _drafts/
bundle exec jekyll build            # one-shot build into _site/
bundle exec jekyll clean            # clear _site/ and .jekyll-cache/
```

Ruby 3.4 on Windows. `wdm` and `tzinfo-data` are in the Gemfile specifically for that platform — don't remove them. `timezone` in `_config.yml` is intentionally commented out to avoid Windows tzinfo issues.

## Architecture

Jekyll 4.3 static site deployed to GitHub Pages under the custom domain `logs.hawatri.in` (set via `CNAME`). There is no JS build step — Tailwind is loaded from the CDN in `_layouts/default.html`, and `styles.css` ships as-is.

**Layout chain.** Every page renders through `_layouts/default.html`, which owns the full chrome: header, nav, sidebar (recent posts via `_includes/recent-posts.html`), main content slot, footer, and the `<script src="/assets/js/main.js">` tag. Other layouts wrap content and delegate up:

- `page.html` → `default` (used by `index.md`, `about.md`, `settings.md`, and the site default for pages)
- `post.html` → `default` (post header/meta, prev/next nav, back-to-blog footer; site default for `_posts`)
- `blog.html` → `default` (the post grid rendered by `blog.md`)

When changing site-wide chrome (nav, header, footer, sidebar), edit `default.html`. Per-content-type changes go in the matching layout.

## Design system — "Scribble / Hand-Drawn Notebook"

The whole site is styled to look hand-sketched in a notebook. The visual language lives in `styles.css`; layouts and pages compose it with utility classes. Keep these signatures intact when adding UI:

- **Font.** "Kalam" (Google Fonts, weights 300/400/700) on the entire `<body>` — headings, copy, buttons, inputs, code header. Loaded via the `<link>` in `default.html`. There is no `font-[Indie Flower]` anymore; don't reintroduce per-element font classes.
- **Paper + grid.** Cream `--paper` (`#fdfbf7`) background with a faint 24px notebook grid (`.bg-grid-pattern`, also applied to `<body>`). Pages and large surfaces stay cream; only cards/notes use pastel or paper-card fills. Never pure white.
- **Wobbly borders (the #1 signature).** `.border-sketch` and `.border-sketch-2` apply an uneven `border-radius` (`255px 15px 225px 15px / …`) so corners never match. `.border-sketch-dashed` is for empty/placeholder states. Alternate `border-sketch`/`border-sketch-2` between neighbouring cards. The chrome boxes (header/nav/aside/#contentArea/footer) get this radius directly in `styles.css`. **The old SVG `#pencil-border` displacement filter is retired** — wobble now comes purely from the asymmetric radius. Don't re-add the filter.
- **Pastel sticky notes.** `.note-yellow|pink|blue|green|purple` set the fill (all token-driven so dark mode adapts). Decorate a note with EITHER a `.tape .tape-{color}` strip OR a `.pin .pin-{color}` dot — both need `position: relative` on the note (`relative` class in markup). Add a small `rotate-*` Tailwind class for the casually-placed feel.
- **Marker underline.** Wrap heading text in `<span class="marker">…<span class="marker-line marker-line-{color}"></span></span>` for a rotated highlighter swipe (used on the logo, sidebar title, page titles, post titles). Not `text-decoration`.
- **Sketch buttons.** `.sketch-btn` (optionally `+ .note-{color}`) for CTAs — wobbly pill that straightens/lifts on hover.
- **Ink doodles (never emoji).** Every symbol is a monochrome inline SVG with `stroke="currentColor"`, `stroke-width="2"`, round caps, `class="doodle"`, and `aria-hidden="true"`. **No Unicode emoji anywhere** — that breaks the illusion. The catalog (star, sparkle, waving hand, happy/surprised face, curved arrow, heart, lightbulb, music notes, paper plane, scribble sparkline) is in `master-prompt.md` §8 for reference; reuse and remix these.
- **Dark mode.** All of the above is driven by CSS custom properties in `:root` / `.dark` (paper, ink, note, tape tokens), so dark mode "just works" — set colors via the tokens, not hard-coded hex.

**Permalinks.** Posts resolve to `/blog/:title/` (set in both `permalink:` and the `posts` collection config in `_config.yml`). The `blog/` directory at the repo root only holds post images — the `/blog/` listing page itself is `blog.md`.

**Client-side search.** `search.json` is a Liquid template that emits a JSON array of every post (title, url, date, excerpt, categories) at build time. `assets/js/main.js` `initializeSearch()` fetches `/search.json` once on page load and filters client-side as the user types, with debouncing and arrow-key navigation. When adding searchable fields to posts, update both `search.json` (to expose the field) and `performSearch` in `main.js` (to match against it).

**Dark mode.** Toggled from `settings.md`, persisted in `localStorage` under the `darkMode` key, applied by adding a `dark` class to `<html>` and `<body>` in `main.js`. Dark-mode styles live in `styles.css` under `.dark` selectors — Tailwind's `dark:` variant is **not** wired up (no `darkMode: 'class'` config since Tailwind is CDN-only), so use plain CSS in `styles.css` rather than Tailwind dark variants.

**Syntax highlighting / code blocks.** All highlighters are off (`highlighter: none` in `_config.yml`, plus `kramdown.syntax_highlighter: null`). Fenced ```` ```lang ```` blocks emit plain `<pre><code class="language-lang">…</code></pre>`. On page load, `initializeCodeBlocks()` in `assets/js/main.js` walks every `#contentArea pre`, wraps it in a `.code-block` shell with a `.code-header` (language label + Copy button), and rewrites each line as `<span class="line"><span class="ln">N</span><span class="lc">code</span></span>` — so line numbers live in a real `.ln` gutter element (sticky on horizontal scroll), not a CSS counter. Code blocks are styled to match the notebook: sunken-paper background, wobbly `border-sketch` radius, a pastel-blue header with a dashed tear-line, ink-on-paper text, and a small sketch Copy button (all token-driven, so dark mode adapts). Code is single-ink — there is no syntax coloring. To author a code block, just write a normal fenced block; don't use `<div class="code-snippet">` or hand-rolled `<pre><code>` HTML (those bypass kramdown and produce raw, unwrapped output).

## Posts

Create files in `_posts/` named `YYYY-MM-DD-slug.md` with front matter:

```yaml
---
layout: post          # optional; defaulted by _config.yml
title: "..."
date: 2025-09-03
excerpt: "..."
thumbnail: /blog/images/foo.png  # optional; falls back to a generated placeholder
categories: [...]
tags: [...]
---
```

Defaults from `_config.yml` already supply `layout: post`, `author: Hawatri`, and `show_date: true`, so post front matter only needs to override what differs.

## Domain configuration

`url: https://logs.hawatri.in` and `baseurl: ""` in `_config.yml` are paired with the `CNAME` file. If the custom domain ever moves back to `hawatri.github.io/HawatriLogs`, all three need to change together (url, baseurl, and CNAME) — otherwise absolute URLs in layouts and `search.json` will break.
