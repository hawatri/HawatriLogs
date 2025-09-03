---
layout: post
title: "The Complete Guide to Writing Amazing Blog Posts: Every Element Explained"
date: 2025-08-31
excerpt: "Learn how to use every single formatting element available in your Jekyll blog - from basic text to advanced code blocks, images, tables, and more."
thumbnail: "/assets/images/posts/complete-guide/thumbnail.jpg"
categories: [tutorial, blogging, markdown]
tags: [jekyll, markdown, writing, formatting, guide, tutorial]
author: "Hawatri"
---

Welcome to the ultimate guide on using every formatting element available in your Jekyll blog! This post will demonstrate every single feature you can use to create rich, engaging content. Whether you're a beginner or looking to master advanced formatting, this comprehensive guide has you covered.

## Table of Contents

1. [Text Formatting Basics](#text-formatting-basics)
2. [Headings and Structure](#headings-and-structure)
3. [Lists and Organization](#lists-and-organization)
4. [Links and References](#links-and-references)
5. [Images and Media](#images-and-media)
6. [Code and Technical Content](#code-and-technical-content)
7. [Tables and Data](#tables-and-data)
8. [Quotes and Emphasis](#quotes-and-emphasis)
9. [Advanced Formatting](#advanced-formatting)
10. [Best Practices](#best-practices)

---

## Text Formatting Basics

Let's start with the fundamental text formatting options available to you:

### Basic Text Styles

This is **bold text** using double asterisks, and this is *italic text* using single asterisks. You can also combine them for ***bold and italic text***.

You can create ~~strikethrough text~~ using double tildes, and `inline code` using backticks.

For emphasis, you can use <u>underlined text</u> with HTML tags when needed.

### Paragraph Formatting

Paragraphs are automatically created by leaving blank lines between text blocks. This makes your content easy to read and properly spaced.

You can create line breaks within a paragraph by ending a line with two spaces  
Like this line, which appears directly below the previous one.

---

## Headings and Structure

Use different heading levels to organize your content hierarchically:

# Heading 1 (H1) - Main Title
## Heading 2 (H2) - Major Sections
### Heading 3 (H3) - Subsections
#### Heading 4 (H4) - Minor Topics
##### Heading 5 (H5) - Detailed Points
###### Heading 6 (H6) - Smallest Headings

**Best Practice:** Use H1 for your main title, H2 for major sections, H3 for subsections, and so on. This creates a logical content hierarchy.

---

## Lists and Organization

### Unordered Lists

Create bullet point lists using hyphens, asterisks, or plus signs:

- First item in the list
- Second item with **bold text**
- Third item with *italic text*
- Fourth item with `inline code`
  - Nested item (indent with 2 spaces)
  - Another nested item
    - Even deeper nesting
- Back to main level

### Ordered Lists

Create numbered lists using numbers followed by periods:

1. First numbered item
2. Second numbered item
3. Third numbered item with a very long description that demonstrates how list items can contain multiple lines of text and still maintain proper formatting
   1. Nested numbered item
   2. Another nested item
      1. Triple nested item
4. Back to main numbering

### Task Lists

Create interactive checkboxes (great for tutorials and guides):

- [x] Completed task
- [x] Another completed item
- [ ] Uncompleted task
- [ ] Another uncompleted item
  - [x] Nested completed task
  - [ ] Nested uncompleted task

---

## Links and References

### Basic Links

Create links using square brackets for text and parentheses for URLs:

- [External link to Google](https://www.google.com)
- [Link to Jekyll documentation](https://jekyllrb.com/docs/)
- [Email link](mailto:your-email@example.com)
- [Internal link to your about page](/about/)

### Reference Links

You can also use reference-style links for cleaner markdown:

This is a paragraph with a [reference link][1] and another [reference link][jekyll-docs].

[1]: https://www.example.com "Example website"
[jekyll-docs]: https://jekyllrb.com/docs/ "Jekyll Documentation"

### Automatic Links

URLs and email addresses can be made into links automatically:

<https://www.github.com>
<your-email@example.com>

---

## Images and Media

### Basic Image Insertion

![Alt text for the image](/assets/images/sample-image.jpg "Optional title")

### Custom Styled Images

Use your blog's custom image styling:

<div class="blog-image w-1/2 mx-auto">
  <img src="/assets/images/posts/sample/demo-image.jpg" 
       alt="Demonstration image showing blog formatting" 
       loading="lazy">
  <div class="blog-image-caption">
    This is a caption explaining what the image shows
  </div>
</div>

### Responsive Images

For better performance, you can use responsive images:

<picture>
  <source media="(max-width: 768px)" srcset="/assets/images/mobile-version.jpg">
  <img src="/assets/images/desktop-version.jpg" alt="Responsive image example">
</picture>

### Image with Links

[![Clickable image](/assets/images/thumbnail.jpg)](https://www.example.com)

---

## Code and Technical Content

### Inline Code

Use `backticks` to create inline code snippets. You can also use variables like `userName` or function names like `getElementById()` within your text.

### Basic Code Blocks

```
This is a basic code block
It preserves formatting and spacing
Perfect for configuration files or plain text
```

### Language-Specific Code Blocks

JavaScript example:
```javascript
// JavaScript function with syntax highlighting
function greetUser(name, age) {
  const message = `Hello, ${name}! You are ${age} years old.`;
  console.log(message);
  
  if (age >= 18) {
    return "You are an adult!";
  } else {
    return "You are a minor!";
  }
}

// Call the function
const result = greetUser("Alice", 25);
document.getElementById("output").textContent = result;
```

Python example:
```python
# Python class with syntax highlighting
class BlogPost:
    def __init__(self, title, content, author):
        self.title = title
        self.content = content
        self.author = author
        self.published = False
    
    def publish(self):
        """Publish the blog post"""
        if not self.published:
            self.published = True
            print(f"'{self.title}' by {self.author} has been published!")
        else:
            print("This post is already published.")
    
    def get_word_count(self):
        return len(self.content.split())

# Create and publish a post
my_post = BlogPost("Sample Title", "This is the content of my blog post.", "Hawatri")
my_post.publish()
print(f"Word count: {my_post.get_word_count()}")
```

HTML example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Blog Post</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="main-header">
        <h1>Welcome to My Blog</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/blog/">Blog</a></li>
                <li><a href="/about/">About</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article class="blog-post">
            <h2>{{ page.title }}</h2>
            <p>{{ page.excerpt }}</p>
        </article>
    </main>
</body>
</html>
```

CSS example:
```css
/* CSS with proper syntax highlighting */
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Indie Flower', cursive;
  line-height: 1.6;
}

.blog-post h1, .blog-post h2, .blog-post h3 {
  color: #333;
  margin-bottom: 1rem;
  font-weight: bold;
}

.blog-post p {
  margin-bottom: 1.5rem;
  text-align: justify;
}

/* Media query for responsive design */
@media (max-width: 768px) {
  .blog-post {
    padding: 1rem;
    font-size: 0.9rem;
  }
}
```

Shell/Terminal commands:

```bash
# Install Jekyll and dependencies
gem install jekyll bundler

# Create a new Jekyll site
jekyll new my-awesome-blog
cd my-awesome-blog

# Start the development server
bundle exec jekyll serve --livereload

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Deploy to GitHub Pages
git add .
git commit -m "Update blog content"
git push origin main
```


YAML configuration example:
```yaml
# _config.yml - Jekyll configuration
title: "My Awesome Blog"
description: "A place for thoughts and ideas"
author: "Your Name"
email: "your-email@example.com"

# Build settings
markdown: kramdown
highlighter: rouge
permalink: /blog/:title/

# Plugins
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Collections
collections:
  posts:
    output: true
    permalink: /blog/:title/

# Social media
social:
  github: username
  twitter: username
  linkedin: username
```

SQL example:
```sql
-- SQL queries with syntax highlighting
SELECT 
    p.title,
    p.content,
    p.published_date,
    a.name AS author_name,
    COUNT(c.id) AS comment_count
FROM posts p
LEFT JOIN authors a ON p.author_id = a.id
LEFT JOIN comments c ON p.id = c.post_id
WHERE p.published = TRUE
    AND p.published_date >= '2025-01-01'
GROUP BY p.id, p.title, p.content, p.published_date, a.name
ORDER BY p.published_date DESC
LIMIT 10;

-- Create a new table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Tables and Data

### Basic Table

| Feature | Description | Status |
|---------|-------------|---------|
| Syntax Highlighting | Code blocks with color coding | ✅ Complete |
| Responsive Design | Mobile-friendly layout | ✅ Complete |
| Dark Mode | Toggle between light/dark themes | ✅ Complete |
| Search Functionality | Find posts by title or content | ✅ Complete |
| Image Optimization | Lazy loading and responsive images | 🔄 In Progress |

### Advanced Table with Alignment

| Left Aligned | Center Aligned | Right Aligned | Default |
|:-------------|:--------------:|--------------:|---------|
| Left | Center | Right | Normal |
| This text | This text | This text | This text |
| is left | is center | is right | has no |
| aligned | aligned | aligned | alignment |

### Table with Complex Content

| Element | Syntax | Example | Notes |
|---------|--------|---------|-------|
| **Bold** | `**text**` | **Important** | Use for emphasis |
| *Italic* | `*text*` | *Subtle emphasis* | Use sparingly |
| `Code` | `` `code` `` | `variable` | For inline code |
| [Link](/) | `[text](url)` | [Home](/) | External or internal |

---

## Quotes and Emphasis

### Basic Blockquotes

> This is a simple blockquote. It's perfect for highlighting important information, quotes from other sources, or key takeaways from your content.

### Multi-paragraph Blockquotes

> This is the first paragraph of a multi-paragraph blockquote.
>
> This is the second paragraph. Notice how each paragraph starts with the `>` symbol.
>
> This is the third paragraph, demonstrating how you can create longer quoted sections.

### Nested Blockquotes

> This is a main quote.
>
> > This is a nested quote within the main quote.
> >
> > > And this is even more deeply nested.
>
> Back to the main quote level.

### Blockquotes with Attribution

> "The best time to plant a tree was 20 years ago. The second best time is now."
>
> — Chinese Proverb

### Blockquotes with Other Elements

> ## Important Note
>
> This blockquote contains other markdown elements:
>
> - **Bold text** for emphasis
> - *Italic text* for subtlety
> - `Code snippets` for technical details
> - [Links to resources](https://example.com)
>
> You can include almost any markdown element inside a blockquote!

---

## Advanced Formatting

### Horizontal Rules

You can create section dividers using horizontal rules:

---

This is after a horizontal rule.

***

This is after another style of horizontal rule.

___

And this is after a third style.

### HTML Elements

When markdown isn't enough, you can use HTML:

<div style="background: #f0f8ff; padding: 1rem; border-left: 4px solid #0066cc; margin: 1rem 0;">
  <strong>Pro Tip:</strong> You can mix HTML with markdown for more complex layouts!
</div>

<details>
<summary>Click to expand this section</summary>

This content is hidden by default and can be expanded by clicking the summary above. This is useful for:

- FAQ sections
- Optional detailed information
- Spoiler content
- Technical details that might overwhelm casual readers

</details>

### Keyboard Keys

Use HTML for keyboard shortcuts: <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy, <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste.

### Abbreviations

*[HTML]: HyperText Markup Language
*[CSS]: Cascading Style Sheets
*[JS]: JavaScript

You can define abbreviations that will show tooltips when hovered over. HTML, CSS, and JS are common web technologies.

### Footnotes

This sentence has a footnote[^1]. Here's another sentence with a different footnote[^2].

You can also use named footnotes[^note-about-footnotes].

[^1]: This is the first footnote.
[^2]: This is the second footnote.
[^note-about-footnotes]: Footnotes are great for additional information that doesn't fit in the main text flow.

---

## Best Practices

### Writing Tips

1. **Start with an outline** - Plan your content structure before writing
2. **Use descriptive headings** - Make them scannable and informative
3. **Keep paragraphs short** - 3-4 sentences maximum for web reading
4. **Use bullet points** - Break up dense information
5. **Add visual elements** - Images, code blocks, and tables improve engagement

### Technical Writing Guidelines

- **Code examples should be complete** and runnable when possible
- **Use syntax highlighting** for all code blocks
- **Include comments** in your code to explain complex logic
- **Test all links** before publishing
- **Optimize images** for web (compress and use appropriate formats)
- **Write descriptive alt text** for all images

### SEO and Accessibility

- Use **semantic HTML** structure with proper headings
- Include **descriptive link text** (avoid "click here")
- Add **alt text** to all images
- Use **meaningful headings** that describe the content
- Keep your **URL structure** clean and descriptive

### Content Organization

```
Post Structure Template:
├── Introduction (Hook + Overview)
├── Main Content
│   ├── Section 1 (H2)
│   │   ├── Subsection (H3)
│   │   └── Details (H4+)
│   ├── Section 2 (H2)
│   └── Section 3 (H2)
├── Code Examples (if applicable)
├── Resources/References
└── Conclusion
```

---

## Conclusion

You now have a complete reference for every formatting element available in your Jekyll blog! Here's a quick checklist for creating great blog posts:

- [ ] **Compelling title** that accurately describes your content
- [ ] **Clear introduction** that hooks readers and sets expectations  
- [ ] **Logical structure** with descriptive headings and subheadings
- [ ] **Visual elements** like images, code blocks, and tables
- [ ] **Practical examples** and actionable information
- [ ] **Proper formatting** using markdown and HTML as needed
- [ ] **Call to action** or next steps for readers
- [ ] **Proofread** for grammar, spelling, and formatting issues

### What's Next?

Now that you know how to use all these elements, try creating your own blog post! Start with a topic you're passionate about and experiment with different formatting options.

Some post ideas to get you started:

1. **Tutorial posts** - Teach something you know well
2. **Experience sharing** - Document your learning journey  
3. **Resource roundups** - Curate useful tools or articles
4. **Project documentation** - Showcase your work
5. **Opinion pieces** - Share your thoughts on industry trends

Remember, great content comes from combining good information with clear, engaging presentation. Use these formatting tools to enhance your message, not overshadow it.

Happy blogging! 🚀

---

**Related Posts:**
- [How You Can Easily Build Your Own Site with Jekyll](/blog/how-you-can-easily-build-your-own-site-with-jekyll/)

**Resources:**
- [Markdown Guide](https://www.markdownguide.org/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)

---

*This post was last updated on August 31, 2025. If you find any errors or have suggestions for improvement, please let me know!*