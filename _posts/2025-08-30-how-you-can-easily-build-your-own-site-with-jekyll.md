---
layout: post
title: "How You Can Easily Build Your Own Site with Jekyll"
date: 2025-08-30
excerpt: "Discover how to create a beautiful, fast, and maintainable website using Jekyll - the static site generator that powers GitHub Pages."
thumbnail: "/assets/images/posts/2025-08-30-jekyll-tutorial/thumbnail.jpg"
categories: [tutorial, web-development]
tags: [jekyll, static-sites, github-pages, web-development]
---

Building your own website doesn't have to be complicated or expensive. With Jekyll, you can create a beautiful, fast, and maintainable site that's perfect for blogs, portfolios, or documentation. Let's explore how you can get started with this powerful static site generator.

<div class="blog-image w-1/2 mx-auto">
  <img src="{{ '/assets/images/posts/2025-08-30-jekyll-tutorial/thumbnail.jpg' | relative_url }}"
       alt="Description"
       loading="lazy">
  <div class="blog-image-caption">
    Create Your Own Sites
  </div>
</div>

## What is Jekyll?

Jekyll is a static site generator written in Ruby that transforms your plain text files into a complete website. It's the engine behind GitHub Pages, which means you can host your site for free directly from your GitHub repository.

### Why Choose Jekyll?

- **Fast Performance**: Static sites load incredibly quickly
- **Free Hosting**: Deploy to GitHub Pages at no cost
- **Markdown Support**: Write content in simple markdown format
- **Customizable**: Full control over design and functionality
- **SEO Friendly**: Clean URLs and optimized structure

## Getting Started

### Prerequisites

Before diving in, you'll need:
- Basic knowledge of HTML/CSS
- Git installed on your computer
- A GitHub account
- Ruby installed (for local development)

### Installation

```bash
# Install Jekyll
gem install jekyll bundler

# Create a new Jekyll site
jekyll new my-awesome-site

# Navigate to your site directory
cd my-awesome-site

# Start the local server
bundle exec jekyll serve
```

Your site will be available at `http://localhost:4000`!

## Project Structure

A typical Jekyll site looks like this:

```text
my-site/
├── _posts/          # Blog posts go here
├── _layouts/        # HTML templates
├── _includes/       # Reusable components
├── _sass/           # Sass stylesheets
├── assets/          # Images, CSS, JavaScript
├── _config.yml      # Site configuration
└── index.md         # Homepage content
```

## Writing Your First Post

Create a new file in the `_posts` directory with the naming convention `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "My First Jekyll Post"
date: 2025-08-30
categories: [blogging, jekyll]
---

Welcome to my Jekyll blog! This is my first post.

## Getting Started

Jekyll makes it easy to write in Markdown and have it
converted to beautiful HTML automatically.

### Features I Love

- Simple markdown syntax
- Automatic syntax highlighting
- Built-in pagination
- Theme support
```

## Customizing Your Site

### Configuration

Edit `_config.yml` to customize your site:

```yaml
title: My Awesome Site
description: A blog about web development and life
author: Your Name
email: your-email@example.com
url: "https://yourusername.github.io"

# Build settings
markdown: kramdown
highlighter: rouge
permalink: /posts/:title/

# Plugins
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
```

### Layouts and Includes

Create reusable templates in `_layouts` and components in `_includes`:

{% raw %}
```html
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html>
<head>
  <title>{{ page.title }} - {{ site.title }}</title>
  <meta name="description" content="{{ page.excerpt | strip_html }}">
</head>
<body>
  {% include header.html %}

  <main>
    {{ content }}
  </main>

  {% include footer.html %}
</body>
</html>
```
{% endraw %}

## Styling with Sass

Jekyll has built-in Sass support. Create a `_sass` directory and import your stylesheets:

```scss
// assets/css/main.scss
---
---
@import "base";
@import "layout";
@import "components";
```

## Adding Features

### Search Functionality

```javascript
// assets/js/search.js
function performSearch() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('h2').textContent.toLowerCase();
    const content = post.querySelector('.excerpt').textContent.toLowerCase();

    if (title.includes(query) || content.includes(query)) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}
```

### Contact Form

```html
<!-- _includes/contact-form.html -->
<form action="https://formspree.io/f/your-form-id" method="POST">
  <label for="name">Name:</label>
  <input type="text" name="name" required>

  <label for="email">Email:</label>
  <input type="email" name="email" required>

  <label for="message">Message:</label>
  <textarea name="message" required></textarea>

  <button type="submit">Send</button>
</form>
```

## Deployment to GitHub Pages

1. **Create a GitHub repository** named `username.github.io`
2. **Push your Jekyll site** to the repository
3. **Enable GitHub Pages** in repository settings
4. **Your site is live** at `https://username.github.io`

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to your repository root
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

```text
# CNAME file content
www.yourdomain.com
```

## Performance Optimization

### Image Optimization

{% raw %}
```html
<!-- Responsive images -->
<picture>
  <source media="(max-width: 768px)" srcset="{{ '/assets/images/mobile-image.jpg' | relative_url }}">
  <img src="{{ '/assets/images/desktop-image.jpg' | relative_url }}" alt="Description">
</picture>
```
{% endraw %}

### Minification

Add to your `_config.yml`:

```yaml
sass:
  style: compressed

plugins:
  - jekyll-minifier
```

## Advanced Tips

### Collections

Create custom content types beyond posts:

```yaml
# _config.yml
collections:
  projects:
    output: true
    permalink: /projects/:name/
```

### Data Files

Store structured data in `_data` directory:

```yaml
# _data/team.yml
- name: John Doe
  role: Developer
  image: john.jpg

- name: Jane Smith
  role: Designer
  image: jane.jpg
```

### Liquid Templating

Use Jekyll's templating language for dynamic content:

{% raw %}
```liquid
{% for post in site.posts limit:5 %}
  <article>
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <time>{{ post.date | date: "%B %d, %Y" }}</time>
    <p>{{ post.excerpt }}</p>
  </article>
{% endfor %}
```
{% endraw %}

## Common Pitfalls to Avoid

1. **Not testing locally** before deploying
2. **Forgetting to update gems** regularly
3. **Not optimizing images** before uploading
4. **Ignoring SEO basics** like meta tags and alt text
5. **Not backing up** your content regularly

## Useful Plugins

Extend Jekyll's functionality with these popular plugins:

- `jekyll-sitemap` - Generate XML sitemap
- `jekyll-feed` - Create RSS/Atom feeds
- `jekyll-seo-tag` - Add SEO meta tags
- `jekyll-paginate` - Paginate blog posts
- `jekyll-archives` - Generate archive pages

## Conclusion

Jekyll offers a perfect balance of simplicity and power for building modern websites. Whether you're creating a personal blog, portfolio, or documentation site, Jekyll's static site generation approach ensures fast performance and easy maintenance.

The best part? Once you understand the basics, you can focus on what matters most: creating great content. Your readers will thank you for the fast loading times, and you'll appreciate the simple workflow.

Ready to start building? Head over to [Jekyll's official documentation](https://jekyllrb.com/docs/) and begin your journey into static site generation today!

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Guide](https://pages.github.com/)
- [Jekyll Themes](https://jekyllthemes.io/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Jekyll Talk Community](https://talk.jekyllrb.com/)
