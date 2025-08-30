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

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('#blogGrid > div');
    
    posts.forEach(post => {
      const title = post.querySelector('h3').textContent.toLowerCase();
      const excerpt = post.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(query) || excerpt.includes(query)) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeDarkMode();
  initializeCodeSnippetCopy();
  initializeSearch();
  
  // Apply saved dark mode on page load
  const savedDarkMode = localStorage.getItem('darkMode');
  const isDarkMode = savedDarkMode === 'true';
  updateDarkMode(isDarkMode);
});
