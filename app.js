/**
 * Hawatri Blog Application
 * A modern, responsive blog platform with dark mode support
 */

class HawatriApp {
  constructor() {
    this.currentPage = 'home';
    this.blogs = [];
    this.theme = localStorage.getItem('hawatri-theme') || 'light';
    this.searchQuery = '';
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    this.setupTheme();
    this.setupEventListeners();
    await this.loadBlogs();
    await this.renderRecentBlogs();
    await this.loadPage('home');
    this.hideLoading();
  }

  /**
   * Setup theme management
   */
  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateThemeControls();
  }

  /**
   * Update theme control states
   */
  updateThemeControls() {
    const darkRadio = document.getElementById('darkModeYes');
    const lightRadio = document.getElementById('darkModeNo');
    
    if (darkRadio && lightRadio) {
      if (this.theme === 'dark') {
        darkRadio.checked = true;
        lightRadio.checked = false;
      } else {
        darkRadio.checked = false;
        lightRadio.checked = true;
      }
    }
  }

  /**
   * Toggle theme between light and dark
   */
  toggleTheme(newTheme) {
    this.theme = newTheme;
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('hawatri-theme', this.theme);
    
    // Add transition class for smooth theme change
    document.body.classList.add('theme-transitioning');
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300);
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = e.target.getAttribute('data-page');
        this.loadPage(page);
      });
    });

    // Search form
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSearch(searchInput.value.trim());
    });

    searchInput.addEventListener('input', (e) => {
      if (this.currentPage === 'contents') {
        this.handleSearch(e.target.value.trim());
      }
    });

    // Theme controls (will be set up when settings page loads)
    document.addEventListener('change', (e) => {
      if (e.target.name === 'darkMode') {
        const newTheme = e.target.id === 'darkModeYes' ? 'dark' : 'light';
        this.toggleTheme(newTheme);
      }
    });
  }

  /**
   * Handle search functionality
   */
  async handleSearch(query) {
    this.searchQuery = query;
    
    if (this.currentPage !== 'contents') {
      await this.loadPage('contents');
    } else {
      this.renderBlogGrid();
    }
  }

  /**
   * Filter blogs based on search query
   */
  filterBlogs(query = this.searchQuery) {
    if (!query) return this.blogs;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return this.blogs.filter(blog => {
      const searchableText = `${blog.title} ${blog.excerpt}`.toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    });
  }

  /**
   * Show loading indicator
   */
  showLoading() {
    document.getElementById('loadingIndicator').style.display = 'block';
  }

  /**
   * Hide loading indicator
   */
  hideLoading() {
    document.getElementById('loadingIndicator').style.display = 'none';
  }

  /**
   * Update active navigation button
   */
  updateActiveNav(activePage) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-page') === activePage) {
        btn.classList.add('active');
      }
    });
  }

  /**
   * Load page content
   */
  async loadPage(pageName) {
    this.showLoading();
    
    try {
      let content = '';
      
      switch (pageName) {
        case 'home':
          content = await this.getHomeContent();
          break;
        case 'contents':
          content = await this.getContentsContent();
          break;
        case 'settings':
          content = await this.getSettingsContent();
          break;
        case 'about':
          content = await this.getAboutContent();
          break;
        default:
          content = '<div class="p-8"><h2>Page not found</h2><p>The requested page could not be found.</p></div>';
      }
      
      const contentArea = document.getElementById('contentArea');
      contentArea.innerHTML = content;
      contentArea.classList.add('fade-in');
      
      this.currentPage = pageName;
      this.updateActiveNav(pageName);
      
      // Setup page-specific functionality
      if (pageName === 'contents') {
        this.renderBlogGrid();
      } else if (pageName === 'settings') {
        this.updateThemeControls();
      }
      
      this.setupCodeSnippets();
      
    } catch (error) {
      console.error('Error loading page:', error);
      document.getElementById('contentArea').innerHTML = 
        '<div class="p-8"><h2>Error</h2><p>Failed to load page content. Please try again.</p></div>';
    }
    
    this.hideLoading();
  }

  /**
   * Load blog content
   */
  async loadBlog(slug) {
    this.showLoading();
    
    try {
      const response = await fetch(`blog/${slug}.html`);
      if (!response.ok) throw new Error('Blog not found');
      
      const content = await response.text();
      const contentArea = document.getElementById('contentArea');
      contentArea.innerHTML = content;
      contentArea.classList.add('fade-in');
      
      this.currentPage = 'blog';
      this.updateActiveNav(''); // Clear active nav for blog posts
      
      this.setupCodeSnippets();
      
    } catch (error) {
      console.error('Error loading blog:', error);
      document.getElementById('contentArea').innerHTML = 
        '<div class="p-8"><h2>Blog Not Found</h2><p>The requested blog post could not be found.</p></div>';
    }
    
    this.hideLoading();
  }

  /**
   * Load blog metadata
   */
  async loadBlogs() {
    try {
      const response = await fetch('blog/index.json');
      if (!response.ok) throw new Error('Blog index not found');
      
      const data = await response.json();
      this.blogs = data.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
      
    } catch (error) {
      console.error('Error loading blogs:', error);
      this.blogs = [];
    }
  }

  /**
   * Render recent blogs in sidebar
   */
  async renderRecentBlogs() {
    const recentList = document.getElementById('recentList');
    if (!recentList) return;
    
    recentList.innerHTML = '';
    
    const recentBlogs = this.blogs.slice(0, 10);
    
    recentBlogs.forEach(blog => {
      const listItem = document.createElement('li');
      listItem.className = 'recent-item';
      
      listItem.innerHTML = `
        <span class="recent-indicator" aria-hidden="true"></span>
        <button class="recent-link" data-slug="${blog.slug}" type="button">
          ${this.escapeHtml(blog.title)}
        </button>
      `;
      
      const button = listItem.querySelector('.recent-link');
      button.addEventListener('click', () => this.loadBlog(blog.slug));
      
      recentList.appendChild(listItem);
    });
  }

  /**
   * Render blog grid for contents page
   */
  renderBlogGrid() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;
    
    const filteredBlogs = this.filterBlogs();
    blogGrid.innerHTML = '';
    
    if (filteredBlogs.length === 0) {
      blogGrid.innerHTML = `
        <div class="col-span-full text-center py-8">
          <h3>No content found</h3>
          <p class="text-gray-600">No blog posts match your search criteria.</p>
        </div>
      `;
      return;
    }
    
    filteredBlogs.forEach(blog => {
      const blogCard = document.createElement('div');
      blogCard.className = 'blog-card';
      blogCard.setAttribute('data-slug', blog.slug);
      
      blogCard.innerHTML = `
        <img 
          src="${blog.thumbnail || 'blog/images/shutterstock_1049564585-960.jpg'}" 
          alt="${this.escapeHtml(blog.title)}"
          class="blog-thumbnail"
          loading="lazy"
        >
        <div class="blog-content">
          <h3 class="blog-title">${this.escapeHtml(blog.title)}</h3>
          <p class="blog-date">${this.formatDate(blog.date)}</p>
          <p class="blog-excerpt">${this.escapeHtml(blog.excerpt)}</p>
          <button class="blog-read-more" type="button">Read More</button>
        </div>
      `;
      
      blogCard.addEventListener('click', () => this.loadBlog(blog.slug));
      blogGrid.appendChild(blogCard);
    });
  }

  /**
   * Setup code snippet copy functionality
   */
  setupCodeSnippets() {
    document.querySelectorAll('.code-snippet').forEach(snippet => {
      // Remove existing copy button
      const existingBtn = snippet.querySelector('.code-copy-btn');
      if (existingBtn) existingBtn.remove();
      
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
      
      copyBtn.addEventListener('click', async () => {
        const code = snippet.querySelector('code').textContent;
        
        try {
          await navigator.clipboard.writeText(code);
          copyBtn.textContent = 'Copied!';
          copyBtn.classList.add('copied');
          
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
          }, 2000);
          
        } catch (error) {
          console.error('Failed to copy code:', error);
          copyBtn.textContent = 'Failed';
          
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
          }, 2000);
        }
      });
      
      snippet.appendChild(copyBtn);
    });
  }

  /**
   * Get home page content
   */
  async getHomeContent() {
    return `
      <div class="p-8">
        <p>Welcome to Hawatri<br />Welcome, traveler.</p>
        <hr style="margin: 1.5rem 0; border: 1px solid var(--border-secondary);" />
        <p class="mt-5">
          You've stumbled upon Hawatri—a quiet corner of the internet where
          thoughts take shape, stories breathe, and ideas find a home.<br />
          This is not a blog in the noisy, click-chasing sense. It is a digital
          diary of sorts, grounded in simplicity, soaked in curiosity, and built
          with care.
        </p>
        <p class="mt-5">
          Here, I share more than vlogs.<br />
          I share projects that scratch an itch, solutions that solve problems,
          and experiments born from long hours and quiet determination.
        </p>
        <p class="mt-5">
          <strong>Who am I?</strong><br />
          I'm a programmer by trade, but more than that—a thinker, a builder, and
          a listener.<br />
          I was raised with a respect for tradition, and I carry that into my
          work: clean code, simple design, and functional ideas.<br />
          This site is a mirror of that philosophy.
        </p>
        <p class="mt-5">
          <strong>What you'll find here</strong><br />
          Projects — From terminal tools to full-stack experiments, you'll see my
          builds evolve.<br />
          Solutions — Practical answers to real-world problems, many of them
          inspired by my own needs.<br />
          Vlogs — Not the flashy, fast-cut kind. Just slow, honest glimpses into
          the journey—tech and otherwise.<br />
          Thoughts — Reflections on code, life, process, and growth.<br />
          Whether you're here to learn, to explore, or just to wander through
          someone else's mental workshop—you're welcome.
        </p>
        <p class="mt-5">This is Hawatri. Let's build something meaningful.</p>
      </div>
    `;
  }

  /**
   * Get contents page content
   */
  async getContentsContent() {
    return `
      <div class="p-8">
        <h2 class="text-2xl mb-4">Contents - All Blogs</h2>
        <div class="blog-grid">
          <!-- Blog items will be populated by JavaScript -->
        </div>
      </div>
    `;
  }

  /**
   * Get settings page content
   */
  async getSettingsContent() {
    return `
      <div class="p-8">
        <h2 class="text-2xl mb-6">Settings</h2>
        
        <div class="settings-section">
          <div class="settings-header">
            <div class="settings-info">
              <h3>Dark Mode</h3>
              <p>Toggle between light and dark theme</p>
            </div>
            <div class="settings-controls">
              <div class="radio-group">
                <input type="radio" name="darkMode" id="darkModeYes" class="radio-input">
                <label for="darkModeYes" class="radio-label">Dark</label>
              </div>
              <div class="radio-group">
                <input type="radio" name="darkMode" id="darkModeNo" class="radio-input">
                <label for="darkModeNo" class="radio-label">Light</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get about page content
   */
  async getAboutContent() {
    return `
      <div class="p-8">
        <h2 class="text-2xl mb-4">About</h2>
        <p>This is the About page content.</p>
        <p class="mt-5">Learn more about Hawatri and its creator.</p>
      </div>
    `;
  }

  /**
   * Utility function to escape HTML
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Format date for display
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.hawatriApp = new HawatriApp();
});

// Refresh recent blogs periodically
setInterval(() => {
  if (window.hawatriApp) {
    window.hawatriApp.loadBlogs().then(() => {
      window.hawatriApp.renderRecentBlogs();
    });
  }
}, 30000);