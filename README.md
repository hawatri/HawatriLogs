# Hawatri - Jekyll Blog

A personal blog and content platform built with Jekyll, featuring a clean design and markdown-based content management.

## Features

- ✍️ **Markdown Support** - Write blog posts in markdown instead of HTML
- 🎨 **Preserved Styling** - All your existing CSS and Tailwind classes work exactly the same
- 🔍 **Search Functionality** - Real-time search through blog posts
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works perfectly on all devices
- 📝 **Automatic Post Management** - Jekyll automatically generates your blog index
- 🚀 **Fast Performance** - Static site generation for optimal speed

## Getting Started

### Prerequisites

- Ruby (version 2.5 or higher)
- RubyGems
- GCC and Make

### Installation

1. **Install Jekyll and Bundler**
   ```bash
   gem install jekyll bundler
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000`

## Project Structure

```
HawatriLogs/
├── _layouts/          # Jekyll layouts
│   ├── default.html   # Main layout wrapper
│   ├── post.html      # Blog post layout
│   ├── page.html      # Regular page layout
│   └── blog.html      # Blog listing layout
├── _includes/         # Reusable components
│   └── recent-posts.html
├── _posts/            # Blog posts (markdown files)
├── assets/            # Static assets
│   └── js/           # JavaScript files
├── blog/              # Legacy blog folder (excluded from Jekyll)
├── styles.css         # Your existing CSS
├── _config.yml        # Jekyll configuration
└── Gemfile           # Ruby dependencies
```

## Writing Blog Posts

### Creating a New Post

1. Create a new markdown file in the `_posts/` directory
2. Use the filename format: `YYYY-MM-DD-title-of-post.md`
3. Add front matter at the top:

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-01-01
excerpt: "A brief description of your post"
thumbnail: "/path/to/image.jpg"
categories: [category1, category2]
tags: [tag1, tag2, tag3]
---

Your post content goes here in markdown format.
```

### Front Matter Options

- `layout`: The layout to use (post, page, etc.)
- `title`: The title of your post
- `date`: Publication date (YYYY-MM-DD format)
- `excerpt`: A brief description for the blog listing
- `thumbnail`: Path to the post thumbnail image
- `categories`: Array of categories
- `tags`: Array of tags for organization

### Markdown Features

- **Headers**: Use `#`, `##`, `###` for different heading levels
- **Code blocks**: Wrap code in triple backticks with language specification
- **Lists**: Use `-` or `*` for bullet points, `1.` for numbered lists
- **Links**: `[text](url)` for links
- **Images**: `![alt text](image-url)` for images
- **Bold/Italic**: `**bold**` and `*italic*` text

## Customization

### Styling

Your existing `styles.css` file is preserved and will work exactly as before. All Tailwind CSS classes and custom styles remain unchanged.

### Layouts

- **default.html**: Main wrapper for all pages
- **post.html**: Specific layout for blog posts
- **page.html**: Layout for regular pages
- **blog.html**: Layout for the blog listing page

### JavaScript

The `assets/js/main.js` file handles:
- Dark mode functionality
- Code snippet copy buttons
- Search functionality
- Page initialization

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the branch you want to deploy from
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `bundle exec jekyll build`
3. Set publish directory: `_site`
4. Deploy automatically on every push

### Vercel

1. Import your GitHub repository to Vercel
2. Vercel will automatically detect Jekyll
3. Deploy with zero configuration

## Benefits of Jekyll

- **Content Management**: Write in markdown, Jekyll handles the rest
- **Performance**: Static site generation for fast loading
- **SEO**: Built-in SEO optimization with jekyll-seo-tag
- **Version Control**: All content is version controlled with Git
- **Scalability**: Easy to add new posts and features
- **Maintenance**: No database or server maintenance required

## Troubleshooting

### Common Issues

1. **Jekyll not found**: Make sure Ruby and Jekyll are properly installed
2. **Build errors**: Check your markdown syntax and front matter
3. **Styling issues**: Ensure your CSS file is in the correct location
4. **Posts not showing**: Verify the filename format and front matter

### Getting Help

- Check the [Jekyll documentation](https://jekyllrb.com/docs/)
- Review your `_config.yml` configuration
- Check the console for error messages
- Verify all dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Welcome to Hawatri!** 🚀

Start writing your first markdown blog post and enjoy the power of Jekyll!
