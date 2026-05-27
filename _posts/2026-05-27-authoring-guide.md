---
layout: post
title: "Authoring Guide: How to Write Posts on HawatriLogs"
date: 2026-05-27
excerpt: "A practical reference for writing posts on this site — front matter, every formatting tag, code blocks, images, and the custom helpers that ship with HawatriLogs."
categories: [meta, guide]
tags: [authoring, markdown, jekyll, reference]
---

This guide is the one I wish I had when I started writing here. It's tailored to *this* site — not a generic markdown cheat sheet — so it covers exactly what works, what doesn't, and where the custom helpers live.

## The 30-second version

Every post is a markdown file in `_posts/` named `YYYY-MM-DD-slug.md`. It needs a front matter block at the top, then your content below. That's it.

```markdown
---
title: "My Post Title"
date: 2026-05-27
excerpt: "One-line summary that shows up in cards and search."
categories: [tutorial]
tags: [example, getting-started]
---

Your content goes here.
```

You don't need to set `layout: post` — `_config.yml` defaults to it for everything in `_posts/`.

---

## Front matter, field by field

| Field | Required | What it does |
|-------|----------|--------------|
| `title` | yes | Shown in the post header, blog grid, browser tab, and search results. |
| `date` | yes | Sorts posts chronologically. Format: `YYYY-MM-DD`. |
| `excerpt` | recommended | Used on the blog grid, in `<meta description>`, and in the search dropdown. Keep it under one line. |
| `thumbnail` | optional | Path to an image shown on the blog grid card. Falls back to a generated placeholder if missing. |
| `categories` | optional | Broad buckets. Show up as gray pills on the post header. |
| `tags` | optional | Finer-grained labels. Show up as outlined pills (max 5 displayed). |
| `author` | optional | Defaults to "Hawatri" via `_config.yml`. |

A common pattern:

```yaml
---
title: "Building a Search Index in Jekyll"
date: 2026-05-27
excerpt: "How HawatriLogs uses search.json plus a tiny client-side filter to make every post searchable."
thumbnail: /assets/images/posts/search/cover.jpg
categories: [tutorial, jekyll]
tags: [search, javascript, performance]
---
```

---

## Text basics

**Bold** with `**double asterisks**`, *italic* with `*single asterisks*`, ***bold italic*** with `***triple***`. ~~Strikethrough~~ uses `~~tildes~~`. Inline code uses `` `backticks` ``.

You can mix HTML when markdown can't express what you need — for example <kbd>Ctrl</kbd> + <kbd>C</kbd> uses the `<kbd>` tag.

Paragraphs are just blank lines apart. To force a line break inside a paragraph, end the line with two spaces.

---

## Headings

```markdown
# H1 — reserved for the post title (front matter handles this)
## H2 — major sections
### H3 — subsections
#### H4 — minor topics
##### H5
###### H6
```

The post layout already renders the title as an H1, so **start your content at H2**. H1 and H2 get an underline in this site's styles, which is how you visually anchor sections.

---

## Lists

Unordered:

```markdown
- First
- Second
  - Nested (two-space indent)
  - Another nested
- Back to top level
```

Ordered:

```markdown
1. Step one
2. Step two
   1. Sub-step
3. Step three
```

Task lists work too:

- [x] Done
- [ ] Not done yet

---

## Links

```markdown
[external](https://example.com)
[internal](/blog/some-other-post/)
[email](mailto:hi@example.com)
<https://auto-linked.com>
```

For internal links, prefer relative URLs starting with `/` so they work whether the site is at the root or under a subpath.

---

## Images

### The simple way

```markdown
![alt text](/assets/images/posts/my-post/screenshot.png)
```

Store images under `assets/images/posts/<slug>/` so they stay co-located with the post.

### The styled way (recommended)

This site has a `.blog-image` helper that adds a border, rounded corners, and an optional caption — it matches the rest of the site's look.

{% raw %}
```html
<div class="blog-image w-1/2 mx-auto">
  <img src="{{ '/assets/images/posts/my-post/diagram.png' | relative_url }}"
       alt="Architecture diagram showing the request flow"
       loading="lazy">
  <div class="blog-image-caption">
    Request flow from browser to origin
  </div>
</div>
```
{% endraw %}

The Tailwind classes (`w-1/2`, `mx-auto`) control width and centering. Use `w-full` for full width, `w-2/3` for two-thirds, etc.

`loading="lazy"` is worth adding to every image — it defers off-screen images so the page stays fast.

---

## Code blocks

Use fenced blocks with a language tag. The site renders them in a single dark box with line numbers and a copy button — no extra HTML needed.

````markdown
```python
def hello(name):
    return f"Hello, {name}!"
```
````

Languages I use most: `python`, `javascript`, `typescript`, `bash`, `html`, `css`, `yaml`, `json`, `sql`, `markdown`. The language tag doesn't currently change the colors (syntax highlighters are off — keeps the dark box clean and avoids dependency drift), but it's still good practice to keep it for future-proofing.

For plain text or terminal output, use `text`:

```text
$ jekyll serve
Server running at http://localhost:4000
```

### Inline code vs blocks

Use inline `` `code` `` for variable names, file paths, function names, short snippets. Use a block for anything multi-line or anything someone might want to copy.

### Showing Liquid template tags

If you're writing about Jekyll itself and need to show literal Liquid like <code>&#123;&#123; page.title &#125;&#125;</code> or <code>&#123;% for ... %&#125;</code> without Jekyll executing them, wrap the block in a `raw` tag. The trick: the literal opening tag is <code>&#123;% raw %&#125;</code> and the closer is <code>&#123;% endraw %&#125;</code>. Inside that pair, Jekyll won't try to evaluate anything.

In a code block it looks like this (the `raw` markers themselves are written using HTML entities here so Jekyll doesn't eat them):

<pre><code>&#123;% raw %&#125;
&#96;&#96;&#96;liquid
&#123;% for post in site.posts %&#125;
  &#123;&#123; post.title &#125;&#125;
&#123;% endfor %&#125;
&#96;&#96;&#96;
&#123;% endraw %&#125;</code></pre>

When you write your real post you'll type those as plain `{`, `%`, `}` characters — no entities needed. The entities above are only because *this* post is itself rendered by Jekyll.

---

## Tables

```markdown
| Column A | Column B | Column C |
|----------|:--------:|---------:|
| Left     | Center   |    Right |
| default  | aligned  | aligned  |
```

The colons in the separator row control alignment: `:---` left, `:---:` center, `---:` right.

Tables get a black border and zebra striping automatically. On mobile they scroll horizontally instead of breaking the layout.

---

## Blockquotes

```markdown
> A single-line quote.

> A multi-paragraph quote.
>
> Each paragraph starts with a `>`.

> Quotes can contain **bold**, *italic*, `code`, and even
>
> > nested quotes.
```

Use them for actual quotations, callouts, or "important note" blocks.

---

## Horizontal rules

Three or more `---`, `***`, or `___` on their own line:

```markdown
---
```

The site renders these as a fading gradient — good for separating major sections within a long post.

---

## Footnotes

```markdown
This needs a citation[^1].

[^1]: Source goes here.
```

Footnotes appear at the bottom of the post with backlinks. Useful for sources without cluttering the main text.

---

## Callouts

For tip / warning / info boxes, use the built-in `.callout` classes — they pick up the paper palette and look right in both light and dark mode without any inline colors.

```html
<div class="callout callout-tip">
  <strong>Tip:</strong> Use this for non-essential nudges or shortcuts.
</div>

<div class="callout callout-warn">
  <strong>Heads up:</strong> Use this when something can break or surprise.
</div>

<div class="callout callout-info">
  <strong>Note:</strong> Use this for neutral context.
</div>
```

The variant controls the left bar color and the `<strong>` accent. Don't write inline `style="..."` callouts — they bake in colors that fight the theme.

For collapsible sections:

```html
<details>
<summary>Click to expand</summary>

Hidden content here. Markdown works inside, as long as there's a blank line
after the `<summary>`.

</details>
```

---

## A skeleton you can copy

Save this as `_posts/2026-05-27-my-new-post.md` and start writing:

```markdown
---
title: "Your Title Here"
date: 2026-05-27
excerpt: "One sentence that sells the post."
categories: [tutorial]
tags: [topic, another-topic]
---

A short opening paragraph that tells the reader what they'll learn and why
it matters. Two or three sentences max.

## First major section

Content here.

### A subsection

More detail.

## Second major section

Content here.

## Wrapping up

A short closing — what to try next, or a question to leave with.
```

---

## Workflow

1. Start the local server: `bundle exec jekyll serve`
2. Create your post in `_posts/`
3. Save — Jekyll rebuilds automatically
4. Refresh `http://localhost:4000/blog/your-slug/`
5. When it looks right, `git commit && git push` — GitHub Pages handles the rest

If you want to draft something without publishing, put it in `_drafts/` instead and run `bundle exec jekyll serve --drafts`. Drafts don't ship to production until you move them into `_posts/` with a date.

---

## What to avoid

- Don't hand-roll `<pre><code>...</code></pre>` blocks — they bypass kramdown and skip the copy button and line numbers. Always use fenced ```` ``` ```` blocks.
- Don't use H1 in your content — the layout already renders the title as H1.
- Don't inline styles you'll need on more than one post. If you find yourself copy-pasting a `<div style="...">` callout, add a class to `styles.css` and use that instead.
- Don't commit `_site/` — it's the build output and is gitignored.

---

That's the whole toolbox. Most posts only need front matter, headings, paragraphs, and a few code blocks. Reach for the rest when the content actually calls for it.
