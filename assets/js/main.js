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

// CODE COPY FUNCTIONALITY
function initializeCodeCopy() {
  document.querySelectorAll('td.rouge-code pre').forEach(preBlock => {
    // Prevent duplicates
    if (preBlock.querySelector('button.copy-btn')) return;

    const copyButton = document.createElement('button');
    copyButton.className =
      'copy-btn absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-sm hover:bg-gray-700 opacity-75 hover:opacity-100 transition-opacity';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(preBlock.innerText);
        showCopyFeedback(copyButton, 'Copied!', 'bg-green-600');
      } catch (err) {
        console.error('Copy failed:', err);
        showCopyFeedback(copyButton, 'Failed', 'bg-red-600');
      }
    });

    preBlock.style.position = 'relative';
    preBlock.appendChild(copyButton);
  });
}


function showCopyFeedback(button, text, className) {
  const originalText = button.textContent;
  const originalClasses = button.className;
  
  button.textContent = text;
  button.classList.add(className);
  
  setTimeout(() => {
    button.textContent = originalText;
    button.className = originalClasses;
  }, 2000);
}

// SEARCH FUNCTIONALITY
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.getElementById('searchResults');
    let allPosts = [];
    let selectedIndex = -1;

    if (!searchInput || !searchResultsContainer) return;

    // Fetch post data
    fetch('/search.json')
        .then(response => response.json())
        .then(data => {
            allPosts = data;
        })
        .catch(error => console.error('Error fetching search data:', error));

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const performSearch = (query) => {
        if (query.length < 2) {
            hideResults();
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const results = allPosts.filter(post => 
            post.title.toLowerCase().includes(lowerCaseQuery) ||
            post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
            post.categories.some(cat => cat.toLowerCase().includes(lowerCaseQuery))
        ).slice(0, 10); // Limit results

        displayResults(results);
    };

    const displayResults = (results) => {
        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<div class="search-no-results">No results found.</div>';
            searchResultsContainer.classList.remove('hidden');
            return;
        }

        searchResultsContainer.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result-item">
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-excerpt">${result.excerpt}</div>
            </a>
        `).join('');
        searchResultsContainer.classList.remove('hidden');
        selectedIndex = -1;
    };

    const hideResults = () => {
        searchResultsContainer.classList.add('hidden');
        selectedIndex = -1;
    };

    searchInput.addEventListener('input', debounce(e => performSearch(e.target.value), 300));
    searchInput.addEventListener('focus', e => {
        if(e.target.value.length >= 2) performSearch(e.target.value);
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', e => {
        const items = searchResultsContainer.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % items.length;
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + items.length) % items.length;
            updateSelection(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex > -1) {
                items[selectedIndex].click();
            }
        } else if (e.key === 'Escape') {
            hideResults();
        }
    });

    const updateSelection = (items) => {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('selected');
            }
        });
    };
    
    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResultsContainer.contains(e.target)) {
            hideResults();
        }
    });
}


// IMAGE FALLBACKS
function initializeImageFallbacks() {
  document.querySelectorAll('img:not([onerror])').forEach(img => {
    img.addEventListener('error', function() {
      const placeholder = document.createElement('div');
      placeholder.className = 'w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center';
      placeholder.innerHTML = '<span class="text-gray-600 text-sm font-[Indie Flower]">Image unavailable</span>';
      
      if(this.parentNode) {
          this.parentNode.insertBefore(placeholder, this);
      }
      this.style.display = 'none';
    });
  });
}

// SMOOTH SCROLLING
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      try {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (error) {
        console.warn('Smooth scroll target not found:', this.getAttribute('href'));
      }
    });
  });
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initializeDarkMode();
  initializeCodeCopy();
  initializeImageFallbacks();
  initializeSmoothScrolling();
  initializeSearch(); // Initialize the new search feature
});
