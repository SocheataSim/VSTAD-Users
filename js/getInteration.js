
// // Fetch video interaction stats from API
// async function loadVideoInteractions(videoId) {
//   try {
//     const response = await fetch(
//       `https://vstad-api.cheatdev.online/api/interactions/videos?videoId=${videoId}`
//     );
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     // Update HTML elements with fetched data
//     updateInteractionCounts({
//       likes: data.likes || 0,
//       comments: data.comments || 0,
//       shares: data.shares || 0,
//       favorites: data.favorites || 0
//     });
    
//     console.log('Video interactions loaded:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching video interactions:', error);
//   }
// }

// // Fetch and display comments for a video
// async function loadComments(videoId) {
//   try {
//     const response = await fetch(
//       `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/comments`
//     );
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const comments = await response.json();
//     // API returns array directly, not wrapped in an object
//     displayComments(Array.isArray(comments) ? comments : []);
    
//     console.log('Comments loaded:', comments);
//     return comments;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     const commentsList = document.getElementById('commentsList');
//     if (commentsList) {
//       commentsList.innerHTML = '<p class="text-gray-500 dark:text-gray-400">Failed to load comments.</p>';
//     }
//   }
// }

// // Display comments in the comments section
// function displayComments(comments) {
//   const commentsList = document.getElementById('commentsList');
  
//   if (!commentsList) return;
  
//   if (comments.length === 0) {
//     commentsList.innerHTML = '<p class="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>';
//     return;
//   }
  
//   commentsList.innerHTML = '';
  
//   comments.forEach(comment => {
//     const profileImg = comment.user.profile_image 
//       ? comment.user.profile_image 
//       : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";
    
//     const timeAgo = timeSince(new Date(comment.created_at));
//     const displayName = comment.user.full_name || comment.user.username;
    
//     const commentHTML = `
//       <div class="flex space-x-3 mb-4">
//         <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
//           <img src="${profileImg}" alt="${displayName}" class="w-full h-full object-cover">
//         </div>
//         <div class="flex-1">
//           <div class="flex items-center space-x-2">
//             <span class="font-semibold text-gray-900 dark:text-white">${displayName}</span>
//             <span class="text-xs text-gray-500 dark:text-gray-400">${timeAgo}</span>
//           </div>
//           <p class="text-gray-700 dark:text-gray-300 mt-1">${comment.content}</p>
//         </div>
//       </div>
//     `;
    
//     commentsList.innerHTML += commentHTML;
//   });
// }

// // Helper function to format time
// function timeSince(date) {
//   const seconds = Math.floor((new Date() - date) / 1000);
//   const intervals = {
//     year: 31536000,
//     month: 2592000,
//     week: 604800,
//     day: 86400,
//     hour: 3600,
//     minute: 60
//   };

//   for (const [unit, value] of Object.entries(intervals)) {
//     const result = Math.floor(seconds / value);
//     if (result >= 1) return `${result} ${unit}${result > 1 ? 's' : ''} ago`;
//   }

//   return "Just now";
// }

// // Update the HTML elements with interaction counts
// function updateInteractionCounts(stats) {
//   const likeCount = document.getElementById('likeCount');
//   const commentCount = document.getElementById('commentCount');
//   const favoriteCount = document.getElementById('favoriteCount');
//   const shareBtn = document.getElementById('shareBtn');
  
//   if (likeCount) {
//     likeCount.textContent = stats.likes;
//   }
  
//   if (commentCount) {
//     commentCount.textContent = stats.comments;
//   }
  
//   if (favoriteCount) {
//     favoriteCount.textContent = stats.favorites;
//   }
  
//   // Update share count (if it doesn't have an ID)
//   if (shareBtn) {
//     const shareSpan = shareBtn.querySelector('span');
//     if (shareSpan) {
//       shareSpan.textContent = stats.shares;
//     }
//   }
// }

// // Auto-load interactions and comments when on video display page
// document.addEventListener("DOMContentLoaded", () => {
//   // Only run on display.html page (where individual video is shown)
//   if (window.location.pathname.includes('display.html')) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const videoId = urlParams.get("id");
    
//     if (videoId) {
//       loadVideoInteractions(videoId);
//       loadComments(videoId);
//     }
//   }
// });

// // Optional: Refresh interactions periodically (every 30 seconds)
// function startAutoRefresh(videoId, intervalSeconds = 30) {
//   loadVideoInteractions(videoId);
//   loadComments(videoId);
  
//   return setInterval(() => {
//     loadVideoInteractions(videoId);
//     loadComments(videoId);
//   }, intervalSeconds * 1000);
// }

// // Optional: Manual refresh function
// function refreshInteractions() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const videoId = urlParams.get("id");
  
//   if (videoId) {
//     loadVideoInteractions(videoId);
//     loadComments(videoId);
//   }
// }

// Fetch video interaction stats from API
// async function loadVideoInteractions(videoId) {
//   try {
//     const response = await fetch(
//       `https://vstad-api.cheatdev.online/api/interactions/videos?videoId=${videoId}`
//     );
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     // Update HTML elements with fetched data
//     updateInteractionCounts({
//       likes: data.likes || 0,
//       comments: data.comments || 0,
//       shares: data.shares || 0,
//       favorites: data.favorites || 0
//     });
    
//     console.log('Video interactions loaded:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching video interactions:', error);
//   }
// }

// // Fetch and display comments for a video
// async function loadComments(videoId) {
//   try {
//     const response = await fetch(
//       `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/comments`
//     );
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const comments = await response.json();
//     // API returns array directly, not wrapped in an object
//     displayComments(Array.isArray(comments) ? comments : []);
    
//     // Update comment count based on actual number of comments
//     const commentCount = document.getElementById('commentCount');
//     if (commentCount && Array.isArray(comments)) {
//       commentCount.textContent = comments.length;
//     }
    
//     console.log('Comments loaded:', comments);
//     return comments;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     const commentsList = document.getElementById('commentsList');
//     if (commentsList) {
//       commentsList.innerHTML = '<p class="text-gray-500 dark:text-gray-400">Failed to load comments.</p>';
//     }
//   }
// }

// // Display comments in the comments section
// function displayComments(comments) {
//   const commentsList = document.getElementById('commentsList');
  
//   if (!commentsList) return;
  
//   if (comments.length === 0) {
//     commentsList.innerHTML = '<p class="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>';
//     return;
//   }
  
//   commentsList.innerHTML = '';
  
//   comments.forEach(comment => {
//     const profileImg = comment.user.profile_image 
//       ? comment.user.profile_image 
//       : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";
    
//     const timeAgo = timeSince(new Date(comment.created_at));
//     const displayName = comment.user.full_name || comment.user.username;
    
//     const commentHTML = `
//       <div class="flex space-x-3 mb-4">
//         <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
//           <img src="${profileImg}" alt="${displayName}" class="w-full h-full object-cover">
//         </div>
//         <div class="flex-1">
//           <div class="flex items-center space-x-2">
//             <span class="font-semibold text-gray-900 dark:text-white">${displayName}</span>
//             <span class="text-xs text-gray-500 dark:text-gray-400">${timeAgo}</span>
//           </div>
//           <p class="text-gray-700 dark:text-gray-300 mt-1">${comment.content}</p>
//         </div>
//       </div>
//     `;
    
//     commentsList.innerHTML += commentHTML;
//   });
// }

// // Helper function to format time
// function timeSince(date) {
//   const seconds = Math.floor((new Date() - date) / 1000);
//   const intervals = {
//     year: 31536000,
//     month: 2592000,
//     week: 604800,
//     day: 86400,
//     hour: 3600,
//     minute: 60
//   };

//   for (const [unit, value] of Object.entries(intervals)) {
//     const result = Math.floor(seconds / value);
//     if (result >= 1) return `${result} ${unit}${result > 1 ? 's' : ''} ago`;
//   }

//   return "Just now";
// }

// // Update the HTML elements with interaction counts
// function updateInteractionCounts(stats) {
//   const likeCount = document.getElementById('likeCount');
//   const commentCount = document.getElementById('commentCount');
//   const favoriteCount = document.getElementById('favoriteCount');
//   const shareBtn = document.getElementById('shareBtn');
  
//   if (likeCount) {
//     likeCount.textContent = stats.likes;
//   }
  
//   if (commentCount) {
//     commentCount.textContent = stats.comments;
//   }
  
//   if (favoriteCount) {
//     favoriteCount.textContent = stats.favorites;
//   }
  
//   // Update share count (if it doesn't have an ID)
//   if (shareBtn) {
//     const shareSpan = shareBtn.querySelector('span');
//     if (shareSpan) {
//       shareSpan.textContent = stats.shares;
//     }
//   }
// }

// // Auto-load interactions and comments when on video display page
// document.addEventListener("DOMContentLoaded", () => {
//   // Only run on display.html page (where individual video is shown)
//   if (window.location.pathname.includes('display.html')) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const videoId = urlParams.get("id");
    
//     if (videoId) {
//       loadVideoInteractions(videoId);
//       loadComments(videoId);
//     }
//   }
// });

// // Optional: Refresh interactions periodically (every 30 seconds)
// function startAutoRefresh(videoId, intervalSeconds = 30) {
//   loadVideoInteractions(videoId);
//   loadComments(videoId);
  
//   return setInterval(() => {
//     loadVideoInteractions(videoId);
//     loadComments(videoId);
//   }, intervalSeconds * 1000);
// }

// // Optional: Manual refresh function
// function refreshInteractions() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const videoId = urlParams.get("id");
  
//   if (videoId) {
//     loadVideoInteractions(videoId);
//     loadComments(videoId);
//   }
// }

// get-interactions.js
// Handles fetching/reading video interaction data (GET requests only)

// Fetch video interaction stats from API
async function loadVideoInteractions(videoId) {
  try {
    const response = await fetch(
      `https://vstad-api.cheatdev.online/api/interactions/videos?videoId=${videoId}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Update HTML elements with fetched data
    updateInteractionCounts({
      likes: data.likes || 0,
      comments: data.comments || 0,
      shares: data.shares || 0,
      favorites: data.favorites || 0
    });
    
    console.log('Video interactions loaded:', data);
    return data;
  } catch (error) {
    console.error('Error fetching video interactions:', error);
  }
}

// Fetch and display comments for a video
async function loadComments(videoId) {
  try {
    const response = await fetch(
      `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/comments`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const comments = await response.json();
    // API returns array directly, not wrapped in an object
    displayComments(Array.isArray(comments) ? comments : []);
    
    // Update comment count based on actual number of comments
    const commentCount = document.getElementById('commentCount');
    if (commentCount && Array.isArray(comments)) {
      commentCount.textContent = comments.length;
    }
    
    console.log('Comments loaded:', comments);
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    const commentsList = document.getElementById('commentsList');
    if (commentsList) {
      commentsList.innerHTML = '<p class="text-gray-500 dark:text-gray-400">Failed to load comments.</p>';
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
  const currentUserId = AUTH.getUserId();
  
  comments.forEach(comment => {
    const profileImg = comment.user.profile_image 
      ? comment.user.profile_image 
      : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";
    
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

// Helper function to format time
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

// Update the HTML elements with interaction counts
function updateInteractionCounts(stats) {
  const likeCount = document.getElementById('likeCount');
  const commentCount = document.getElementById('commentCount');
  const favoriteCount = document.getElementById('favoriteCount');
  const shareBtn = document.getElementById('shareBtn');
  
  if (likeCount) {
    likeCount.textContent = stats.likes;
  }
  
  if (commentCount) {
    commentCount.textContent = stats.comments;
  }
  
  if (favoriteCount) {
    favoriteCount.textContent = stats.favorites;
  }
  
  // Update share count (if it doesn't have an ID)
  if (shareBtn) {
    const shareSpan = shareBtn.querySelector('span');
    if (shareSpan) {
      shareSpan.textContent = stats.shares;
    }
  }
}

// Check if user has already liked/favorited this video
async function checkUserInteractions(videoId) {
  if (!AUTH.isLoggedIn()) return;

  try {
    const token = AUTH.getToken();
    
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
      
      // Update global state if post-interactions.js is loaded
      if (window.interactionStates) {
        window.interactionStates.isFavorited = isFavorited;
      }
      if (window.updateFavoriteButton) {
        window.updateFavoriteButton(isFavorited);
      }
    }
    
  } catch (error) {
    console.error('Error checking user interactions:', error);
  }
}

// Auto-load interactions and comments when on video display page
document.addEventListener("DOMContentLoaded", () => {
  // Only run on display.html page (where individual video is shown)
  if (window.location.pathname.includes('display.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("id");
    
    if (videoId) {
      loadVideoInteractions(videoId);
      loadComments(videoId);
      checkUserInteractions(videoId);
    }
  }
});

// Optional: Refresh interactions periodically (every 30 seconds)
function startAutoRefresh(videoId, intervalSeconds = 30) {
  loadVideoInteractions(videoId);
  loadComments(videoId);
  
  return setInterval(() => {
    loadVideoInteractions(videoId);
    loadComments(videoId);
  }, intervalSeconds * 1000);
}

// Optional: Manual refresh function
function refreshInteractions() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("id");
  
  if (videoId) {
    loadVideoInteractions(videoId);
    loadComments(videoId);
  }
}

// Make functions available globally
window.loadComments = loadComments;
window.loadVideoInteractions = loadVideoInteractions;