"use strict";
function updateNavbar() {
  // Find the right-side container with navigation and actions
  const navContainer = document.querySelector('header .flex.items-center.gap-2.md\\:gap-6');
  
  if (!navContainer) {
    console.warn('Navbar container not found');
    return;
  }
  
  // Find or create the auth section (last item in the container)
  let authSection = navContainer.querySelector('#navbar-auth-section');
  
  if (!authSection) {
    // Create auth section if it doesn't exist
    authSection = document.createElement('div');
    authSection.id = 'navbar-auth-section';
    
    // Find the "Sign in" button and replace it
    const signInButton = navContainer.querySelector('a[href="sign_in.html"]');
    if (signInButton) {
      signInButton.replaceWith(authSection);
    } else {
      navContainer.appendChild(authSection);
    }
  }
  
  if (AUTH && AUTH.isLoggedIn()) {
    // User is logged in - show profile dropdown
    
    // ✅ FIXED: Get user data from localStorage directly
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    
    // Merge all possible sources of user data
    const displayName = user.name || user.username || profile.username || profile.name || 'User';
    const displayEmail = user.email || profile.email || '';
    const displayPhoto = user.photo || user.profile_image || profile.avatar || profile.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e40af&color=fff`;
    
    authSection.className = 'relative';
    authSection.innerHTML = `
      <!-- Profile Button -->
      <button 
        id="profile-menu-button"
        onclick="toggleProfileMenu()"
        class="inline-flex items-center justify-center gap-2 h-9 px-4 py-2 text-sm font-medium dark:text-white text-black  bg-white dark:bg-transparent rounded-md transition-colors focus:outline-none focus:ring-2"
      >
        <img 
          src="${displayPhoto}" 
          alt="${displayName}" 
          class="w-6 h-6 rounded-full object-cover border-2"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e40af&color=fff'"
        >
        <span class="hidden md:block">${displayName.split(' ')[0]}</span>
        <svg class="w-4 h-4 hidden md:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div 
        id="profile-dropdown"
        class="hidden absolute right-0 mt-2 w-56 bg-white dark:text-white dark:bg-gray-900 rounded-lg shadow-lg text-black py-1 z-50"
      >
        <!-- User Info -->
        <div class="px-4 py-3 dark:border-gray-800">
          <p class="text-sm font-medium text-gray-900 dark:text-white">${displayName}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${displayEmail}</p>
        </div>

        <!-- Menu Items -->
        <a href="profile.html" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Your Profile
        </a>

        <a href="favorites.html" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          Favorites
        </a>

        <a href="history.html" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M12 7v5l4 2"/>
          </svg>
          Watch History
        </a>

        <div class="border-t border-gray-200 dark:border-gray-800 my-1"></div>

        <button 
          onclick="handleLogout()"
          class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 4 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    `;
  } else {
    // User not logged in - show sign in button
    authSection.className = '';
    authSection.innerHTML = `
      <a href="sign_in.html" class="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-transparent border border-red-500/50 dark:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/20 shadow-sm">
        Sign in
      </a>
    `;
  }
  
  // ✅ CRITICAL: Reinitialize mobile features after auth section changes
  reinitializeMobileFeatures();
}

// NEW: Setup mobile search dropdown
function setupMobileSearch() {
  console.log(' Setting up mobile search...');
  
  // Find the mobile search button - look for the button with search icon
  const allButtons = document.querySelectorAll('header button');
  let mobileSearchButton = null;
  
  allButtons.forEach(btn => {
    // Check if button has search icon (circle element)
    const hasSearchIcon = btn.querySelector('svg circle[cx="11"]');
    // Check if it's NOT the theme toggle button
    const isNotThemeToggle = !btn.id || btn.id !== 'theme-toggle';
    
    if (hasSearchIcon && isNotThemeToggle) {
      mobileSearchButton = btn;
      console.log('✅ Found mobile search button');
    }
  });
  
  if (!mobileSearchButton) {
    console.warn(' Mobile search button not found');
    return;
  }
  
  let dropdown = document.getElementById('mobile-search-dropdown');
  
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.id = 'mobile-search-dropdown';
    dropdown.className = 'hidden md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-lg z-40';
    dropdown.innerHTML = `
      <div class="container mx-auto px-4 py-3">
        <div class="relative w-full flex gap-2">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <input 
              type="search" 
              id="mobile-search-input"
              placeholder="Search videos..." 
              class="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 border focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
            >
          </div>
          <button 
            id="mobile-search-btn"
            class="px-4 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            Search
          </button>
        </div>
      </div>
    `;
    
    const header = document.querySelector('header');
    if (header) {
      header.appendChild(dropdown);
    }
  }
  
  // Remove old event listeners by cloning elements
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  
  if (mobileSearchInput && mobileSearchBtn) {
    // Clone to remove all event listeners
    const newSearchBtn = mobileSearchBtn.cloneNode(true);
    mobileSearchBtn.parentNode.replaceChild(newSearchBtn, mobileSearchBtn);
    
    const newSearchInput = mobileSearchInput.cloneNode(true);
    mobileSearchInput.parentNode.replaceChild(newSearchInput, mobileSearchInput);
    
    // Function to sync mobile and desktop search
    function syncSearchAndPerform() {
      const mobileInput = document.getElementById('mobile-search-input');
      const mobileValue = mobileInput?.value.trim();
      const desktopInput = document.getElementById('search-input');
      
      if (desktopInput && mobileValue) {
        desktopInput.value = mobileValue;
        
        if (typeof fetchData === 'function') {
          fetchData();
        } else if (typeof window.fetchData === 'function') {
          window.fetchData();
        } else {
          console.error('fetchData function not found');
        }
      }
    }
    
    // Add fresh event listeners
    newSearchBtn.addEventListener('click', syncSearchAndPerform);
    
    newSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        syncSearchAndPerform();
      }
    });
    
    newSearchInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === '') {
        const desktopSearchInput = document.getElementById('search-input');
        if (desktopSearchInput) {
          desktopSearchInput.value = '';
        }
        if (typeof loadHomepageVideos === 'function') {
          loadHomepageVideos();
        } else if (typeof window.loadHomepageVideos === 'function') {
          window.loadHomepageVideos();
        }
      }
    });
  }
  
  // Set click handler
  mobileSearchButton.onclick = (e) => {
    e.stopPropagation();
    console.log(' Search button clicked!');
    toggleMobileSearch();
  };
  
  console.log('✅ Mobile search setup complete');
}

// NEW: Setup mobile menu (hamburger)
function setupMobileMenu() {
  const navContainer = document.querySelector('header .flex.items-center.gap-2.md\\:gap-6');
  if (!navContainer) return;
  
  let mobileMenuButton = document.getElementById('mobile-menu-button');
  
  if (!mobileMenuButton) {
    mobileMenuButton = document.createElement('button');
    mobileMenuButton.id = 'mobile-menu-button';
    mobileMenuButton.className = 'md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700';
    mobileMenuButton.innerHTML = `
      <svg id="hamburger-icon" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
      <svg id="close-icon" class="w-5 h-5 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <span class="sr-only">Menu</span>
    `;
    
    const authSection = document.getElementById('navbar-auth-section');
    if (authSection) {
      navContainer.insertBefore(mobileMenuButton, authSection);
    } else {
      navContainer.appendChild(mobileMenuButton);
    }
  }
  
  let mobileMenuDropdown = document.getElementById('mobile-menu-dropdown');
  
  if (!mobileMenuDropdown) {
    mobileMenuDropdown = document.createElement('div');
    mobileMenuDropdown.id = 'mobile-menu-dropdown';
    mobileMenuDropdown.className = 'hidden md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-lg z-40';
    mobileMenuDropdown.innerHTML = `
      <nav class="container mx-auto px-4 py-4 flex flex-col gap-2">
        <a href="./home.html" class="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          Home
        </a>
        <a href="./playlist.html" class="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          Explore
        </a>
      </nav>
    `;
    
    const header = document.querySelector('header');
    if (header) {
      header.appendChild(mobileMenuDropdown);
    }
  }
  
  // Set click handler
  mobileMenuButton.onclick = (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  };
}

// NEW: Reorder navbar for mobile
function reorderNavbarForMobile() {
  const navContainer = document.querySelector('header .flex.items-center.gap-2.md\\:gap-6');
  if (!navContainer) return;
  
  const desktopNav = navContainer.querySelector('nav.hidden.md\\:flex');
  
  // Find search button more reliably
  const allButtons = navContainer.querySelectorAll('button');
  let searchButton = null;
  allButtons.forEach(btn => {
    if (btn.querySelector('svg circle[cx="11"]') && btn.id !== 'theme-toggle') {
      searchButton = btn;
    }
  });
  
  const darkModeButton = document.getElementById('theme-toggle');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const authSection = document.getElementById('navbar-auth-section');
  
  function checkAndReorder() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile order: search → dark mode → mobile menu → auth
      if (desktopNav) desktopNav.style.display = 'none';
      if (searchButton) navContainer.appendChild(searchButton);
      if (darkModeButton) navContainer.appendChild(darkModeButton);
      if (mobileMenuButton) navContainer.appendChild(mobileMenuButton);
      if (authSection) navContainer.appendChild(authSection);
    } else {
      if (desktopNav) desktopNav.style.display = '';
    }
  }
  
  checkAndReorder();
  
  // Remove old resize listener
  if (window._navbarResizeHandler) {
    window.removeEventListener('resize', window._navbarResizeHandler);
  }
  
  // Add new resize listener
  let resizeTimeout;
  window._navbarResizeHandler = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkAndReorder, 100);
  };
  
  window.addEventListener('resize', window._navbarResizeHandler);
}

// ✅ NEW: Function to reinitialize all mobile features
function reinitializeMobileFeatures() {
  console.log('Reinitializing mobile features...');
  setupMobileSearch();
  setupMobileMenu();
  reorderNavbarForMobile();
}

// NEW: Toggle mobile search
function toggleMobileSearch() {
  console.log('toggleMobileSearch called');
  const dropdown = document.getElementById('mobile-search-dropdown');
  const input = document.getElementById('mobile-search-input');
  const mobileMenu = document.getElementById('mobile-menu-dropdown');
  
  if (!dropdown) {
    console.error('❌ Mobile search dropdown not found!');
    return;
  }
  
  console.log('Dropdown found, current state:', dropdown.classList.contains('hidden') ? 'hidden' : 'visible');
  
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    toggleMenuIcon(false);
  }
  
  const isHidden = dropdown.classList.contains('hidden');
  dropdown.classList.toggle('hidden');
  console.log('New state:', isHidden ? 'visible' : 'hidden');
  
  if (isHidden && input) {
    setTimeout(() => input.focus(), 100);
  }
}

// NEW: Toggle mobile menu
function toggleMobileMenu() {
  const dropdown = document.getElementById('mobile-menu-dropdown');
  const searchDropdown = document.getElementById('mobile-search-dropdown');
  
  if (!dropdown) return;
  
  if (searchDropdown && !searchDropdown.classList.contains('hidden')) {
    searchDropdown.classList.add('hidden');
  }
  
  const isHidden = dropdown.classList.contains('hidden');
  dropdown.classList.toggle('hidden');
  toggleMenuIcon(!isHidden);
}

// Toggle hamburger/close icon
function toggleMenuIcon(isOpen) {
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  
  if (hamburgerIcon && closeIcon) {
    if (isOpen) {
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }
}

// Toggle profile dropdown menu
function toggleProfileMenu() {
  const dropdown = document.getElementById('profile-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  const profileButton = document.getElementById('profile-menu-button');
  const dropdown = document.getElementById('profile-dropdown');
  
  if (dropdown && !dropdown.classList.contains('hidden')) {
    if (!profileButton?.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.add('hidden');
    }
  }
  
  // NEW: Close mobile search
  const allButtons = document.querySelectorAll('header button');
  let mobileSearchButton = null;
  allButtons.forEach(btn => {
    if (btn.querySelector('svg circle[cx="11"]') && btn.id !== 'theme-toggle') {
      mobileSearchButton = btn;
    }
  });
  
  const mobileSearchDropdown = document.getElementById('mobile-search-dropdown');
  
  if (mobileSearchDropdown && !mobileSearchDropdown.classList.contains('hidden')) {
    if (!mobileSearchButton?.contains(event.target) && !mobileSearchDropdown.contains(event.target)) {
      mobileSearchDropdown.classList.add('hidden');
    }
  }
  
  // NEW: Close mobile menu
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenuDropdown = document.getElementById('mobile-menu-dropdown');
  
  if (mobileMenuDropdown && !mobileMenuDropdown.classList.contains('hidden')) {
    if (!mobileMenuButton?.contains(event.target) && !mobileMenuDropdown.contains(event.target)) {
      mobileMenuDropdown.classList.add('hidden');
      toggleMenuIcon(false);
    }
  }
});

// Handle logout
function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    if (AUTH && typeof AUTH.logout === 'function') {
      AUTH.logout('home.html');
    } else {
      // Fallback if AUTH is not available
      localStorage.clear();
      window.location.href = 'home.html';
    }
  }
}

// Update navbar when page loads
document.addEventListener('DOMContentLoaded', updateNavbar);

// Also run after a delay to catch any late updates from auth.js
setTimeout(updateNavbar, 500);

// Listen for storage changes (when user logs in/out in another tab)
window.addEventListener('storage', (e) => {
  if (e.key === 'authToken' || e.key === 'access_token') {
    updateNavbar();
  }
});

// Export for use in other scripts
window.updateNavbar = updateNavbar;
window.reinitializeMobileFeatures = reinitializeMobileFeatures;
window.handleLogout = handleLogout;
window.toggleProfileMenu = toggleProfileMenu;
window.toggleMobileSearch = toggleMobileSearch;
window.toggleMobileMenu = toggleMobileMenu;