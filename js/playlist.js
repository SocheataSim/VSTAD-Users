// Wrap everything in IIFE to avoid global scope conflicts
(function() {
    'use strict';
    
    // API Configuration
    const API_BASE_URL = 'https://vstad-api.cheatdev.online/api';
    const USER_ID = 1; // Change this to dynamic user ID if needed

    // State Management
    let currentPlaylistId = 'all';
    let currentYear = 'all';
    let allPlaylists = [];
    let allVideos = [];
    let displayedVideos = [];
    let videosPerPage = 8;
    let currentPage = 1;

    // DOM Elements
    const videoResults = document.getElementById('video-results');
    const playlistTitle = document.getElementById('playlist-title');
    const videoCount = document.getElementById('video-count');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const yearFilter = document.getElementById('year-filter');
    const playlistButtons = document.querySelectorAll('.playlist-btn');

// Initialize the application
async function init() {
    showLoadingState();
    try {
        await fetchAllPlaylists();
        await fetchAllVideos();
        displayVideos();
    } catch (error) {
        console.error('Error initializing app:', error);
        showErrorState('Failed to load videos. Please try again later.');
    }
}

// Fetch all playlists
async function fetchAllPlaylists() {
    try {
        const response = await fetch(`${API_BASE_URL}/playlists/user/${USER_ID}`);
        if (!response.ok) throw new Error('Failed to fetch playlists');
        
        const data = await response.json();
        // API returns array directly, not wrapped in data object
        allPlaylists = Array.isArray(data) ? data : (data.data || []);
        
        console.log('Fetched playlists:', allPlaylists);
        
        // Update playlist buttons dynamically (optional)
        updatePlaylistButtons();
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error;
    }
}

// Fetch all videos from all playlists
async function fetchAllVideos() {
    try {
        const videoPromises = allPlaylists.map(playlist => 
            fetch(`${API_BASE_URL}/playlists/${playlist.id}`)
                .then(res => res.json())
                .then(data => ({
                    playlistId: playlist.id,
                    playlistName: playlist.title, // API uses 'title' not 'name'
                    videos: data.videos || [] // Videos are directly in response
                }))
        );
        
        const playlistsWithVideos = await Promise.all(videoPromises);
        
        console.log('Fetched videos from playlists:', playlistsWithVideos);
        
        // Flatten all videos into a single array with playlist info
        allVideos = playlistsWithVideos.flatMap(playlist => 
            playlist.videos.map(video => ({
                ...video,
                playlistId: playlist.playlistId,
                playlistName: playlist.playlistName
            }))
        );
        
        // Remove duplicates if a video appears in multiple playlists
        allVideos = Array.from(new Map(allVideos.map(v => [v.id, v])).values());
        
        console.log('Total videos loaded:', allVideos.length);
        
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
}

// Filter videos based on current filters
function filterVideos() {
    let filtered = [...allVideos];
    
    // Filter by playlist
    if (currentPlaylistId !== 'all') {
        filtered = filtered.filter(video => video.playlistId === parseInt(currentPlaylistId));
    }
    
    // Filter by year
    if (currentYear !== 'all') {
        filtered = filtered.filter(video => {
            const videoYear = new Date(video.created_at || video.upload_date).getFullYear();
            return videoYear === parseInt(currentYear);
        });
    }
    
    return filtered;
}

// Display videos
function displayVideos(append = false) {
    const filteredVideos = filterVideos();
    
    if (!append) {
        currentPage = 1;
        displayedVideos = [];
    }
    
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const videosToShow = filteredVideos.slice(startIndex, endIndex);
    
    displayedVideos = filteredVideos.slice(0, endIndex);
    
    if (!append) {
        videoResults.innerHTML = '';
    }
    
    if (filteredVideos.length === 0) {
        videoResults.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <p class="text-gray-600 dark:text-gray-400 text-lg">No videos found</p>
                <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">Try adjusting your filters</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        videoCount.textContent = '0 videos';
        return;
    }
    
    videosToShow.forEach(video => {
        const videoCard = createVideoCard(video);
        videoResults.appendChild(videoCard);
    });
    
    // Update video count
    videoCount.textContent = `${filteredVideos.length} video${filteredVideos.length !== 1 ? 's' : ''}`;
    
    // Show/hide load more button
    if (displayedVideos.length >= filteredVideos.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Create video card element
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card group cursor-pointer';
    
    // Extract video data with fallbacks
    const thumbnail = video.thumbnail_url || video.thumbnail || 'https://via.placeholder.com/640x360?text=No+Thumbnail';
    const title = video.title || 'Untitled Video';
    const channelName = video.channel_name || video.author || 'Unknown Channel';
    const views = formatViews(video.views || video.view_count || 0);
    const uploadDate = formatDate(video.created_at || video.upload_date);
    const duration = formatDuration(video.duration || 0);
    const videoId = video.id;
    const channelAvatar = video.channel_avatar || video.avatar_url || '';
    
    card.innerHTML = `
        <div class="thumbnail-wrapper mb-3">
            <img src="${thumbnail}" alt="${title}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/640x360?text=No+Thumbnail'">
            ${duration ? `<span class="duration-badge">${duration}</span>` : ''}
        </div>
        <div class="flex gap-3">
            <div class="profile-circle">
                ${channelAvatar 
                    ? `<img src="${channelAvatar}" alt="${channelName}" onerror="this.innerHTML='${getInitials(channelName)}'">` 
                    : getInitials(channelName)
                }
            </div>
            <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    ${title}
                </h3>
                <p class="text-xs text-gray-600 dark:text-gray-400">${channelName}</p>
                <p class="text-xs text-gray-500 dark:text-gray-500">${views} views • ${uploadDate}</p>
            </div>
        </div>
    `;
    
    // Add click handler to navigate to video page
    card.addEventListener('click', () => {
        // You can navigate to video detail page here
        console.log('Video clicked:', videoId);
        // window.location.href = `video-detail.html?id=${videoId}`;
    });
    
    return card;
}

// Update playlist buttons dynamically (optional)
function updatePlaylistButtons() {
    const playlistContainer = document.querySelector('.playlist-scroll .flex');
    
    // Keep the "All Videos" button
    const allButton = playlistContainer.querySelector('[data-playlist="all"]');
    
    // Clear other buttons
    playlistContainer.innerHTML = '';
    playlistContainer.appendChild(allButton);
    
    // Add buttons for each playlist
    allPlaylists.forEach(playlist => {
        const button = document.createElement('button');
        button.className = 'playlist-btn px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium whitespace-nowrap';
        button.setAttribute('data-playlist', playlist.id);
        button.textContent = playlist.title; // API uses 'title' not 'name'
        
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            document.querySelectorAll('.playlist-btn').forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Update state
            currentPlaylistId = playlist.id;
            playlistTitle.textContent = playlist.title;
            
            // Display filtered videos
            displayVideos();
        });
        
        playlistContainer.appendChild(button);
    });
}

// Handle playlist change
function handlePlaylistChange(playlistId, playlistName) {
    // This function is no longer needed as we moved the logic inline
    // Keeping it for backward compatibility if called elsewhere
    currentPlaylistId = playlistId;
    playlistTitle.textContent = playlistName;
    displayVideos();
}

// Event Listeners
// Note: Playlist button event listeners are added dynamically in updatePlaylistButtons()
// We only need to add listener for the "All Videos" button here
const allVideosBtn = document.querySelector('.playlist-btn[data-playlist="all"]');
if (allVideosBtn) {
    allVideosBtn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.playlist-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Update state
        currentPlaylistId = 'all';
        playlistTitle.textContent = 'All Videos';
        
        // Display filtered videos
        displayVideos();
    });
}

yearFilter.addEventListener('change', (e) => {
    currentYear = e.target.value;
    displayVideos();
});

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    displayVideos(true);
});

// Search functionality
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm) {
            const searchResults = allVideos.filter(video => 
                video.title.toLowerCase().includes(searchTerm) ||
                (video.channel_name || '').toLowerCase().includes(searchTerm) ||
                (video.description || '').toLowerCase().includes(searchTerm)
            );
            
            videoResults.innerHTML = '';
            
            if (searchResults.length === 0) {
                videoResults.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="text-gray-600 dark:text-gray-400 text-lg">No results found for "${searchTerm}"</p>
                    </div>
                `;
                videoCount.textContent = '0 videos';
            } else {
                searchResults.forEach(video => {
                    const videoCard = createVideoCard(video);
                    videoResults.appendChild(videoCard);
                });
                videoCount.textContent = `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}`;
            }
            
            loadMoreBtn.style.display = 'none';
        } else {
            displayVideos();
        }
    });
}

// Utility Functions
function formatViews(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

function formatDuration(seconds) {
    if (!seconds) return '';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function getInitials(name) {
    if (!name) return 'U';
    const words = name.split(' ');
    if (words.length >= 2) {
        return words[0][0] + words[1][0];
    }
    return name.substring(0, 2).toUpperCase();
}

function showLoadingState() {
    videoResults.innerHTML = `
        <div class="col-span-full flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    `;
    loadMoreBtn.style.display = 'none';
}

function showErrorState(message) {
    videoResults.innerHTML = `
        <div class="col-span-full text-center py-12">
            <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-gray-600 dark:text-gray-400 text-lg">${message}</p>
            <button class="retry-btn mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Try Again
            </button>
        </div>
    `;
    
    // Add click handler for retry button
    const retryBtn = videoResults.querySelector('.retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', init);
    }
    
    loadMoreBtn.style.display = 'none';
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

})(); // End of IIFE