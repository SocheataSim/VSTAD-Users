// Store the current counts to detect changes
let previousCounts = {
  likes: 0,
  comments: 0,
  shares: 0
};

// Function to load video likes
async function loadVideoLikes(videoId, skip = 0, limit = 20) {
  try {
    const response = await fetch(
      `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/likes?skip=${skip}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
    
  } catch (error) {
    console.error("Error fetching video likes:", error);
    return [];
  }
}

// Function to load video comments
async function loadComments(videoId, skip = 0, limit = 20) {
  try {
    const response = await fetch(
      `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/comments?skip=${skip}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
    
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

// Function to load video shares
async function loadVideoShares(videoId, skip = 0, limit = 20) {
  try {
    const response = await fetch(
      `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/shares?skip=${skip}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
    
  } catch (error) {
    console.error("Error fetching video shares:", error);
    return [];
  }
}

// Function to load all video interactions with change detection
async function loadVideoInteractions(videoId) {
  try {
    const [likes, comments, shares] = await Promise.all([
      loadVideoLikes(videoId),
      loadComments(videoId),
      loadVideoShares(videoId)
    ]);
    
    const currentCounts = {
      likes: likes.length,
      comments: comments.length,
      shares: shares.length
    };
    
    // Detect changes and animate if needed
    animateCountIfChanged('likeCount', previousCounts.likes, currentCounts.likes);
    animateCountIfChanged('commentCount', previousCounts.comments, currentCounts.comments);
    
    // Update shares count with animation
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      const shareCountSpan = shareBtn.querySelector('span');
      if (shareCountSpan) {
        animateCountChange(shareCountSpan, previousCounts.shares, currentCounts.shares);
      }
    }
    
    // Update previous counts
    previousCounts = { ...currentCounts };
    
    // Update all UI elements
    updateLikesCount(currentCounts.likes);
    updateCommentsUI(comments);
    updateSharesCount(currentCounts.shares);
    
    console.log('Interactions loaded:', currentCounts);
    
    return {
      likes,
      comments,
      shares,
      totalLikes: currentCounts.likes,
      totalComments: currentCounts.comments,
      totalShares: currentCounts.shares
    };
    
  } catch (error) {
    console.error("Error loading video interactions:", error);
    return null;
  }
}

// Helper function to animate count changes
function animateCountIfChanged(elementId, oldCount, newCount) {
  const element = document.getElementById(elementId);
  if (element && oldCount !== newCount) {
    animateCountChange(element, oldCount, newCount);
  }
}

// Animate count change with color and scale effect
function animateCountChange(element, oldCount, newCount) {
  if (oldCount === newCount) {
    element.textContent = newCount;
    return;
  }
  
  // Add animation class
  element.style.transition = 'transform 0.3s ease, color 0.3s ease';
  
  // Determine if increasing or decreasing
  const isIncreasing = newCount > oldCount;
  
  // Change color based on increase/decrease
  element.style.color = isIncreasing ? '#10b981' : '#ef4444'; // green for increase, red for decrease
  element.style.transform = 'scale(1.2)';
  
  // Update the number
  element.textContent = newCount;
  
  // Reset after animation
  setTimeout(() => {
    element.style.color = '';
    element.style.transform = 'scale(1)';
  }, 300);
}

// Helper function to update likes count
function updateLikesCount(count) {
  const likeCountElement = document.getElementById('likeCount');
  if (likeCountElement) {
    likeCountElement.textContent = count;
  }
}

// Helper function to update shares count
function updateSharesCount(count) {
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    const shareCountSpan = shareBtn.querySelector('span');
    if (shareCountSpan) {
      shareCountSpan.textContent = count;
    }
  }
}

// Display comments in the comments section
function displayComments(comments) {
  const commentsList = document.getElementById('commentsList');
  
  if (!commentsList) return;
  
  if (comments.length === 0) {
    commentsList.innerHTML = '<p class="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>';
    return;
  }
  
  commentsList.innerHTML = '';
  const currentUserId = window.AUTH?.getUserId();
  
  comments.forEach(comment => {
    const profileImg = comment.user.profile_image 
      ? `https://vstad-api.cheatdev.online/uploads/profiles/${comment.user.profile_image}`
      : "../asset/sokkhim.jpg";
    
    const timeAgo = timeSince(new Date(comment.created_at));
    const displayName = comment.user.full_name || comment.user.username;
    
    // Check if this comment belongs to the current user
    const isOwnComment = currentUserId && comment.user_id == currentUserId;
    
    const commentHTML = `
      <div class="flex space-x-3 mb-4 group" data-comment-id="${comment.id}">
        <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img src="${profileImg}" alt="${displayName}" class="w-full h-full object-cover">
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="font-semibold text-gray-900 dark:text-white">${displayName}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">${timeAgo}</span>
            </div>
            ${isOwnComment ? `
              <button onclick="deleteComment(${comment.id}, ${comment.video_id})" 
                      class="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete comment">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            ` : ''}
          </div>
          <p class="text-gray-700 dark:text-gray-300 mt-1">${comment.content}</p>
        </div>
      </div>
    `;
    
    commentsList.innerHTML += commentHTML;
  });
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const result = Math.floor(seconds / value);
    if (result >= 1) return `${result} ${unit}${result > 1 ? 's' : ''} ago`;
  }

  return "Just now";
}

function updateCommentsUI(comments) {
  console.log("Comments data:", comments);
  
  const commentCountElement = document.getElementById('commentCount');
  if (commentCountElement) {
    commentCountElement.textContent = comments.length;
  }
  
  // Display comments
  displayComments(comments);
}

async function checkUserInteractions(videoId) {
  if (!window.AUTH?.isLoggedIn()) return;

  try {
    const token = window.AUTH.getToken();
    
    // Check if liked
    const likedResponse = await fetch(
      `https://vstad-api.cheatdev.online/api/interactions/user/liked-videos?skip=0&limit=100`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    
    if (likedResponse.ok) {
      const likedData = await likedResponse.json();
      const likedVideos = likedData.videos || [];
      const isLiked = likedVideos.some(v => v.id == videoId);
      
      // Update global state if post-interactions.js is loaded
      if (window.interactionStates) {
        window.interactionStates.isLiked = isLiked;
      }
      if (window.updateLikeButton) {
        window.updateLikeButton(isLiked);
      }
    }
    
    // Check if favorited
    const favResponse = await fetch(
      `https://vstad-api.cheatdev.online/api/interactions/user/favorite-videos?skip=0&limit=100`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    
    if (favResponse.ok) {
      const favData = await favResponse.json();
      const favVideos = favData.videos || [];
      const isFavorited = favVideos.some(v => v.id == videoId);
      
      console.log('User favorite status:', isFavorited);
      
      // Update global state if post-interactions.js is loaded
      if (window.interactionStates) {
        window.interactionStates.isFavorited = isFavorited;
      }
      if (window.updateFavoriteButton) {
        window.updateFavoriteButton(isFavorited);
      }
    }
    
    // Check if shared
    const sharedResponse = await fetch(
      `https://vstad-api.cheatdev.online/api/interactions/user/shared-videos?skip=0&limit=100`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    
    if (sharedResponse.ok) {
      const sharedData = await sharedResponse.json();
      const sharedVideos = sharedData.videos || [];
      const isShared = sharedVideos.some(v => v.id == videoId);
      
      // Update global state if post-interactions.js is loaded
      if (window.interactionStates) {
        window.interactionStates.isShared = isShared;
      }
      if (window.updateShareButton) {
        window.updateShareButton(isShared);
      }
    }
    
  } catch (error) {
    console.error('Error checking user interactions:', error);
  }
}

// Function to manually refresh all interactions
function refreshInteractions() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("id");
  if (videoId) {
    loadVideoInteractions(videoId);
    checkUserInteractions(videoId);
  }
}

// Function to start auto-refresh with animation
function startAutoRefresh(videoId, intervalSeconds = 10) {
  // Initial load
  loadVideoInteractions(videoId);
  
  // Set up periodic refresh
  const intervalId = setInterval(() => {
    loadVideoInteractions(videoId);
    checkUserInteractions(videoId);
  }, intervalSeconds * 1000);
  
  return intervalId; // Return so it can be cleared if needed
}

// Make functions available globally
window.loadVideoLikes = loadVideoLikes;
window.loadComments = loadComments;
window.loadVideoShares = loadVideoShares;
window.loadVideoInteractions = loadVideoInteractions;
window.checkUserInteractions = checkUserInteractions;
window.refreshInteractions = refreshInteractions;
window.startAutoRefresh = startAutoRefresh;

// Auto-load interactions when on video display page
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes('display')) {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("id");
    
    if (videoId) {
      // Load initial data
      loadVideoInteractions(videoId);
      checkUserInteractions(videoId);
      
      const refreshInterval = startAutoRefresh(videoId, 10);
      
      // Stop refresh when user leaves the page
      window.addEventListener('beforeunload', () => {
        if (refreshInterval) {
          clearInterval(refreshInterval);
        }
      });
    }
  }
});
