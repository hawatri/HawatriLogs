// ========================================
// HAWATRI LOGS - OPTIMIZED JAVASCRIPT
// Compressed but readable and maintainable
// ========================================

// Safe storage helper functions
function getSavedDarkMode() {
  try {
    return localStorage.getItem('darkMode') === 'true';
  } catch (e) {
    return document.body.classList.contains('dark');
  }
}

function saveDarkMode(isDark) {
  try {
    localStorage.setItem('darkMode', isDark.toString());
  } catch (e) {
    console.warn('Could not save dark mode preference');
  }
}

// DARK MODE FUNCTIONALITY
function initializeDarkMode() {
  const darkModeYes = document.getElementById('darkModeYes');
  const darkModeNo = document.getElementById('darkModeNo');
  const savedDarkMode = getSavedDarkMode();
  
  updateDarkMode(savedDarkMode);
  
  if (darkModeYes && darkModeNo) {
    darkModeYes.checked = savedDarkMode;
    darkModeNo.checked = !savedDarkMode;

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

// ENHANCED SEARCH FUNCTIONALITY WITH DROPDOWN
let searchTimeout;
let searchDropdown;
let allPosts = [];

function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  console.log('Initializing search functionality...');
  
  // Create search dropdown
  createSearchDropdown();
  
  // Collect all posts data for search
  collectPostsData();
  
  // Add event listeners
  searchInput.addEventListener('input', (e) => {
    console.log('Search input event:', e.target.value);
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();
    
    if (query.length === 0) {
      hideSearchDropdown();
      showAllPosts();
      return;
    }
    
    searchTimeout = setTimeout(() => executeSearch(query), 300);
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch(e.target.value);
      hideSearchDropdown();
    }
  });
  
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      showSearchDropdown();
    }
  });
  
  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      hideSearchDropdown();
    }
  });
  
  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideSearchDropdown();
      searchInput.blur();
    }
    
    // Handle arrow keys for dropdown navigation
    if (searchDropdown && !searchDropdown.classList.contains('hidden')) {
      handleDropdownNavigation(e);
    }
  });
}

function createSearchDropdown() {
  searchDropdown = document.createElement('div');
  searchDropdown.id = 'searchDropdown';
  searchDropdown.className = 'absolute top-full left-0 right-0 bg-white border-2 border-black rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto hidden';
  searchDropdown.style.marginTop = '2px';
  
  const searchContainer = document.getElementById('searchInput').closest('form');
  searchContainer.style.position = 'relative';
  searchContainer.appendChild(searchDropdown);
}

function collectPostsData() {
  const blogGrid = document.getElementById('blogGrid');
  if (!blogGrid) {
    console.log('Blog grid not found - this page may not have posts to search');
    // Initialize with empty array so search still works
    allPosts = [];
    return;
  }
  
  const posts = blogGrid.querySelectorAll('> div');
  console.log('Found posts:', posts.length);
  
  allPosts = Array.from(posts).map(post => {
    const titleElement = post.querySelector('h3 a, .font-\\[Indie\\ Flower\\]') || 
                        post.querySelector('a');
    const excerptElement = post.querySelector('.text-gray-700, p');
    const categoryElements = post.querySelectorAll('.bg-gray-200, .bg-gray-200.text-gray-700');
    const linkElement = post.querySelector('h3 a, a');
    
    const postData = {
      element: post,
      title: titleElement?.textContent || '',
      excerpt: excerptElement?.textContent || '',
      categories: Array.from(categoryElements).map(cat => cat.textContent.trim()),
      url: linkElement?.href || '',
      allText: post.textContent
    };
    
    console.log('Post data:', postData.title);
    return postData;
  });
  
  console.log('Total posts collected:', allPosts.length);
}

function executeSearch(query = '') {
  const searchQuery = query.toLowerCase().trim();
  
  if (searchQuery.length === 0) {
    hideSearchDropdown();
    showAllPosts();
    return;
  }
  
  // Show loading state
  showSearchLoading();
  
  // Update dropdown with search results
  updateSearchDropdown(searchQuery);
  
  // Filter blog posts
  searchBlogPosts(searchQuery);
  
  // Filter recent posts
  searchRecentPosts(searchQuery);
}

function updateSearchDropdown(query) {
  if (!searchDropdown) return;
  
  const results = allPosts.filter(post => {
    const title = post.title.toLowerCase();
    const excerpt = post.excerpt.toLowerCase();
    const categories = post.categories.map(cat => cat.toLowerCase());
    const allText = post.allText.toLowerCase();
    
    return title.includes(query) || 
           excerpt.includes(query) ||
           allText.includes(query) ||
           categories.some(cat => cat.includes(query));
  });
  
  if (results.length === 0) {
    searchDropdown.innerHTML = `
      <div class="p-4 text-center text-gray-600">
        <p>No posts found for "${query}"</p>
      </div>
    `;
  } else {
    searchDropdown.innerHTML = results.map(post => `
      <div class="p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer" 
           onclick="navigateToPost('${post.url}')"
           data-url="${post.url}">
        <div class="font-semibold text-black mb-1">${post.title}</div>
        <div class="dark:text-white">
          <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">${post.excerpt.substring(0, 80)}...</div>
          ${post.categories.length > 0 ? 
            `<div class="flex gap-1">
              ${post.categories.map(cat => 
                `<span class="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded">${cat}</span>`
              ).join('')}
            </div>` : ''
          }
        </div>
      </div>
    `).join('');
  }
  
  showSearchDropdown();
}

function showSearchDropdown() {
  if (searchDropdown) {
    searchDropdown.classList.remove('hidden');
  }
}

function showSearchLoading() {
  if (!searchDropdown) return;
  
  searchDropdown.innerHTML = `
    <div class="p-4 text-center text-gray-600">
      <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
      <p class="mt-2">Searching...</p>
    </div>
  `;
  
  showSearchDropdown();
}

function hideSearchDropdown() {
  if (searchDropdown) {
    searchDropdown.classList.add('hidden');
  }
}

function navigateToPost(url) {
  window.location.href = url;
  hideSearchDropdown();
}

function handleDropdownNavigation(e) {
  const dropdownItems = searchDropdown.querySelectorAll('> div');
  if (dropdownItems.length === 0) return;
  
  let currentIndex = Array.from(dropdownItems).findIndex(item => 
    item.classList.contains('bg-blue-100')
  );
  
  // Remove current selection
  dropdownItems.forEach(item => item.classList.remove('bg-blue-100', 'text-blue-900'));
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    currentIndex = currentIndex < dropdownItems.length - 1 ? currentIndex + 1 : 0;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    currentIndex = currentIndex > 0 ? currentIndex - 1 : dropdownItems.length - 1;
  } else if (e.key === 'Enter' && currentIndex >= 0) {
    e.preventDefault();
    const selectedItem = dropdownItems[currentIndex];
    const url = selectedItem.getAttribute('data-url');
    if (url) {
      navigateToPost(url);
    }
    return;
  }
  
  // Highlight selected item
  if (currentIndex >= 0 && currentIndex < dropdownItems.length) {
    dropdownItems[currentIndex].classList.add('bg-blue-100', 'text-blue-900');
  }
}

function showAllPosts() {
  allPosts.forEach(post => {
    post.element.style.display = 'block';
  });
  
  // Remove no results message
  const noResultsMsg = document.getElementById('noSearchResults');
  if (noResultsMsg) {
    noResultsMsg.remove();
  }
}

function searchBlogPosts(query) {
  const blogGrid = document.getElementById('blogGrid');
  if (!blogGrid) return;
  
  let visibleCount = 0;
  
  allPosts.forEach(post => {
    const title = post.title.toLowerCase();
    const excerpt = post.excerpt.toLowerCase();
    const categories = post.categories.map(cat => cat.toLowerCase());
    const allText = post.allText.toLowerCase();
    
    const matches = title.includes(query) || 
      excerpt.includes(query) ||
      allText.includes(query) ||
      categories.some(cat => cat.includes(query));
    
    post.element.style.display = matches ? 'block' : 'none';
    if (matches) visibleCount++;
  });
  
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
    const matches = title.includes(query);
    
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

// GLOBAL SEARCH FUNCTIONS - These are called from HTML
function performSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    executeSearch(searchInput.value);
  }
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
    executeSearch('');
    hideSearchDropdown();
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