// Dark mode functionality
function initializeDarkMode() {
  const darkModeYes = document.getElementById('darkModeYes');
  const darkModeNo = document.getElementById('darkModeNo');
  
  if (darkModeYes && darkModeNo) {
    // Check for saved dark mode preference or default to light mode
    const savedDarkMode = localStorage.getItem('darkMode');
    const isDarkMode = savedDarkMode === 'true';
    
    // Apply initial dark mode state
    updateDarkMode(isDarkMode);
    
    // Set radio button states
    if (isDarkMode) {
      darkModeYes.checked = true;
      darkModeNo.checked = false;
    } else {
      darkModeYes.checked = false;
      darkModeNo.checked = true;
    }

    // Add event listeners for dark mode radio buttons
    darkModeYes.addEventListener('change', (e) => {
      if (e.target.checked) {
        localStorage.setItem('darkMode', 'true');
        updateDarkMode(true);
      }
    });

    darkModeNo.addEventListener('change', (e) => {
      if (e.target.checked) {
        localStorage.setItem('darkMode', 'false');
        updateDarkMode(false);
      }
    });
  }
}

function updateDarkMode(isDark) {
  const html = document.documentElement;
  const body = document.body;
  
  if (isDark) {
    html.classList.add('dark');
    body.classList.add('dark');
  } else {
    html.classList.remove('dark');
    body.classList.remove('dark');
  }
  
  // Force a repaint to ensure all styles are applied
  setTimeout(() => {
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
  }, 0);
}

// Function to handle code snippet copying
function initializeCodeSnippetCopy() {
  document.querySelectorAll('pre code').forEach(snippet => {
    const copyButton = document.createElement('button');
    copyButton.className = 'code-snippet-copy absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-sm hover:bg-gray-700';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    copyButton.addEventListener('click', async () => {
      const code = snippet.textContent;
      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('bg-green-600');
        setTimeout(() => {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('bg-green-600');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
        copyButton.textContent = 'Failed to copy';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      }
    });
    
    // Make the code block relative positioned to contain the copy button
    snippet.parentElement.style.position = 'relative';
    snippet.parentElement.appendChild(copyButton);
  });
}

// Enhanced search functionality
let searchTimeout;
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  // Debounced search for better performance
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value.toLowerCase());
    }, 300);
  });
  
  // Handle search form submission
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch(e.target.value.toLowerCase());
    }
  });
}

function performSearch(query = null) {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  const searchQuery = query || searchInput.value.toLowerCase();
  
  // Search in blog grid (if on blog page)
  const blogGrid = document.getElementById('blogGrid');
  if (blogGrid) {
    const posts = blogGrid.querySelectorAll('> div');
    let visibleCount = 0;
    
    posts.forEach(post => {
      const titleElement = post.querySelector('h3 a');
      const excerptElement = post.querySelector('.text-gray-700');
      
      if (!titleElement || !excerptElement) return;
      
      const title = titleElement.textContent.toLowerCase();
      const excerpt = excerptElement.textContent.toLowerCase();
      const categories = Array.from(post.querySelectorAll('.bg-gray-200')).map(cat => cat.textContent.toLowerCase());
      
      const matches = searchQuery === '' || 
        title.includes(searchQuery) || 
        excerpt.includes(searchQuery) ||
        categories.some(cat => cat.includes(searchQuery));
      
      if (matches) {
        post.style.display = 'block';
        visibleCount++;
      } else {
        post.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    let noResultsMsg = document.getElementById('noSearchResults');
    if (searchQuery !== '' && visibleCount === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'noSearchResults';
        noResultsMsg.className = 'col-span-full text-center py-8';
        noResultsMsg.innerHTML = `
          <p class="text-gray-600 text-lg mb-2">No posts found for "${searchQuery}"</p>
          <button onclick="clearSearch()" class="text-black underline hover:text-gray-700">Clear search</button>
        `;
        blogGrid.appendChild(noResultsMsg);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  // Search in recent posts sidebar
  const recentPostsList = document.getElementById('recentBlogsList');
  if (recentPostsList && searchQuery !== '') {
    const recentPosts = recentPostsList.querySelectorAll('li');
    recentPosts.forEach(post => {
      const linkElement = post.querySelector('a');
      if (linkElement) {
        const title = linkElement.textContent.toLowerCase();
        if (title.includes(searchQuery)) {
          post.style.display = 'flex';
          post.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'; // Highlight matching posts
        } else {
          post.style.display = 'none';
        }
      }
    });
  } else if (recentPostsList) {
    // Reset recent posts display
    const recentPosts = recentPostsList.querySelectorAll('li');
    recentPosts.forEach(post => {
      post.style.display = 'flex';
      post.style.backgroundColor = '';
    });
  }
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
    performSearch('');
  }
}

// Handle image loading errors with better fallbacks
function initializeImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('onerror')) {
      img.addEventListener('error', function() {
        // Create a styled placeholder div
        const placeholder = document.createElement('div');
        placeholder.className = 'w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center';
        placeholder.innerHTML = `<span class="text-gray-600 text-sm font-[Indie Flower]">Image unavailable</span>`;
        
        // Replace the broken image with placeholder
        this.parentNode.insertBefore(placeholder, this);
        this.style.display = 'none';
      });
    }
  });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeDarkMode();
  initializeCodeSnippetCopy();
  initializeSearch();
  initializeImageFallbacks();
  initializeSmoothScrolling();
  initializeCodeEnhancements();
  
  // Apply saved dark mode on page load
  const savedDarkMode = localStorage.getItem('darkMode');
  const isDarkMode = savedDarkMode === 'true';
  updateDarkMode(isDarkMode);
});

// Handle localStorage errors gracefully
window.addEventListener('error', function(e) {
  if (e.message.includes('localStorage')) {
    console.warn('localStorage not available, dark mode will not persist');
    // Fallback to sessionStorage or disable persistence
  }
});

// Function to add line numbers to code blocks
function addLineNumbers() {
  console.log('🔧 addLineNumbers function called');
  
  const codeBlocks = document.querySelectorAll('pre code');
  console.log(`📊 Found ${codeBlocks.length} code blocks`);
  
  codeBlocks.forEach((codeBlock, index) => {
    console.log(`🔍 Processing code block ${index + 1}`);
    
    // Skip if already processed
    if (codeBlock.classList.contains('line-numbered')) {
      console.log(`⏭️ Code block ${index + 1} already processed`);
      return;
    }
    
    const pre = codeBlock.parentElement;
    const textContent = codeBlock.textContent;
    console.log(`📝 Code block ${index + 1} content length:`, textContent.length);
    
    const lines = textContent.split('\n');
    console.log(`📋 Code block ${index + 1} has ${lines.length} lines`);
    
    // Remove empty last line if exists
    if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      lines.pop();
      console.log(`🗑️ Removed empty last line, now ${lines.length} lines`);
    }
    
    // Skip if too few lines - REDUCED THRESHOLD FOR TESTING
    if (lines.length <= 0) {
      console.log(`❌ Skipping code block ${index + 1} - too few lines (${lines.length})`);
      return;
    }
    
    console.log(`✅ Adding line numbers to code block ${index + 1}`);
    
    // Add line-numbers class to pre
    pre.classList.add('line-numbers');
    console.log(`🏷️ Added 'line-numbers' class to pre element`);
    
    // Wrap each line in a span with line class
    const numberedContent = lines
      .map((line, lineIndex) => {
        console.log(`📝 Line ${lineIndex + 1}: "${line.substring(0, 20)}${line.length > 20 ? '...' : ''}"`);
        return `<span class="line">${line}</span>`;
      })
      .join('\n');
    
    codeBlock.innerHTML = numberedContent;
    codeBlock.classList.add('line-numbered');
    
    console.log(`🎉 Successfully processed code block ${index + 1}`);
  });
  
  console.log('✨ addLineNumbers function completed');
}

// Enhanced syntax highlighting colors
function applySyntaxHighlighting() {
  document.querySelectorAll('pre code').forEach(codeBlock => {
    let html = codeBlock.innerHTML;
    
    // Basic syntax highlighting patterns
    const patterns = [
      // Comments
      { pattern: /(\/\*[\s\S]*?\*\/|\/\/.*$|#.*$)/gm, replacement: '<span class="comment">$1</span>' },
      // Strings
      { pattern: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, replacement: '<span class="string">$1</span>' },
      // Keywords
      { pattern: /\b(function|const|let|var|if|else|for|while|return|class|import|export|from|async|await|try|catch|finally|throw|new|this|super|extends|implements|interface|type|enum|public|private|protected|static|abstract|final|override|virtual|namespace|using|include|require|def|lambda|yield|with|as|pass|break|continue|global|nonlocal|and|or|not|in|is|True|False|None|null|undefined|void|boolean|string|number|object|array|any|never)\b/g, replacement: '<span class="keyword">$1</span>' },
      // Numbers
      { pattern: /\b(\d+\.?\d*)\b/g, replacement: '<span class="number">$1</span>' },
      // HTML tags
      { pattern: /&lt;(\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^&gt;]*)?)\s*&gt;/g, replacement: '&lt;<span class="tag">$1</span>&gt;' },
      // CSS properties
      { pattern: /([a-zA-Z-]+)(\s*:\s*)/g, replacement: '<span class="property">$1</span>$2' },
      // Functions
      { pattern: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, replacement: '<span class="function">$1</span>' }
    ];
    
    patterns.forEach(({ pattern, replacement }) => {
      html = html.replace(pattern, replacement);
    });
    
    codeBlock.innerHTML = html;
  });
}

// Initialize code enhancements
function initializeCodeEnhancements() {
  console.log('🚀 initializeCodeEnhancements called');
  
  // Wait a bit for DOM to be fully ready
  setTimeout(() => {
    console.log('⏰ Running code enhancements after timeout');
    addLineNumbers();
    applySyntaxHighlighting();
  }, 100);
}