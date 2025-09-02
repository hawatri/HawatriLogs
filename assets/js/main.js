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
  initializeCodeCopy();
  initializeImageFallbacks();
  initializeSmoothScrolling();
});