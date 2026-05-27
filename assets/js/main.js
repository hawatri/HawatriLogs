// ========================================
// HAWATRI LOGS - JS
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

// CODE BLOCKS — wrap pre with a header bar (language label + copy button)
//                and number every line.
function initializeCodeBlocks() {
  document.querySelectorAll('#contentArea pre').forEach(preBlock => {
    if (preBlock.dataset.enhanced === 'true') return;
    preBlock.dataset.enhanced = 'true';

    const codeEl = preBlock.querySelector('code') || preBlock;
    const lang = detectLanguage(codeEl);

    wrapLines(codeEl);
    wrapWithHeader(preBlock, codeEl, lang);
  });
}

function detectLanguage(codeEl) {
  const cls = codeEl.className || '';
  const m = cls.match(/language-([\w+-]+)/);
  if (!m) return '';
  const raw = m[1].toLowerCase();
  const aliases = {
    js: 'javascript', ts: 'typescript', py: 'python', rb: 'ruby',
    sh: 'bash', shell: 'bash', yml: 'yaml', md: 'markdown'
  };
  return aliases[raw] || raw;
}

function wrapWithHeader(preBlock, codeEl, lang) {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-block';

  const header = document.createElement('div');
  header.className = 'code-header';

  const label = document.createElement('span');
  label.className = 'code-lang';
  label.textContent = lang || 'text';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';
  btn.textContent = 'Copy';
  btn.setAttribute('aria-label', 'Copy code to clipboard');
  btn.addEventListener('click', async () => {
    const text = Array.from(codeEl.querySelectorAll('.line .lc'))
      .map(l => l.textContent === ' ' ? '' : l.textContent)
      .join('\n');
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback(btn, 'Copied!');
    } catch (err) {
      console.error('Copy failed:', err);
      showCopyFeedback(btn, 'Failed');
    }
  });

  header.appendChild(label);
  header.appendChild(btn);

  preBlock.parentNode.insertBefore(wrapper, preBlock);
  wrapper.appendChild(header);
  wrapper.appendChild(preBlock);
}

function wrapLines(codeEl) {
  if (codeEl.querySelector('.line')) return;

  const raw = codeEl.textContent.replace(/\n$/, '');
  const lines = raw.split('\n');
  const frag = document.createDocumentFragment();

  lines.forEach((line, i) => {
    const lineEl = document.createElement('span');
    lineEl.className = 'line';

    const num = document.createElement('span');
    num.className = 'ln';
    num.setAttribute('aria-hidden', 'true');
    num.textContent = (i + 1).toString();

    const content = document.createElement('span');
    content.className = 'lc';
    content.textContent = line.length ? line : ' ';

    lineEl.appendChild(num);
    lineEl.appendChild(content);
    frag.appendChild(lineEl);
  });

  codeEl.textContent = '';
  codeEl.appendChild(frag);
}

function showCopyFeedback(button, text) {
  const original = button.textContent;
  button.textContent = text;
  setTimeout(() => { button.textContent = original; }, 1500);
}

// READING PROGRESS BAR — fills as the user scrolls through a post.
function initializeProgressBar() {
  const article = document.querySelector('#contentArea article');
  if (!article) return;

  const bar = document.createElement('div');
  bar.id = 'readingProgress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  const update = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

// BACK-TO-TOP BUTTON
function initializeBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '&#8593;';
  document.body.appendChild(btn);

  const toggle = () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// SEARCH SHORTCUT — `/` focuses search (unless user is already typing somewhere)
function initializeSearchShortcut() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  document.addEventListener('keydown', (e) => {
    if (e.key !== '/') return;
    const t = e.target;
    const tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable)) return;
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  });
}

// HEADING ANCHORS — adds a clickable # next to h2/h3/h4 in post content
function initializeHeadingAnchors() {
  const headings = document.querySelectorAll('#contentArea h2, #contentArea h3, #contentArea h4');
  headings.forEach(h => {
    if (!h.id) h.id = slugify(h.textContent);
    if (h.querySelector('.heading-anchor')) return;

    const a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = '#' + h.id;
    a.setAttribute('aria-label', 'Link to this section');
    a.textContent = '#';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const url = location.origin + location.pathname + '#' + h.id;
      history.replaceState(null, '', '#' + h.id);
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    });
    h.appendChild(a);
  });
}

function slugify(s) {
  return s.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

// SEARCH FUNCTIONALITY
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.getElementById('searchResults');
    let allPosts = [];
    let selectedIndex = -1;

    if (!searchInput || !searchResultsContainer) return;

    fetch('/search.json')
        .then(response => response.json())
        .then(data => { allPosts = data; })
        .catch(error => console.error('Error fetching search data:', error));

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const performSearch = (query) => {
        if (query.length < 2) { hideResults(); return; }

        const lowerCaseQuery = query.toLowerCase();
        const results = allPosts.filter(post =>
            post.title.toLowerCase().includes(lowerCaseQuery) ||
            post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
            post.categories.some(cat => cat.toLowerCase().includes(lowerCaseQuery))
        ).slice(0, 10);

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
        if (e.target.value.length >= 2) performSearch(e.target.value);
    });

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
            if (selectedIndex > -1) items[selectedIndex].click();
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

      if (this.parentNode) this.parentNode.insertBefore(placeholder, this);
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
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (error) {
        console.warn('Smooth scroll target not found:', this.getAttribute('href'));
      }
    });
  });
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initializeDarkMode();
  initializeCodeBlocks();
  initializeImageFallbacks();
  initializeSmoothScrolling();
  initializeSearch();
  initializeSearchShortcut();
  initializeHeadingAnchors();
  initializeProgressBar();
  initializeBackToTop();
});
