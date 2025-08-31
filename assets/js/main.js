// ========================================
// HAWATRI LOGS - STREAMLINED JAVASCRIPT
// ========================================

// Safe storage helper functions
function getSavedDarkMode() {
  try {
    return localStorage.getItem('darkMode') === 'true';
  } catch (e) {
    // Fallback to checking if dark class exists
    return document.body.classList.contains('dark');
  }
}

function saveDarkMode(isDark) {
  try {
    localStorage.setItem('darkMode', isDark.toString());
  } catch (e) {
    // If localStorage fails, just continue without saving
    console.warn('Could not save dark mode preference');
  }
}

// DARK MODE FUNCTIONALITY
function initializeDarkMode() {
  const darkModeYes = document.getElementById('darkModeYes');
  const darkModeNo = document.getElementById('darkModeNo');
  
  // Get saved preference or default to false
  const savedDarkMode = getSavedDarkMode();
  
  // Apply dark mode on page load
  updateDarkMode(savedDarkMode);
  
  // Update radio buttons if they exist (on settings page)
  if (darkModeYes && darkModeNo) {
    darkModeYes.checked = savedDarkMode;
    darkModeNo.checked = !savedDarkMode;

    // Event listeners
    darkModeYes.addEventListener('change', () => {
      if (darkModeYes.checked) {
        updateDarkMode(true);
        saveDarkMode(true);
      }
    });

    darkModeNo.addEventListener('change', () => {
      if (darkModeNo.checked) {
        updateDarkMode(false);
        saveDarkMode(false);
      }
    });
  }
}

function updateDarkMode(dark) {
  const elements = [document.documentElement, document.body];
  elements.forEach(el => {
    dark ? el.classList.add('dark') : el.classList.remove('dark');
  });
}

// SEARCH FUNCTIONALITY
let searchTimeout;

function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  // Debounced search
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(e.target.value), 300);
  });
  
  // Enter key handling
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch(e.target.value);
    }
  });
}

function performSearch(query = '') {
  const searchQuery = query.toLowerCase().trim();
  
  // Search blog posts
  searchBlogPosts(searchQuery);
  
  // Search recent posts sidebar
  searchRecentPosts(searchQuery);
}

function searchBlogPosts(query) {
  const blogGrid = document.getElementById('blogGrid');
  if (!blogGrid) return;
  
  const posts = blogGrid.querySelectorAll('> div');
  let visibleCount = 0;
  
  posts.forEach(post => {
    // More flexible selectors to match your actual HTML structure
    const titleElement = post.querySelector('h3 a, .font-\\[Indie\\ Flower\\]') || post.querySelector('a');
    const excerptElement = post.querySelector('.text-gray-700, p');
    const categoryElements = post.querySelectorAll('.bg-gray-200, .bg-gray-200.text-gray-700');
    
    const title = titleElement?.textContent.toLowerCase() || '';
    const excerpt = excerptElement?.textContent.toLowerCase() || '';
    const categories = Array.from(categoryElements).map(cat => 
      cat.textContent.toLowerCase().trim()
    );
    
    // Also search in post content if available
    const allText = post.textContent.toLowerCase();
    
    const matches = query === '' || 
      title.includes(query) || 
      excerpt.includes(query) ||
      allText.includes(query) ||
      categories.some(cat => cat.includes(query));
    
    post.style.display = matches ? 'block' : 'none';
    if (matches) visibleCount++;
  });
  
  // Show/hide no results message
  toggleNoResultsMessage(query, visibleCount, blogGrid);
}

function searchRecentPosts(query) {
  const recentPostsList = document.getElementById('recentBlogsList');
  if (!recentPostsList) return;
  
  const posts = recentPostsList.querySelectorAll('li');
  posts.forEach(post => {
    const link = post.querySelector('a');
    if (!link) return;
    
    const title = link.textContent.toLowerCase();
    const matches = query === '' || title.includes(query);
    
    post.style.display = matches ? 'flex' : 'none';
    post.style.backgroundColor = matches && query ? 'rgba(59, 130, 246, 0.1)' : '';
  });
}

function toggleNoResultsMessage(query, visibleCount, container) {
  const noResultsId = 'noSearchResults';
  let noResultsMsg = document.getElementById(noResultsId);
  
  if (query && visibleCount === 0) {
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.id = noResultsId;
      noResultsMsg.className = 'col-span-full text-center py-8';
      noResultsMsg.innerHTML = `
        <p class="text-gray-600 text-lg mb-2">No posts found for "${query}"</p>
        <button onclick="clearSearch()" class="text-black underline hover:text-gray-700">Clear search</button>
      `;
      container.appendChild(noResultsMsg);
    }
  } else if (noResultsMsg) {
    noResultsMsg.remove();
  }
}

// GLOBAL SEARCH FUNCTION (called from HTML)
function performSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    performSearch(searchInput.value);
  }
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
    performSearch('');
  }
}

// CODE COPY FUNCTIONALITY
function initializeCodeCopy() {
  document.querySelectorAll('pre code').forEach(codeBlock => {
    const copyButton = document.createElement('button');
    copyButton.className = 'absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-sm hover:bg-gray-700';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.textContent);
        showCopyFeedback(copyButton, 'Copied!', 'bg-green-600');
      } catch (err) {
        console.error('Copy failed:', err);
        showCopyFeedback(copyButton, 'Failed', 'bg-red-600');
      }
    });
    
    codeBlock.parentElement.style.position = 'relative';
    codeBlock.parentElement.appendChild(copyButton);
  });
}

function showCopyFeedback(button, text, className) {
  const originalText = button.textContent;
  const originalClass = button.className;
  
  button.textContent = text;
  button.classList.add(className);
  
  setTimeout(() => {
    button.textContent = originalText;
    button.className = originalClass;
  }, 2000);
}

// IMAGE FALLBACKS
function initializeImageFallbacks() {
  document.querySelectorAll('img:not([onerror])').forEach(img => {
    img.addEventListener('error', function() {
      const placeholder = document.createElement('div');
      placeholder.className = 'w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center';
      placeholder.innerHTML = '<span class="text-gray-600 text-sm font-[Indie Flower]">Image unavailable</span>';
      
      this.parentNode.insertBefore(placeholder, this);
      this.style.display = 'none';
    });
  });
}

// SMOOTH SCROLLING
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initializeDarkMode();
  initializeSearch();
  initializeCodeCopy();
  initializeImageFallbacks();
  initializeSmoothScrolling();
});