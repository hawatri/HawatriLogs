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

**Permalinks.** Posts resolve to `/blog/:title/` (set in both `permalink:` and the `posts` collection config in `_config.yml`). The `blog/` directory at the repo root only holds post images — the `/blog/` listing page itself is `blog.md`.

**Client-side search.** `search.json` is a Liquid template that emits a JSON array of every post (title, url, date, excerpt, categories) at build time. `assets/js/main.js` `initializeSearch()` fetches `/search.json` once on page load and filters client-side as the user types, with debouncing and arrow-key navigation. When adding searchable fields to posts, update both `search.json` (to expose the field) and `performSearch` in `main.js` (to match against it).

**Dark mode.** Toggled from `settings.md`, persisted in `localStorage` under the `darkMode` key, applied by adding a `dark` class to `<html>` and `<body>` in `main.js`. Dark-mode styles live in `styles.css` under `.dark` selectors — Tailwind's `dark:` variant is **not** wired up (no `darkMode: 'class'` config since Tailwind is CDN-only), so use plain CSS in `styles.css` rather than Tailwind dark variants.

**Syntax highlighting / code blocks.** All highlighters are off (`highlighter: none` in `_config.yml`, plus `kramdown.syntax_highlighter: null`). Fenced ```` ```lang ```` blocks emit plain `<pre><code class="language-lang">…</code></pre>`. On page load, `initializeCodeBlocks()` in `assets/js/main.js` walks every `#contentArea pre`, wraps each line in `<span class="line">`, and adds a Copy button. Line numbers are rendered by a CSS counter on `.line::before` in `styles.css` — there is **no separate gutter element**, so line numbers and code share the same box. To author a code block, just write a normal fenced block; don't use `<div class="code-snippet">` or hand-rolled `<pre><code>` HTML (those bypass kramdown and produce raw, unwrapped output).

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
