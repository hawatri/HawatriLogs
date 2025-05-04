const contentArea = document.getElementById("contentArea");
const recentContentsList = document.getElementById("recentBlogsList");
const searchInput = document.querySelector('input[type="text"]');
let currentPage = 'home';
let blogs = [];

// Dark mode functionality
function initializeDarkMode() {
  const darkModeYes = document.getElementById('darkModeYes');
  const darkModeNo = document.getElementById('darkModeNo');
  if (!darkModeYes || !darkModeNo) return;

  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    darkModeYes.checked = true;
  } else {
    darkModeNo.checked = true;
  }
  updateDarkMode(isDarkMode);

  // Add event listeners for dark mode radio buttons
  darkModeYes.addEventListener('change', () => {
    localStorage.setItem('darkMode', 'true');
    updateDarkMode(true);
  });

  darkModeNo.addEventListener('change', () => {
    localStorage.setItem('darkMode', 'false');
    updateDarkMode(false);
  });
}

function updateDarkMode(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('bg-gray-900', 'text-white');
    document.body.classList.remove('bg-white', 'text-black');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('bg-gray-900', 'text-white');
    document.body.classList.add('bg-white', 'text-black');
  }
}

// Function to update active page button styling
function updateActivePageButton(pageName) {
  document.querySelectorAll('nav button').forEach(btn => {
    btn.classList.remove('border-2', 'border-black', 'rounded-lg', 'px-4', 'py-1');
  });
  
  const activeBtn = document.getElementById(`${pageName}Btn`);
  if (activeBtn) {
    activeBtn.classList.add('border-2', 'border-black', 'rounded-lg', 'px-4', 'py-1');
  }
}

// Function to filter blogs based on search query
function filterBlogs(query) {
  if (!query) return blogs;
  
  const searchTerms = query.toLowerCase().split(' ');
  return blogs.filter(blog => {
    const blogText = `${blog.title} ${blog.excerpt}`.toLowerCase();
    return searchTerms.every(term => blogText.includes(term));
  });
}

// Function to handle code snippet copying
function initializeCodeSnippetCopy() {
  document.querySelectorAll('.code-snippet').forEach(snippet => {
    const copyButton = document.createElement('button');
    copyButton.className = 'code-snippet-copy';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    copyButton.addEventListener('click', async () => {
      const code = snippet.querySelector('code').textContent;
      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        setTimeout(() => {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
        copyButton.textContent = 'Failed to copy';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      }
    });
    
    snippet.appendChild(copyButton);
  });
}

// Function to load page content
async function loadPage(pageName) {
  try {
    const response = await fetch(`/pages/${pageName}.html`);
    if (!response.ok) throw new Error('Page not found');
    const content = await response.text();
    contentArea.innerHTML = content;
    currentPage = pageName;
    updateActivePageButton(pageName);
    
    if (pageName === 'contents') {
      await renderBlogList();
    } else if (pageName === 'settings') {
      initializeDarkMode();
    }
    initializeCodeSnippetCopy(); // Initialize copy buttons for code snippets
  } catch (error) {
    console.error('Error loading page:', error);
    contentArea.innerHTML = '<p>Error loading page content.</p>';
  }
}

// Function to load blog content
async function loadBlog(slug) {
  try {
    console.log('Loading blog:', slug);
    const response = await fetch(`/blog/${slug}.html`);
    if (!response.ok) throw new Error('Blog not found');
    const content = await response.text();
    contentArea.innerHTML = content;
    initializeCodeSnippetCopy(); // Initialize copy buttons for code snippets
  } catch (error) {
    console.error('Error loading blog:', error);
    contentArea.innerHTML = '<p>Error loading blog content.</p>';
  }
}

// Function to load blog metadata
async function loadBlogs() {
  try {
    console.log('Fetching blog index...');
    const response = await fetch('/blog/index.json');
    if (!response.ok) throw new Error('Blog index not found');
    const data = await response.json();
    console.log('Raw blog data:', data);
    // Sort blogs by date in descending order (newest first)
    blogs = data.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log('Sorted blogs:', blogs);
    return blogs;
  } catch (error) {
    console.error('Error loading blogs:', error);
    return [];
  }
}

// Function to render blog list
async function renderBlogList(searchQuery = '') {
  const blogGrid = contentArea.querySelector('#blogGrid');
  if (!blogGrid) {
    console.error('Blog grid element not found');
    return;
  }

  blogGrid.innerHTML = '';
  const filteredBlogs = filterBlogs(searchQuery);
  console.log('Rendering blogs:', filteredBlogs);
  
  if (filteredBlogs.length === 0) {
    blogGrid.innerHTML = '<p class="text-gray-600">No matching contents found.</p>';
    return;
  }
  
  filteredBlogs.forEach(blog => {
    console.log('Processing blog:', blog);
    const blogCard = document.createElement('div');
    blogCard.className = 'border-2 border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300';
    
    // Create thumbnail container
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'h-48 overflow-hidden bg-gray-100';
    
    // Create thumbnail image
    const thumbnail = document.createElement('img');
    thumbnail.src = '/blog/images/shutterstock_1049564585-960.jpg';
    thumbnail.alt = blog.title;
    thumbnail.className = 'w-full h-full object-cover';
    thumbnail.onerror = function() {
      this.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzQvLy8vLzQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
    };
    
    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'p-4';
    
    // Create title
    const title = document.createElement('h3');
    title.className = 'font-[Indie Flower] text-xl font-normal mb-2';
    title.textContent = blog.title;
    
    // Create date
    const date = document.createElement('p');
    date.className = 'text-sm text-gray-600 mb-2';
    date.textContent = new Date(blog.date).toLocaleDateString();
    
    // Create excerpt
    const excerpt = document.createElement('p');
    excerpt.className = 'text-gray-700 mb-4';
    excerpt.textContent = blog.excerpt;
    
    // Create read more button
    const readMoreBtn = document.createElement('button');
    readMoreBtn.type = 'button';
    readMoreBtn.className = 'text-black underline hover:text-gray-700 focus:outline-none';
    readMoreBtn.textContent = 'Read More';
    readMoreBtn.dataset.slug = blog.slug;
    readMoreBtn.addEventListener('click', () => loadBlog(blog.slug));
    
    // Assemble the card
    thumbnailContainer.appendChild(thumbnail);
    contentContainer.appendChild(title);
    contentContainer.appendChild(date);
    contentContainer.appendChild(excerpt);
    contentContainer.appendChild(readMoreBtn);
    
    blogCard.appendChild(thumbnailContainer);
    blogCard.appendChild(contentContainer);
    blogGrid.appendChild(blogCard);
  });
}

// Function to render recent blogs
async function renderRecentBlogs() {
  if (!recentContentsList) {
    console.error('Recent contents list element not found');
    return;
  }
  
  recentContentsList.innerHTML = "";
  const blogs = await loadBlogs();
  const recentBlogs = blogs.slice(0, 10);
  
  recentBlogs.forEach(blog => {
    const li = document.createElement("li");
    li.className = "flex items-center space-x-3 select-none";
    
    const circle = document.createElement("span");
    circle.className = "block w-4 h-4 rounded-full border-2 border-black";
    circle.setAttribute("aria-hidden", "true");
    
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "text-black underline hover:text-gray-700 focus:outline-none";
    btn.textContent = blog.title;
    btn.dataset.slug = blog.slug;
    btn.addEventListener("click", () => loadBlog(blog.slug));
    
    li.appendChild(circle);
    li.appendChild(btn);
    recentContentsList.appendChild(li);
  });
}

// Handle search form submission
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchQuery = searchInput.value.trim();
  
  if (currentPage === 'contents') {
    await renderBlogList(searchQuery);
  } else {
    await loadPage('contents');
    await renderBlogList(searchQuery);
  }
});

// Handle search input changes
searchInput.addEventListener('input', async (e) => {
  const searchQuery = e.target.value.trim();
  
  if (currentPage === 'contents') {
    await renderBlogList(searchQuery);
  }
});

// Event listeners for navigation buttons
document.getElementById("homeBtn").addEventListener("click", () => loadPage("home"));
document.getElementById("contentsBtn").addEventListener("click", () => loadPage("contents"));
document.getElementById("settingsBtn").addEventListener("click", () => loadPage("settings"));
document.getElementById("aboutBtn").addEventListener("click", () => loadPage("about"));

// Initialize the page
renderRecentBlogs();
loadPage("home");
initializeDarkMode(); // Initialize dark mode on page load

// Refresh recent blogs every 30 seconds to catch new additions
setInterval(renderRecentBlogs, 30000); 