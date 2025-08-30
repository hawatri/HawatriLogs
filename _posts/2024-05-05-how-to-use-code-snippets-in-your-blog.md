---
layout: post
title: "How to Use Code Snippets in Your Blog"
date: 2024-05-05
excerpt: "Learn how to include code snippets in your blog posts with proper formatting and styling."
thumbnail: "/blog/images/shutterstock_1049564585-960.jpg"
categories: [tutorial, coding]
tags: [code-snippets, blog-tips, formatting]
---

When writing technical blogs, it's often helpful to include code snippets to demonstrate concepts or provide examples. In Hawatri, we've made it easy to include code snippets using a simple HTML structure.

## Basic Code Snippet

Here's how you can include a simple code snippet in your blog:

```html
<div class="code-snippet">
  <pre><code>Your code here</code></pre>
</div>
```

## Example with JavaScript

Let's look at a practical example with some JavaScript code:

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// Call the function
greet('World');
```

## Example with HTML and CSS

You can also include HTML and CSS code:

```html
<style>
  .button {
    background-color: black;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
  }
</style>

<button class="button">Click me</button>
```

## Tips for Using Code Snippets

- Always use proper indentation in your code
- Include comments to explain complex parts
- Use the appropriate language for syntax highlighting
- Keep snippets focused and relevant to your topic

```javascript
// This is a well-commented code example
function calculateTotal(items) {
  // Sum up all item prices
  const total = items.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  // Apply discount if total is over 100
  if (total > 100) {
    return total * 0.9; // 10% discount
  }

  return total;
}
```

Remember that code snippets will automatically adapt to dark mode when enabled, making them readable in both light and dark themes.
