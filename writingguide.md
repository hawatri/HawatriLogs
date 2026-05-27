# Writing Guide

This is the cheat sheet for writing posts on HawatriLogs. Keep it open in a tab while you write.

For the published, prose version of this same material, see `_posts/2026-05-27-authoring-guide.md`. This file is the quick reference.

---

## File location and naming

Posts live in `_posts/` and must be named:

```
YYYY-MM-DD-slug.md
```

Example: `_posts/2026-06-12-my-first-post.md`. The slug becomes the URL path (`logs.hawatri.in/blog/my-first-post/`), so use lowercase letters, numbers, and hyphens only.

Drafts go in `_drafts/` (no date prefix needed). Run `bundle exec jekyll serve --drafts` to preview them.

---

## Front matter (the YAML at the top)

Minimum:

```yaml
---
title: "Your Title Here"
date: 2026-06-12
excerpt: "One sentence summary."
---
```

Full set of fields you can use:

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Shown everywhere — header, blog grid, browser tab, search. |
| `date` | yes | `YYYY-MM-DD`. Posts are sorted by this. |
| `excerpt` | recommended | Used on cards, in `<meta description>`, in search results. |
| `thumbnail` | optional | Path to image for the blog grid card. |
| `categories` | optional | Broad buckets. Show as gray pills. |
| `tags` | optional | Finer labels. Outlined pills, max 5 displayed. |
| `author` | optional | Defaults to "Hawatri" via `_config.yml`. |

`layout: post` is set automatically by `_config.yml` — you don't need it.

---

## Headings

Start your content at H2. The post layout already renders `title` as H1.

```markdown
## Major section

### Subsection

#### Minor topic
```

Headings get a clickable `#` anchor on hover that copies a deep link to the section.

---

## Text formatting

| Want | Type |
|------|------|
| Bold | `**bold**` |
| Italic | `*italic*` |
| Both | `***both***` |
| Strikethrough | `~~strike~~` |
| Inline code | `` `code` `` |
| Keyboard key | `<kbd>Ctrl</kbd>` |
| Line break inside paragraph | end the line with two spaces |

---

## Lists

Unordered:

```markdown
- One
- Two
  - Nested (2-space indent)
- Three
```

Ordered:

```markdown
1. First
2. Second
   1. Nested
3. Third
```

Task list:

```markdown
- [x] Done
- [ ] Not done
```

---

## Links

```markdown
[external](https://example.com)
[internal](/blog/some-other-post/)
[email](mailto:hi@example.com)
```

Internal links should start with `/`.

---

## Images

Plain (no styling):

```markdown
![alt text](/assets/images/posts/my-post/cover.png)
```

Styled with border + caption (preferred for inline images):

```html
<div class="blog-image w-1/2 mx-auto">
  <img src="/assets/images/posts/my-post/diagram.png"
       alt="Describe the image for accessibility"
       loading="lazy">
  <div class="blog-image-caption">Caption text here</div>
</div>
```

Width helpers: `w-full`, `w-2/3`, `w-1/2`, `w-1/3`. Centering: `mx-auto`.

Store images under `assets/images/posts/<post-slug>/`. Always include `alt` text and `loading="lazy"`.

---

## Code blocks

Always use fenced blocks with a language tag:

````markdown
```python
def hello(name):
    return f"Hello, {name}!"
```
````

Languages used most often: `python`, `javascript`, `typescript`, `bash`, `html`, `css`, `yaml`, `json`, `sql`, `markdown`, `text`.

The site renders code blocks with:
- A header bar showing the language label
- A Copy button on the right (always visible — doesn't overlap code)
- Sticky line numbers on the left (stay pinned during horizontal scroll)
- A single dark box (no dual-box, no detached gutter)

**Never** hand-write `<pre><code>...</code></pre>` HTML — it bypasses the renderer and you lose the header, copy button, and line numbers.

For terminal output use `text`:

````markdown
```text
$ jekyll serve
Server running at http://localhost:4000
```
````

To show literal Liquid syntax (e.g. when writing about Jekyll), wrap the block in a `raw` tag pair: `{% raw %}{% raw %}{% endraw %}` and `{% raw %}{% endraw %}{% endraw %}`. (See the published authoring guide for a worked example with HTML entities — Liquid evaluates the file before markdown, so there's a trick to it.)

---

## Tables

```markdown
| A | B | C |
|---|:---:|---:|
| left | center | right |
```

Colons in the separator row control alignment: `:---` left, `:---:` center, `---:` right.

---

## Blockquotes

```markdown
> A quote.
>
> Multi-paragraph quotes use `>` on each line.
>
> > Nested quotes work too.
```

---

## Horizontal rule

Three or more `---` on their own line. Renders as a fading gradient.

---

## Callouts

Use the `.callout` classes for tip / warning / info boxes. They pick up the paper palette automatically — don't write inline `style="..."` callouts.

```html
<div class="callout callout-tip">
  <strong>Tip:</strong> A non-essential nudge or shortcut.
</div>

<div class="callout callout-warn">
  <strong>Heads up:</strong> Something can break or surprise here.
</div>

<div class="callout callout-info">
  <strong>Note:</strong> Neutral context.
</div>
```

Variants: `callout-tip` (sepia), `callout-warn` (amber), `callout-info` (sky). The variant controls the left bar and the `<strong>` accent.

Collapsible section:

```html
<details>
<summary>Click to expand</summary>

Hidden content. Markdown works inside if you leave a blank line after the `<summary>`.

</details>
```

---

## Footnotes

```markdown
A claim that needs a source[^1].

[^1]: The source.
```

Footnotes appear at the bottom of the post with backlinks.

---

## Site features available to readers

These are built in — you don't have to do anything to enable them, but it helps to know they exist while you're writing:

- **Search**: indexes title, excerpt, and categories. Make those count. Press `/` to focus the search box.
- **Reading progress bar**: thin bar at the top fills as the reader scrolls.
- **Back to top**: floating button appears after 400px of scroll.
- **Heading anchors**: hovering a heading reveals a `#` that copies a direct link.
- **Dark mode**: toggle in Settings. Uses the site's CSS, not Tailwind dark variants.
- **Reading time**: auto-calculated from word count (180 wpm).

---

## Skeleton to copy

```markdown
---
title: "Your Title"
date: 2026-06-12
excerpt: "One sentence that sells the post."
categories: [tutorial]
tags: [topic-one, topic-two]
---

A short opening paragraph — what the reader will learn and why it matters.

## First major section

Content.

### A subsection

Detail.

## Second major section

Content.

## Wrapping up

What to try next.
```

---

## Workflow

```bash
bundle exec jekyll serve         # http://localhost:4000, live reload
bundle exec jekyll serve --drafts # include _drafts/
```

1. Create the file in `_posts/`.
2. Save — Jekyll rebuilds.
3. Refresh `http://localhost:4000/blog/your-slug/`.
4. When happy: `git add`, `git commit`, `git push`. GitHub Pages does the rest.

---

## Don't

- Don't hand-roll `<pre><code>` blocks. Use fenced ` ``` ` blocks.
- Don't start content with `# H1`. The layout handles that.
- Don't inline a style you'll need on more than one post — add it to `styles.css` instead.
- Don't commit `_site/` (already gitignored).
- Don't commit images you haven't actually placed under `assets/images/posts/<slug>/`.

---

## Quick checklist before publishing

- [ ] Front matter has `title`, `date`, `excerpt`
- [ ] Filename matches `YYYY-MM-DD-slug.md` and the date inside
- [ ] All images have `alt` text and `loading="lazy"`
- [ ] Code blocks use fenced syntax with a language tag
- [ ] Internal links start with `/`
- [ ] Previewed locally
