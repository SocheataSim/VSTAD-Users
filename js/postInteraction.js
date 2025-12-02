// // POST: Like a video (FIXED - handles already liked)
// async function likeVideo(videoId) {
//   console.log('Like button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) {
//     console.warn('User not logged in');
//     alert('Please sign in to like videos');
//     window.location.href = 'sign_in.html';
//     return;
//   }

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/like`;

//     console.log('Sending POST request to:', url);

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('Response status:', response.status);

//     // If already liked (typically status 400 or 409), unlike instead
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.log('Like POST failed, checking if already liked:', errorText);
      
//       // If it's an "already liked" error, unlike instead
//       if (response.status === 400 || response.status === 409 || errorText.toLowerCase().includes('already')) {
//         console.log('Video already liked, unliking instead...');
//         await unlikeVideo(videoId);
//         return;
//       }
      
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log('✅ Video liked successfully:', data);

//     // Update UI state
//     window.interactionStates.isLiked = true;
//     updateLikeButton(true);

//     // Refresh to get accurate count
//     if (window.refreshInteractions) {
//       window.refreshInteractions();
//     }

//     return data;
//   } catch (error) {
//     logError('Like video', error);
//     alert('Failed to like video. Please try again.');
//   }
// }

// // DELETE: Unlike a video (UNDO LIKE)
// async function unlikeVideo(videoId) {
//   console.log('Unlike button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) return;

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/like`;

//     const response = await fetch(url, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     window.interactionStates.isLiked = false;
//     updateLikeButton(false);

//     // Refresh to get accurate count
//     if (window.refreshInteractions) {
//       window.refreshInteractions();
//     }
//   } catch (error) {
//     logError('Unlike video', error);
//     alert('Failed to unlike video. Please try again.');
//   }
// }

// // POST: Share a video
// async function shareVideo(videoId) {
//   console.log('Share button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) {
//     alert('Please sign in to share videos');
//     window.location.href = 'sign_in.html';
//     return;
//   }

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/share`;

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();

//     window.interactionStates.isShared = true;
//     updateShareButton(true);

//     // Refresh to get accurate count
//     if (window.refreshInteractions) {
//       window.refreshInteractions();
//     }

//     // Show success message
//     const successMsg = document.createElement('div');
//     successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
//     successMsg.textContent = '✓ Video shared!';
//     document.body.appendChild(successMsg);
//     setTimeout(() => successMsg.remove(), 2000);

//     return data;
//   } catch (error) {
//     logError('Share video', error);
//     alert('Failed to share video. Please try again.');
//   }
// }

// // DELETE: Unshare a video (UNDO SHARE)
// async function unshareVideo(videoId) {
//   console.log('Unshare button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) return;

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/share`;

//     const response = await fetch(url, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     window.interactionStates.isShared = false;
//     updateShareButton(false);

//     // Refresh to get accurate count
//     if (window.refreshInteractions) {
//       window.refreshInteractions();
//     }

//   } catch (error) {
//     logError('Unshare video', error);
//     alert('Failed to unshare video. Please try again.');
//   }
// }

// // POST: Add to favorites (FIXED - handles already favorited, NO COUNT UPDATE)
// async function favoriteVideo(videoId) {
//   console.log('Favorite button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) {
//     alert('Please sign in to favorite videos');
//     window.location.href = 'sign_in.html';
//     return;
//   }

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/favorite`;

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     // If already favorited (typically status 400 or 409), unfavorite instead
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.log('Favorite POST failed, checking if already favorited:', errorText);
      
//       // If it's an "already favorited" error, unfavorite instead
//       if (response.status === 400 || response.status === 409 || errorText.toLowerCase().includes('already')) {
//         console.log('Video already favorited, unfavoriting instead...');
//         await unfavoriteVideo(videoId);
//         return;
//       }
      
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log('✅ Video favorited successfully:', data);

//     window.interactionStates.isFavorited = true;
//     updateFavoriteButton(true);

//     return data;
//   } catch (error) {
//     logError('Favorite video', error);
//     alert('Failed to favorite video. Please try again.');
//   }
// }

// // DELETE: Remove from favorites (UNDO FAVORITE, NO COUNT UPDATE)
// async function unfavoriteVideo(videoId) {
//   console.log('Unfavorite button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) return;

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/favorite`;

//     console.log('Sending DELETE request to:', url);

//     const response = await fetch(url, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('Response status:', response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ Error response body:', errorText);
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     console.log('✅ Video unfavorited successfully');

//     // Update UI state
//     window.interactionStates.isFavorited = false;
//     updateFavoriteButton(false);

//   } catch (error) {
//     logError('Unfavorite video', error);
//     alert('Failed to unfavorite video. Please try again.');
//   }
// }

// // POST: Add a comment
// async function postComment(videoId, content) {
//   console.log('Post comment button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) {
//     console.warn('User not logged in');
//     alert('Please sign in to comment');
//     window.location.href = 'sign_in.html';
//     return;
//   }

//   if (!content || content.trim() === '') {
//     console.warn('Comment is empty');
//     alert('Please enter a comment');
//     return;
//   }

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/comments`;

//     console.log('Sending POST request to:', url);
//     console.log('Comment content:', content.trim());

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         content: content.trim()
//       })
//     });

//     console.log('Response status:', response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ Error response body:', errorText);
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log('✅ Comment posted successfully:', data);

//     // Clear input
//     const commentInput = document.getElementById('commentInput');
//     if (commentInput) {
//       commentInput.value = '';
//     }

//     // Reload comments and interactions to show the new one
//     if (window.refreshInteractions) {
//       window.refreshInteractions();
//     }

//     // Show success message briefly
//     const successMsg = document.createElement('div');
//     successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
//     successMsg.textContent = '✓ Comment posted!';
//     document.body.appendChild(successMsg);
//     setTimeout(() => successMsg.remove(), 2000);

//     return data;
//   } catch (error) {
//     logError('Post comment', error);
//     alert('Failed to post comment. Please try again.');
//   }
// }

// // DELETE: Delete a comment (UNDO COMMENT)
// async function deleteComment(commentId, videoId) {
//   console.log('Delete comment button clicked. Comment ID:', commentId);

//   if (!AUTH.isLoggedIn()) return;

//   if (!confirm('Are you sure you want to delete this comment?')) {
//     console.log('User cancelled delete');
//     return;
//   }

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/comments/${commentId}`;

//     console.log('Sending DELETE request to:', url);

//     const response = await fetch(url, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('Response status:', response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ Error response body:', errorText);
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     console.log('✅ Comment deleted successfully');

//     // Reload comments and interactions to remove the deleted one
//     if (window.refreshInteractions) {
//       window.refreshInteractions();
//     }

//     // Show success message
//     const successMsg = document.createElement('div');
//     successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
//     successMsg.textContent = '✓ Comment deleted!';
//     document.body.appendChild(successMsg);
//     setTimeout(() => successMsg.remove(), 2000);

//   } catch (error) {
//     logError('Delete comment', error);
//     alert('Failed to delete comment. Please try again.');
//   }
// }

// // Helper function for logging errors
// function logError(action, error) {
//   console.error(`❌ Error in ${action}:`, error);
// }

// // Update like button appearance
// function updateLikeButton(isLiked) {
//   const likeBtn = document.getElementById('likeBtn');
//   if (!likeBtn) return;

//   if (isLiked) {
//     likeBtn.classList.add('bg-red-100', 'dark:bg-red-900');
//     likeBtn.classList.remove('bg-gray-100', 'dark:bg-gray-700');
//     const svg = likeBtn.querySelector('svg');
//     if (svg) {
//       svg.classList.add('text-red-500');
//       svg.classList.remove('text-gray-700', 'dark:text-gray-300');
//       svg.setAttribute('fill', 'currentColor');
//     }
//   } else {
//     likeBtn.classList.remove('bg-red-100', 'dark:bg-red-900');
//     likeBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
//     const svg = likeBtn.querySelector('svg');
//     if (svg) {
//       svg.classList.remove('text-red-500');
//       svg.classList.add('text-gray-700', 'dark:text-gray-300');
//       svg.setAttribute('fill', 'none');
//     }
//   }
// }

// // Update favorite button appearance (FIXED - shows yellow when favorited)
// function updateFavoriteButton(isFavorited) {
//   const favoriteBtn = document.getElementById('favoriteBtn');
//   if (!favoriteBtn) return;

//   if (isFavorited) {
//     favoriteBtn.classList.add('bg-yellow-100', 'dark:bg-yellow-900');
//     favoriteBtn.classList.remove('bg-gray-100', 'dark:bg-gray-700');
//     const svg = favoriteBtn.querySelector('svg');
//     if (svg) {
//       svg.classList.add('text-yellow-500');
//       svg.classList.remove('text-gray-700', 'dark:text-gray-300');
//       svg.setAttribute('fill', 'currentColor');
//     }
//   } else {
//     favoriteBtn.classList.remove('bg-yellow-100', 'dark:bg-yellow-900');
//     favoriteBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
//     const svg = favoriteBtn.querySelector('svg');
//     if (svg) {
//       svg.classList.remove('text-yellow-500');
//       svg.classList.add('text-gray-700', 'dark:text-gray-300');
//       svg.setAttribute('fill', 'none');
//     }
//   }
// }

// // Update share button appearance
// function updateShareButton(isShared) {
//   const shareBtn = document.getElementById('shareBtn');
//   if (!shareBtn) return;

//   if (isShared) {
//     shareBtn.classList.add('bg-green-100', 'dark:bg-green-900');
//     shareBtn.classList.remove('bg-gray-100', 'dark:bg-gray-700');
//     const svg = shareBtn.querySelector('svg');
//     if (svg) {
//       svg.classList.add('text-green-500');
//       svg.classList.remove('text-gray-700', 'dark:text-gray-300');
//     }
//   } else {
//     shareBtn.classList.remove('bg-green-100', 'dark:bg-green-900');
//     shareBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
//     const svg = shareBtn.querySelector('svg');
//     if (svg) {
//       svg.classList.remove('text-green-500');
//       svg.classList.add('text-gray-700', 'dark:text-gray-300');
//     }
//   }
// }

// // Setup function to initialize all interaction handlers
// function setupInteractionHandlers(videoId) {
//   console.log('🔧 Setting up interaction handlers for video:', videoId);

//   // Initialize interaction states
//   if (!window.interactionStates) {
//     window.interactionStates = {
//       isLiked: false,
//       isShared: false,
//       isFavorited: false
//     };
//   }

//   // Like button - toggles between like/unlike
//   const likeBtn = document.getElementById('likeBtn');
//   if (likeBtn) {
//     console.log('✅ Like button found');
//     likeBtn.addEventListener('click', () => {
//       if (window.interactionStates.isLiked) {
//         unlikeVideo(videoId);
//       } else {
//         likeVideo(videoId);
//       }
//     });
//   } else {
//     console.warn('Like button NOT found');
//   }

//   // Share button - toggles between share/unshare
//   const shareBtn = document.getElementById('shareBtn');
//   if (shareBtn) {
//     console.log('✅ Share button found');
//     shareBtn.addEventListener('click', () => {
//       if (window.interactionStates.isShared) {
//         unshareVideo(videoId);
//       } else {
//         shareVideo(videoId);
//       }
//     });
//   } else {
//     console.warn('Share button NOT found');
//   }

//   // Favorite button - toggles between favorite/unfavorite (FIXED)
//   const favoriteBtn = document.getElementById('favoriteBtn');
//   if (favoriteBtn) {
//     console.log('✅ Favorite button found');
//     favoriteBtn.addEventListener('click', () => {
//       if (window.interactionStates.isFavorited) {
//         unfavoriteVideo(videoId);
//       } else {
//         favoriteVideo(videoId);
//       }
//     });
//   } else {
//     console.warn('Favorite button NOT found');
//   }

//   // Comment button - posts new comment
//   const postCommentBtn = document.getElementById('postCommentBtn');
//   if (postCommentBtn) {
//     console.log('✅ Post comment button found');
//     postCommentBtn.addEventListener('click', () => {
//       const commentInput = document.getElementById('commentInput');
//       if (commentInput) {
//         postComment(videoId, commentInput.value);
//       }
//     });
//   } else {
//     console.warn('Post comment button NOT found');
//   }

//   // Allow Enter key to post comment (Shift+Enter for new line)
//   const commentInput = document.getElementById('commentInput');
//   if (commentInput) {
//     console.log('✅ Comment input found');
//     commentInput.addEventListener('keypress', (e) => {
//       if (e.key === 'Enter' && !e.shiftKey) {
//         e.preventDefault();
//         postComment(videoId, commentInput.value);
//       }
//     });
//   } else {
//     console.warn('Comment input NOT found');
//   }
// }

// // Initialize on page load
// document.addEventListener("DOMContentLoaded", () => {
//   console.log('post-interactions.js loaded');
//   console.log('Current page:', window.location.pathname);

//   if (window.location.pathname.includes('display')) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const videoId = urlParams.get("id");

//     console.log('Video ID from URL:', videoId);
//     console.log('User logged in:', AUTH.isLoggedIn());
//     console.log('Token exists:', AUTH.getToken() ? 'YES' : 'NO');

//     if (videoId) {
//       setupInteractionHandlers(videoId);
//     } else {
//       console.error('No video ID found in URL');
//     }
//   }
// });

// // Make functions available globally
// window.likeVideo = likeVideo;
// window.unlikeVideo = unlikeVideo;
// window.shareVideo = shareVideo;
// window.unshareVideo = unshareVideo;
// window.favoriteVideo = favoriteVideo;
// window.unfavoriteVideo = unfavoriteVideo;
// window.postComment = postComment;
// window.deleteComment = deleteComment;
// window.updateLikeButton = updateLikeButton;
// window.updateFavoriteButton = updateFavoriteButton;
// window.updateShareButton = updateShareButton;
// window.setupInteractionHandlers = setupInteractionHandlers;

// Helper function to show toast messages
function showToast(message, type = 'success') {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  };
  
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Helper function to show confirmation dialog
function showConfirmDialog(message, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  
  const dialog = document.createElement('div');
  dialog.className = 'bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 shadow-xl';
  dialog.innerHTML = `
    <p class="text-gray-800 dark:text-gray-200 mb-4">${message}</p>
    <div class="flex gap-3 justify-end">
      <button id="cancelBtn" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
        Cancel
      </button>
      <button id="confirmBtn" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Sign In
      </button>
    </div>
  `;
  
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  
  dialog.querySelector('#confirmBtn').addEventListener('click', () => {
    overlay.remove();
    onConfirm();
  });
  
  dialog.querySelector('#cancelBtn').addEventListener('click', () => {
    overlay.remove();
  });
}

// POST: Like a video (FIXED - handles already liked)
async function likeVideo(videoId) {
  console.log('Like button clicked for video:', videoId);

  if (!AUTH.isLoggedIn()) {
    console.warn('User not logged in');
    showConfirmDialog('Please sign in to like videos', () => {
      window.location.href = 'sign_in.html';
    });
    return;
  }

  try {
    const token = AUTH.getToken();
    const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/like`;

    console.log('Sending POST request to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);

    // If already liked (typically status 400 or 409), unlike instead
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Like POST failed, checking if already liked:', errorText);
      
      // If it's an "already liked" error, unlike instead
      if (response.status === 400 || response.status === 409 || errorText.toLowerCase().includes('already')) {
        console.log('Video already liked, unliking instead...');
        await unlikeVideo(videoId);
        return;
      }
      
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Video liked successfully:', data);

    // Update UI state
    window.interactionStates.isLiked = true;
    updateLikeButton(true);
    showToast('❤️ Video liked!', 'success');

    // Refresh to get accurate count
    if (window.refreshInteractions) {
      window.refreshInteractions();
    }

    return data;
  } catch (error) {
    logError('Like video', error);
    showToast('Failed to like video. Please try again.', 'error');
  }
}

// DELETE: Unlike a video (UNDO LIKE)
async function unlikeVideo(videoId) {
  console.log('Unlike button clicked for video:', videoId);

  if (!AUTH.isLoggedIn()) return;

  try {
    const token = AUTH.getToken();
    const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/like`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    window.interactionStates.isLiked = false;
    updateLikeButton(false);
    showToast('Like removed', 'info');

    // Refresh to get accurate count
    if (window.refreshInteractions) {
      window.refreshInteractions();
    }
  } catch (error) {
    logError('Unlike video', error);
    showToast('Failed to unlike video. Please try again.', 'error');
  }
}

// POST: Share a video
async function shareVideo(videoId) {
  console.log('Share button clicked for video:', videoId);

  if (!AUTH.isLoggedIn()) {
    showConfirmDialog('Please sign in to share videos', () => {
      window.location.href = 'sign_in.html';
    });
    return;
  }

  try {
    const token = AUTH.getToken();
    const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/share`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    window.interactionStates.isShared = true;
    updateShareButton(true);
    showToast('📤 Video shared!', 'success');

    // Refresh to get accurate count
    if (window.refreshInteractions) {
      window.refreshInteractions();
    }

    return data;
  } catch (error) {
    logError('Share video', error);
    showToast('Failed to share video. Please try again.', 'error');
  }
}

// DELETE: Unshare a video (UNDO SHARE)
async function unshareVideo(videoId) {
  console.log('Unshare button clicked for video:', videoId);

  if (!AUTH.isLoggedIn()) return;

  try {
    const token = AUTH.getToken();
    const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/share`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    window.interactionStates.isShared = false;
    updateShareButton(false);
    showToast('Share removed', 'info');

    // Refresh to get accurate count
    if (window.refreshInteractions) {
      window.refreshInteractions();
    }

  } catch (error) {
    logError('Unshare video', error);
    showToast('Failed to unshare video. Please try again.', 'error');
  }
}

// POST: Add to favorites (FIXED - handles already favorited, NO COUNT UPDATE)
async function favoriteVideo(videoId) {
  console.log('Favorite button clicked for video:', videoId);

  if (!AUTH.isLoggedIn()) {
    showConfirmDialog('Please sign in to favorite videos', () => {
      window.location.href = 'sign_in.html';
    });
    return;
  }

  try {
    const token = AUTH.getToken();
    const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/favorite`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // If already favorited (typically status 400 or 409), unfavorite instead
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Favorite POST failed, checking if already favorited:', errorText);
      
      // If it's an "already favorited" error, unfavorite instead
      if (response.status === 400 || response.status === 409 || errorText.toLowerCase().includes('already')) {
        console.log('Video already favorited, unfavoriting instead...');
        await unfavoriteVideo(videoId);
        return;
      }
      
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Video favorited successfully:', data);

    window.interactionStates.isFavorited = true;
    updateFavoriteButton(true);
    showToast('⭐ Added to favorites!', 'success');

    return data;
  } catch (error) {
    logError('Favorite video', error);
    showToast('Failed to favorite video. Please try again.', 'error');
  }
}

// DELETE: Remove from favorites (UNDO FAVORITE, NO COUNT UPDATE)
async function unfavoriteVideo(videoId) {
  console.log('Unfavorite button clicked for video:', videoId);

  if (!AUTH.isLoggedIn()) return;

  try {
    const token = AUTH.getToken();
    const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/favorite`;

    console.log('Sending DELETE request to:', url);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response body:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    console.log('✅ Video unfavorited successfully');

    // Update UI state
    window.interactionStates.isFavorited = false;
    updateFavoriteButton(false);
    showToast('Removed from favorites', 'info');

  } catch (error) {
    logError('Unfavorite video', error);
    showToast('Failed to unfavorite video. Please try again.', 'error');
  }
}

// POST: Add a comment
async function postComment(videoId, content) {
  console.log('Post comment button clicked for video:', videoId);

  if (!AUTH.isLoggedIn()) {
    console.warn('User not logged in');
    showConfirmDialog('Please sign in to comment', () => {
      window.location.href = '/pages/sign_in.html';
    });
    return;
  }

  if (!content || content.trim() === '') {
    console.warn('Comment is empty');
    showToast('Please enter a comment', 'warning');
    return;
  }

  try {
    const token = AUTH.getToken();
    const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/comments`;

    console.log('Sending POST request to:', url);
    console.log('Comment content:', content.trim());

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: content.trim()
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response body:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Comment posted successfully:', data);

    // Clear input
    const commentInput = document.getElementById('commentInput');
    if (commentInput) {
      commentInput.value = '';
    }

    // Reload comments and interactions to show the new one
    if (window.refreshInteractions) {
      window.refreshInteractions();
    }

    showToast('💬 Comment posted!', 'success');

    return data;
  } catch (error) {
    logError('Post comment', error);
    showToast('Failed to post comment. Please try again.', 'error');
  }
}

// DELETE: Delete a comment (UNDO COMMENT)
async function deleteComment(commentId, videoId) {
  console.log('Delete comment button clicked. Comment ID:', commentId);

  if (!AUTH.isLoggedIn()) return;

  // Custom confirmation dialog
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  
  const dialog = document.createElement('div');
  dialog.className = 'bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 shadow-xl';
  dialog.innerHTML = `
    <p class="text-gray-800 dark:text-gray-200 mb-4">Are you sure you want to delete this comment?</p>
    <div class="flex gap-3 justify-end">
      <button id="cancelDeleteBtn" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
        Cancel
      </button>
      <button id="confirmDeleteBtn" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Delete
      </button>
    </div>
  `;
  
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  
  dialog.querySelector('#confirmDeleteBtn').addEventListener('click', async () => {
    overlay.remove();
    
    try {
      const token = AUTH.getToken();
      const url = `https://vstad-api.cheatdev.online/api/interactions/comments/${commentId}`;

      console.log('Sending DELETE request to:', url);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response body:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      console.log('✅ Comment deleted successfully');

      // Reload comments and interactions to remove the deleted one
      if (window.refreshInteractions) {
        window.refreshInteractions();
      }

      showToast('🗑️ Comment deleted!', 'success');

    } catch (error) {
      logError('Delete comment', error);
      showToast('Failed to delete comment. Please try again.', 'error');
    }
  });
  
  dialog.querySelector('#cancelDeleteBtn').addEventListener('click', () => {
    overlay.remove();
    console.log('User cancelled delete');
  });
}

// Helper function for logging errors
function logError(action, error) {
  console.error(`❌ Error in ${action}:`, error);
}

// Update like button appearance
function updateLikeButton(isLiked) {
  const likeBtn = document.getElementById('likeBtn');
  if (!likeBtn) return;

  if (isLiked) {
    likeBtn.classList.add('bg-red-100', 'dark:bg-red-900');
    likeBtn.classList.remove('bg-gray-100', 'dark:bg-gray-700');
    const svg = likeBtn.querySelector('svg');
    if (svg) {
      svg.classList.add('text-red-500');
      svg.classList.remove('text-gray-700', 'dark:text-gray-300');
      svg.setAttribute('fill', 'currentColor');
    }
  } else {
    likeBtn.classList.remove('bg-red-100', 'dark:bg-red-900');
    likeBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
    const svg = likeBtn.querySelector('svg');
    if (svg) {
      svg.classList.remove('text-red-500');
      svg.classList.add('text-gray-700', 'dark:text-gray-300');
      svg.setAttribute('fill', 'none');
    }
  }
}

// Update favorite button appearance (FIXED - shows yellow when favorited)
function updateFavoriteButton(isFavorited) {
  const favoriteBtn = document.getElementById('favoriteBtn');
  if (!favoriteBtn) return;

  if (isFavorited) {
    favoriteBtn.classList.add('bg-yellow-100', 'dark:bg-yellow-900');
    favoriteBtn.classList.remove('bg-gray-100', 'dark:bg-gray-700');
    const svg = favoriteBtn.querySelector('svg');
    if (svg) {
      svg.classList.add('text-yellow-500');
      svg.classList.remove('text-gray-700', 'dark:text-gray-300');
      svg.setAttribute('fill', 'currentColor');
    }
  } else {
    favoriteBtn.classList.remove('bg-yellow-100', 'dark:bg-yellow-900');
    favoriteBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
    const svg = favoriteBtn.querySelector('svg');
    if (svg) {
      svg.classList.remove('text-yellow-500');
      svg.classList.add('text-gray-700', 'dark:text-gray-300');
      svg.setAttribute('fill', 'none');
    }
  }
}

// Update share button appearance
function updateShareButton(isShared) {
  const shareBtn = document.getElementById('shareBtn');
  if (!shareBtn) return;

  if (isShared) {
    shareBtn.classList.add('bg-green-100', 'dark:bg-green-900');
    shareBtn.classList.remove('bg-gray-100', 'dark:bg-gray-700');
    const svg = shareBtn.querySelector('svg');
    if (svg) {
      svg.classList.add('text-green-500');
      svg.classList.remove('text-gray-700', 'dark:text-gray-300');
    }
  } else {
    shareBtn.classList.remove('bg-green-100', 'dark:bg-green-900');
    shareBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
    const svg = shareBtn.querySelector('svg');
    if (svg) {
      svg.classList.remove('text-green-500');
      svg.classList.add('text-gray-700', 'dark:text-gray-300');
    }
  }
}

// Setup function to initialize all interaction handlers
function setupInteractionHandlers(videoId) {
  console.log('🔧 Setting up interaction handlers for video:', videoId);

  // Initialize interaction states
  if (!window.interactionStates) {
    window.interactionStates = {
      isLiked: false,
      isShared: false,
      isFavorited: false
    };
  }

  // Like button - toggles between like/unlike
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn) {
    console.log('✅ Like button found');
    likeBtn.addEventListener('click', () => {
      if (window.interactionStates.isLiked) {
        unlikeVideo(videoId);
      } else {
        likeVideo(videoId);
      }
    });
  } else {
    console.warn('Like button NOT found');
  }

  // Share button - toggles between share/unshare
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    console.log('✅ Share button found');
    shareBtn.addEventListener('click', () => {
      if (window.interactionStates.isShared) {
        unshareVideo(videoId);
      } else {
        shareVideo(videoId);
      }
    });
  } else {
    console.warn('Share button NOT found');
  }

  // Favorite button - toggles between favorite/unfavorite (FIXED)
  const favoriteBtn = document.getElementById('favoriteBtn');
  if (favoriteBtn) {
    console.log('✅ Favorite button found');
    favoriteBtn.addEventListener('click', () => {
      if (window.interactionStates.isFavorited) {
        unfavoriteVideo(videoId);
      } else {
        favoriteVideo(videoId);
      }
    });
  } else {
    console.warn('Favorite button NOT found');
  }

  // Comment button - posts new comment
  const postCommentBtn = document.getElementById('postCommentBtn');
  if (postCommentBtn) {
    console.log('✅ Post comment button found');
    postCommentBtn.addEventListener('click', () => {
      const commentInput = document.getElementById('commentInput');
      if (commentInput) {
        postComment(videoId, commentInput.value);
      }
    });
  } else {
    console.warn('Post comment button NOT found');
  }

  // Allow Enter key to post comment (Shift+Enter for new line)
  const commentInput = document.getElementById('commentInput');
  if (commentInput) {
    console.log('✅ Comment input found');
    commentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        postComment(videoId, commentInput.value);
      }
    });
  } else {
    console.warn('Comment input NOT found');
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log('post-interactions.js loaded');
  console.log('Current page:', window.location.pathname);

  if (window.location.pathname.includes('display')) {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("id");

    console.log('Video ID from URL:', videoId);
    console.log('User logged in:', AUTH.isLoggedIn());
    console.log('Token exists:', AUTH.getToken() ? 'YES' : 'NO');

    if (videoId) {
      setupInteractionHandlers(videoId);
    } else {
      console.error('No video ID found in URL');
    }
  }
});

// Make functions available globally
window.likeVideo = likeVideo;
window.unlikeVideo = unlikeVideo;
window.shareVideo = shareVideo;
window.unshareVideo = unshareVideo;
window.favoriteVideo = favoriteVideo;
window.unfavoriteVideo = unfavoriteVideo;
window.postComment = postComment;
window.deleteComment = deleteComment;
window.updateLikeButton = updateLikeButton;
window.updateFavoriteButton = updateFavoriteButton;
window.updateShareButton = updateShareButton;
window.setupInteractionHandlers = setupInteractionHandlers;
window.showToast = showToast;