// "use strict";
// // Track interaction states
// window.interactionStates = {
//   isLiked: false,
//   isFavorited: false,
//   isShared: false
// };
// document.addEventListener("DOMContentLoaded", () => {
//   console.log('post-interactions.js loaded');
//   console.log('Current page:', window.location.pathname);

//   if (window.location.pathname.includes('display.html')) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const videoId = urlParams.get("id");  // ← Gets videoId from URL like: display.html?id=123

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

// // Helper function to log errors
// function logError(action, error, response = null) {
//   console.error(`❌ ${action} failed:`, error);
//   if (response) {
//     console.error('Response status:', response.status);
//     console.error('Response statusText:', response.statusText);
//   }
// }

// // POST: Like a video
async function likeVideo(videoId) {
  console.log('Like button clicked for video:', videoId);

  if (!AUTH.isLoggedIn()) {
    console.warn('User not logged in');
    alert('Please sign in to like videos');
    window.location.href = 'sign_in.html';
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Video liked successfully:', data);

    // Update UI state
    window.interactionStates.isLiked = true;
    updateLikeButton(true);

    // Increment like count
    const likeCount = document.getElementById('likeCount');
    if (likeCount) {
      const currentCount = parseInt(likeCount.textContent || 0);
      likeCount.textContent = currentCount + 1;
    }

    return data;
  } catch (error) {
    logError('Like video', error);
    alert('Failed to like video. Please try again.');
  }
}

// // DELETE: Unlike a video (UNDO LIKE)
// async function unlikeVideo(videoId) {
//   console.log('Unlike button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) return;

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/like`;

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
//       console.error('Error response body:', errorText);
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     console.log('Video unliked successfully');

//     // Update UI state
//     window.interactionStates.isLiked = false;
//     updateLikeButton(false);

//     // Decrement like count
//     const likeCount = document.getElementById('likeCount');
//     if (likeCount) {
//       const currentCount = parseInt(likeCount.textContent || 0);
//       likeCount.textContent = Math.max(0, currentCount - 1);
//     }
//   } catch (error) {
//     logError('Unlike video', error);
//     alert('Failed to unlike video. Please try again.');
//   }
// }

// // POST: Share a video
// async function shareVideo(videoId) {
//   console.log('🔵 Share button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) {
//     console.warn('User not logged in');
//     alert('Please sign in to share videos');
//     window.location.href = 'sign_in.html';
//     return;
//   }

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/share`;

//     console.log('Sending POST request to:', url);

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('Response status:', response.status);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Error response body:', errorText);
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();
//     console.log('Video shared successfully:', data);

//     // Update UI state
//     window.interactionStates.isShared = true;
//     updateShareButton(true);

//     // Increment share count
//     const shareCount = document.getElementById('shareCount');
//     if (shareCount) {
//       const currentCount = parseInt(shareCount.textContent || 0);
//       shareCount.textContent = currentCount + 1;
//     }

//     // Show success message
//     alert('Video shared successfully!');
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

//     console.log('✅ Video unshared successfully');

//     // Update UI state
//     window.interactionStates.isShared = false;
//     updateShareButton(false);

//     // Decrement share count
//     const shareCount = document.getElementById('shareCount');
//     if (shareCount) {
//       const currentCount = parseInt(shareCount.textContent || 0);
//       shareCount.textContent = Math.max(0, currentCount - 1);
//     }
//   } catch (error) {
//     logError('Unshare video', error);
//     alert('Failed to unshare video. Please try again.');
//   }
// }

// // POST: Add to favorites
// async function favoriteVideo(videoId) {
//   console.log('Favorite button clicked for video:', videoId);

//   if (!AUTH.isLoggedIn()) {
//     console.warn('User not logged in');
//     alert('Please sign in to favorite videos');
//     window.location.href = 'sign_in.html';
//     return;
//   }

//   try {
//     const token = AUTH.getToken();
//     const url = `https://vstad-api.cheatdev.online/api/interactions/videos/${videoId}/favorite`;

//     console.log('Sending POST request to:', url);

//     const response = await fetch(url, {
//       method: 'POST',
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

//     const data = await response.json();
//     console.log('✅ Video favorited successfully:', data);

//     // Update UI state
//     window.interactionStates.isFavorited = true;
//     updateFavoriteButton(true);

//     // Increment favorite count
//     const favoriteCount = document.getElementById('favoriteCount');
//     if (favoriteCount) {
//       const currentCount = parseInt(favoriteCount.textContent || 0);
//       favoriteCount.textContent = currentCount + 1;
//     }

//     return data;
//   } catch (error) {
//     logError('Favorite video', error);
//     alert('Failed to favorite video. Please try again.');
//   }
// }

// // DELETE: Remove from favorites (UNDO FAVORITE)
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

//     // Decrement favorite count
//     const favoriteCount = document.getElementById('favoriteCount');
//     if (favoriteCount) {
//       const currentCount = parseInt(favoriteCount.textContent || 0);
//       favoriteCount.textContent = Math.max(0, currentCount - 1);
//     }
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

//     // Reload comments to show the new one
//     if (window.loadComments) {
//       await window.loadComments(videoId);
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

//     // Reload comments to remove the deleted one
//     if (window.loadComments) {
//       await window.loadComments(videoId);
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
//       // Fill the heart icon when liked
//       svg.setAttribute('fill', 'currentColor');
//     }
//   } else {
//     likeBtn.classList.remove('bg-red-100', 'dark:bg-red-900');
//     likeBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
//     const svg = likeBtn.querySelector('svg');
//     if (svg) {
//       svg.classList.remove('text-red-500');
//       svg.classList.add('text-gray-700', 'dark:text-gray-300');
//       // Outline only when not liked
//       svg.setAttribute('fill', 'none');
//     }
//   }
// }

// // Update favorite button appearance
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
//       // Fill the star icon when favorited
//       svg.setAttribute('fill', 'currentColor');
//     }
//   } else {
//     favoriteBtn.classList.remove('bg-yellow-100', 'dark:bg-yellow-900');
//     favoriteBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
//     const svg = favoriteBtn.querySelector('svg');
//     if (svg) {
//       svg.classList.remove('text-yellow-500');
//       svg.classList.add('text-gray-700', 'dark:text-gray-300');
//       // Outline only when not favorited
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

// // Setup button click handlers with toggle functionality
// function setupInteractionHandlers(videoId) {
//   console.log('🔧 Setting up interaction handlers for video:', videoId);

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

//   // Favorite button - toggles between favorite/unfavorite
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

//   if (window.location.pathname.includes('display.html')) {
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
return data;
  } catch (error) {
  logError('Favorite video', error);
  alert('Failed to favorite video. Please try again.');
}
}

// DELETE: Remove from favorites (UNDO FAVORITE)
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

    // Decrement favorite count
    const favoriteCount = document.getElementById('favoriteCount');
    if (favoriteCount) {
      const currentCount = parseInt(favoriteCount.textContent || 0);
      favoriteCount.textContent = Math.max(0, currentCount - 1);
    }
  } catch (error) {
    logError('Unfavorite video', error);
    alert('Failed to unfavorite video. Please try again.');
  }
}

// POST: Add a comment
async function postComment(videoId, content) {
  console.log('Post comment button clicked for video:', videoId);

  if (!AUTH.isLoggedIn()) {
    console.warn('User not logged in');
    alert('Please sign in to comment');
    window.location.href = 'sign_in.html';
    return;
  }

  if (!content || content.trim() === '') {
    console.warn('Comment is empty');
    alert('Please enter a comment');
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

    // Reload comments to show the new one
    if (window.loadComments) {
      await window.loadComments(videoId);
    }

    // Show success message briefly
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
    successMsg.textContent = '✓ Comment posted!';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 2000);

    return data;
  } catch (error) {
    logError('Post comment', error);
    alert('Failed to post comment. Please try again.');
  }
}

// DELETE: Delete a comment (UNDO COMMENT)
async function deleteComment(commentId, videoId) {
  console.log('Delete comment button clicked. Comment ID:', commentId);

  if (!AUTH.isLoggedIn()) return;

  if (!confirm('Are you sure you want to delete this comment?')) {
    console.log('User cancelled delete');
    return;
  }

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

    // Reload comments to remove the deleted one
    if (window.loadComments) {
      await window.loadComments(videoId);
    }

    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
    successMsg.textContent = '✓ Comment deleted!';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 2000);

  } catch (error) {
    logError('Delete comment', error);
    alert('Failed to delete comment. Please try again.');
  }
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
      // Fill the heart icon when liked
      svg.setAttribute('fill', 'currentColor');
    }
  } else {
    likeBtn.classList.remove('bg-red-100', 'dark:bg-red-900');
    likeBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
    const svg = likeBtn.querySelector('svg');
    if (svg) {
      svg.classList.remove('text-red-500');
      svg.classList.add('text-gray-700', 'dark:text-gray-300');
      // Outline only when not liked
      svg.setAttribute('fill', 'none');
    }
  }
}

// Update favorite button appearance
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
      // Fill the star icon when favorited
      svg.setAttribute('fill', 'currentColor');
    }
  } else {
    favoriteBtn.classList.remove('bg-yellow-100', 'dark:bg-yellow-900');
    favoriteBtn.classList.add('bg-gray-100', 'dark:bg-gray-700');
    const svg = favoriteBtn.querySelector('svg');
    if (svg) {
      svg.classList.remove('text-yellow-500');
      svg.classList.add('text-gray-700', 'dark:text-gray-300');
      // Outline only when not favorited
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



// Favorite button - toggles between favorite/unfavorite
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