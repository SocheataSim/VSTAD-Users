// // let allVideos = [];
// // let trendingVideos = [];

// // // ============================= 
// // // FETCH TRENDING VIDEOS
// // // ============================= 
// // async function fetchTrendingVideos() {
// //     try {
// //         const response = await fetch('https://vstad-api.cheatdev.online/api/interactions/trending/videos?limit=20');
// //         const data = await response.json();

// //         trendingVideos = data;
// //         displayTrendingVideos(trendingVideos);
// //     } catch (error) {
// //         console.error('Error fetching trending videos:', error);
// //     }
// // }

// // // ============================= 
// // // DISPLAY TRENDING VIDEOS
// // // ============================= 
// // function displayTrendingVideos(videos) {
// //     const container = document.getElementById("trending-videos");
// //     container.innerHTML = ""; // clear old results

// //     videos.forEach(video => {
// //         // Profile image or placeholder
// //         const profileImg = video.uploader.profile_image
// //             ? video.uploader.profile_image
// //             : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

// //         container.innerHTML += `
// //             <div class="video-card cursor-pointer relative overflow-hidden group">
// //                 <div class="thumbnail-wrapper mb-3 relative">
// //                     <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover">
// //                     <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
// //                         ${video.duration ? video.duration.toFixed(2) : "0.00"}s
// //                     </span>
// //                     <!-- Hover overlay -->
// //                     <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
// //                         <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
// //                                 onclick="window.location.href='display.html?id=${video.id}'">
// //                             <i class="fa-solid fa-play"></i> 
// //                         </button>
// //                     </div>
// //                 </div>
// //                 <div class="flex gap-3">
// //                     <div class="w-9 h-9 rounded-full overflow-hidden">
// //                         <img src="${profileImg}" alt="${video.uploader.username}">
// //                     </div>
// //                     <div class="flex-1 min-w-0">
// //                         <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
// //                             ${video.title}
// //                         </h3>
// //                         <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader.username}</p>
// //                         <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
// //                     </div>
// //                 </div>
// //             </div>
// //         `;
// //     });
// // }

// // // ============================= 
// // // SEARCH FUNCTIONALITY
// // // ============================= 
// // async function fetchData() {
// //     try {
// //         const keyword = document.getElementById('search-input')
// //             .value.trim()
// //             .toLowerCase();

// //         if (!keyword) return;

// //         const response = await fetch(
// //             `https://vstad-api.cheatdev.online/api/interactions/search/videos?q=${encodeURIComponent(keyword)}&skip=0&limit=20`
// //         );

// //         const data = await response.json();

// //         allVideos = data.videos;
// //         displayVideos(allVideos);

// //     } catch (error) {
// //         console.error(error);
// //     }
// // }

// // document.getElementById("search-input").addEventListener("input", (e) => {
// //     if (e.target.value.trim() === "") {
// //         loadHomepageVideos();
// //     }
// // });

// // // Trigger search on ENTER
// // document.getElementById("search-input").addEventListener("keypress", (e) => {
// //     if (e.key === "Enter") {
// //         fetchData();
// //     }
// // });

// // // ============================= 
// // // DISPLAY ALL VIDEOS
// // // ============================= 
// // function displayVideos(videos) {
// //     const container = document.getElementById("video-results");
// //     container.innerHTML = ""; // clear old results

// //     videos.forEach(video => {
// //         // Profile image or placeholder
// //         const profileImg = video.uploader.profile_image
// //             ? video.uploader.profile_image
// //             : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

// //         container.innerHTML += `
// //             <div class="video-card cursor-pointer relative overflow-hidden group">
// //                 <div class="thumbnail-wrapper mb-3 relative">
// //                     <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover">
// //                     <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
// //                         ${video.duration ? (video.duration / 100).toFixed(2) : "0.000"}
// //                     </span>
// //                     <!-- Hover overlay -->
// //                     <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
// //                         <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
// //                                 onclick="window.location.href='display.html?id=${video.id}'">
// //                             <i class="fa-solid fa-play"></i> 
// //                         </button>
// //                     </div>
// //                 </div>
// //                 <div class="flex gap-3">
// //                     <div class="w-9 h-9 rounded-full overflow-hidden">
// //                         <img src="${profileImg}" alt="${video.uploader.username}">
// //                     </div>
// //                     <div class="flex-1 min-w-0">
// //                         <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
// //                             ${video.title}
// //                         </h3>
// //                         <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader.username}</p>
// //                         <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
// //                     </div>
// //                 </div>
// //             </div>
// //         `;
// //     });
// // }

// // // ============================= 
// // // TIME AGO HELPER
// // // ============================= 
// // function timeSince(date) {
// //     const seconds = Math.floor((new Date() - date) / 1000);
// //     const intervals = {
// //         year: 31536000,
// //         month: 2592000,
// //         week: 604800,
// //         day: 86400,
// //         hour: 3600,
// //         minute: 60
// //     };

// //     for (const [unit, value] of Object.entries(intervals)) {
// //         const result = Math.floor(seconds / value);
// //         if (result >= 1) return `${result} ${unit}${result > 1 ? 's' : ''} ago`;
// //     }

// //     return "Just now";
// // }

// // // ============================= 
// // // LOAD HOMEPAGE VIDEOS (ALL VIDEOS)
// // // ============================= 
// // async function loadHomepageVideos() {
// //     try {
// //         const response = await fetch("https://vstad-api.cheatdev.online/api/videos/?skip=0&limit=10");
// //         const data = await response.json();

// //         allVideos = data.videos;
// //         displayVideos(allVideos);
// //     } catch (error) {
// //         console.error(error);
// //     }
// // }

// // // ============================= 
// // // INITIALIZE ON PAGE LOAD
// // // ============================= 
// // window.addEventListener("load", () => {
// //     fetchTrendingVideos();  // Load trending videos
// //     loadHomepageVideos();   // Load all videos
// // });

// // // ============================= 
// // // VIDEO DISPLAY PAGE LOGIC
// // // ============================= 
// // document.addEventListener("DOMContentLoaded", () => {
// //     // Get the video ID from URL params, e.g., video.html?id=3
// //     const urlParams = new URLSearchParams(window.location.search);
// //     const videoId = urlParams.get("id");

// //     if (!videoId) {
// //         return; // Not on display page
// //     }

// //     const apiEndpoint = `https://vstad-api.cheatdev.online/api/videos/${videoId}`;

// //     fetch(apiEndpoint)
// //         .then(response => response.json())
// //         .then(video => {
// //             // Profile image or placeholder
// //             const profileImg = video.uploader.profile_image
// //                 ? video.uploader.profile_image
// //                 : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

// //             // Set video source
// //             const videoPlayer = document.getElementById("videoPlayer");
// //             if (videoPlayer) {
// //                 videoPlayer.querySelector("source").src = video.video_url;
// //                 videoPlayer.poster = video.thumbnail_url || "https://via.placeholder.com/720x480?text=No+Thumbnail";
// //                 videoPlayer.load();
// //             }

// //             // Set video info
// //             const videoTitle = document.getElementById("videoTitle");
// //             const videoDescription = document.getElementById("videoDescription");
// //             const videoView = document.getElementById("videoView");

// //             if (videoTitle) videoTitle.textContent = video.title;
// //             if (videoDescription) videoDescription.textContent = `${video.description}`;
// //             if (videoView) videoView.textContent = `${video.view_count} • Published on ${new Date(video.created_at).toLocaleDateString()}`;

// //             // Uploader info
// //             const uploaderName = video.uploader.full_name || video.uploader.username;
// //             const uploaderElement = document.querySelector(".flex.items-center.space-x-3 h3");
// //             if (uploaderElement) uploaderElement.textContent = uploaderName;

// //             // Insert profile image dynamically
// //             const profileContainer = document.getElementById("profileContainer");
// //             if (profileContainer) {
// //                 profileContainer.innerHTML = `<img src="${profileImg}" class="w-full h-full rounded-full object-cover" alt="${uploaderName}">`;
// //             }

// //             // Stats
// //             const likeCount = document.getElementById("likeCount");
// //             const shareBtn = document.getElementById("shareBtn");
// //             const favoriteBtn = document.getElementById("favoriteBtn");

// //             if (likeCount) likeCount.textContent = video.like_count;
// //             if (shareBtn) shareBtn.querySelector("span").textContent = video.share_count;
// //             if (favoriteBtn) favoriteBtn.querySelector("span").textContent = video.comment_count;
// //         })
// //         .catch(error => console.error("Error loading video:", error));
// // });

// // // ============================= 
// // // SIDEBAR VIDEOS
// // // ============================= 
// // document.addEventListener("DOMContentLoaded", () => {
// //     const sidebarContainerId = "sidebarVideos";
// //     const sidebarContainer = document.getElementById(sidebarContainerId);

// //     if (!sidebarContainer) return; // Not on display page

// //     fetch("https://vstad-api.cheatdev.online/api/videos/?skip=0&limit=10")
// //         .then(res => res.json())
// //         .then(data => {
// //             const urlParams = new URLSearchParams(window.location.search);
// //             const mainVideoId = urlParams.get("id");

// //             // Exclude main video from sidebar
// //             const sidebarVideos = data.videos.filter(v => v.id != mainVideoId);

// //             // Display in sidebar
// //             sidebarContainer.innerHTML = "";

// //             sidebarVideos.forEach(video => {
// //                 const profileImg = video.uploader.profile_image
// //                     ? video.uploader.profile_image
// //                     : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

// //                 sidebarContainer.innerHTML += `
// //                     <div class="video-card cursor-pointer relative overflow-hidden group">
// //                         <div class="thumbnail-wrapper mb-3 relative">
// //                             <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover">
// //                             <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
// //                                 ${video.duration ? video.duration.toFixed(2) : "0.00"}
// //                             </span>
// //                             <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-transform duration-300">
// //                                 <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
// //                                         onclick="window.location.href='display.html?id=${video.id}'">
// //                                         <i class="fa-solid fa-play"></i> 
// //                                 </button>
// //                             </div>
// //                         </div>
// //                         <div class="flex gap-3">
// //                             <div class="w-9 h-9 rounded-full overflow-hidden">
// //                                 <img src="${profileImg}" alt="${video.uploader.username}">
// //                             </div>
// //                             <div class="flex-1 min-w-0">
// //                                 <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
// //                                     ${video.title}
// //                                 </h3>
// //                                 <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader.username}</p>
// //                                 <p class="text-xs text-gray-600 dark:text-gray-400"> ${video.view_count} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 `;
// //             });
// //         })
// //         .catch(err => console.error("Error loading sidebar videos:", err));
// // });

// // // ============================= 
// // // LANDING PAGE MAIN VIDEO
// // // ============================= 
// // document.addEventListener("DOMContentLoaded", () => {
// //     const mainVideo = document.getElementById("mainVideo");

// //     if (!mainVideo) return; // Not on landing page

// //     const apiUrl = `https://vstad-api.cheatdev.online/api/videos/4`;

// //     fetch(apiUrl)
// //         .then(res => res.json())
// //         .then(video => {
// //             mainVideo.src = video.video_url;
// //             mainVideo.load();
// //             mainVideo.play().catch(err => console.warn("Autoplay blocked:", err));
// //         })
// //         .catch(err => console.error("Error fetching video:", err));
// // });

// // // ============================= 
// // // FILTER BY YEAR
// // // ============================= 
// // document.addEventListener("DOMContentLoaded", () => {
// //     const yearFilter = document.getElementById('year-filter');
// //     if (yearFilter) {
// //         yearFilter.addEventListener('change', (e) => {
// //             const selectedYear = e.target.value;

// //             if (selectedYear === 'all') {
// //                 displayVideos(allVideos);
// //             } else {
// //                 const filteredVideos = allVideos.filter(video => {
// //                     const createdYear = new Date(video.created_at).getFullYear().toString();
// //                     return createdYear === selectedYear;
// //                 });
// //                 displayVideos(filteredVideos);
// //             }
// //         });
// //     }
// // });
// // 

// let allVideos = [];
// let trendingVideos = [];
// let currentSkip = 0;
// const LIMIT = 9; // Number of videos to load each time
// const INITIAL_LOAD = 3; // Only show 3 videos initially

// // ============================= 
// // FETCH TRENDING VIDEOS
// // ============================= 
// async function fetchTrendingVideos() {
//     const container = document.getElementById("trending-videos");

//     // Show loading state
//     container.innerHTML = `
//         <div class="col-span-full flex justify-center items-center py-12">
//             <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//     `;

//     try {
//         const response = await fetch('https://vstad-api.cheatdev.online/api/interactions/trending/videos?limit=20');

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Trending videos data:', data);

//         trendingVideos = data;
//         displayTrendingVideos(trendingVideos);
//     } catch (error) {
//         console.error('Error fetching trending videos:', error);
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <p class="text-red-500">Failed to load trending videos. Please try again later.</p>
//             </div>
//         `;
//     }
// }

// // ============================= 
// // DISPLAY TRENDING VIDEOS
// // ============================= 
// function displayTrendingVideos(videos) {
//     const container = document.getElementById("trending-videos");

//     if (!videos || videos.length === 0) {
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
//                 </svg>
//                 <p class="text-gray-500 dark:text-gray-400">No trending videos available</p>
//             </div>
//         `;
//         return;
//     }

//     container.innerHTML = "";

//     videos.forEach(video => {
//         const profileImg = video.uploader?.profile_image ||
//             "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//         const videoCard = document.createElement('div');
//         videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
//         videoCard.innerHTML = `
//             <div class="thumbnail-wrapper mb-3 relative">
//                 <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover" 
//                      onerror="this.src='https://via.placeholder.com/320x180?text=No+Thumbnail'">
//                 <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
//                     ${video.duration ? video.duration.toFixed(2) : "0.00"}s
//                 </span>
//                 <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
//                     <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
//                             onclick="window.location.href='display.html?id=${video.id}'">
//                         <i class="fa-solid fa-play"></i> 
//                     </button>
//                 </div>
//             </div>
//             <div class="flex gap-3">
//                 <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
//                     <img src="${profileImg}" alt="${video.uploader?.username || 'User'}" 
//                          onerror="this.src='https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg'">
//                 </div>
//                 <div class="flex-1 min-w-0">
//                     <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
//                         ${video.title}
//                     </h3>
//                     <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
//                     <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
//                 </div>
//             </div>
//         `;
//         container.appendChild(videoCard);
//     });
// }

// // ============================= 
// // SEARCH FUNCTIONALITY
// // ============================= 
// async function fetchData() {
//     try {
//         const keyword = document.getElementById('search-input')
//             .value.trim()
//             .toLowerCase();

//         if (!keyword) return;

//         const container = document.getElementById("video-results");
//         container.innerHTML = `
//             <div class="col-span-full flex justify-center items-center py-12">
//                 <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//         `;

//         const response = await fetch(
//             `https://vstad-api.cheatdev.online/api/interactions/search/videos?q=${encodeURIComponent(keyword)}&skip=0&limit=20`
//         );

//         const data = await response.json();
//         console.log('Search results:', data);

//         allVideos = data.videos || [];
//         displayVideos(allVideos);

//         const loadMoreBtn = document.getElementById("loadMoreBtn");
//         if (loadMoreBtn) {
//             loadMoreBtn.style.display = 'none';
//         }

//     } catch (error) {
//         console.error('Search error:', error);
//         const container = document.getElementById("video-results");
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <p class="text-red-500">Failed to search videos. Please try again.</p>
//             </div>
//         `;
//     }
// }

// document.getElementById("search-input")?.addEventListener("input", (e) => {
//     if (e.target.value.trim() === "") {
//         currentSkip = 0;
//         loadHomepageVideos();
//         const loadMoreBtn = document.getElementById("loadMoreBtn");
//         if (loadMoreBtn) {
//             loadMoreBtn.style.display = 'block';
//         }
//     }
// });

// document.getElementById("search-input")?.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//         fetchData();
//     }
// });

// // ============================= 
// // DISPLAY ALL VIDEOS
// // ============================= 
// function displayVideos(videos) {
//     const container = document.getElementById("video-results");

//     if (!videos || videos.length === 0) {
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
//                 </svg>
//                 <p class="text-gray-500 dark:text-gray-400">No videos available</p>
//             </div>
//         `;
//         return;
//     }

//     container.innerHTML = "";

//     videos.forEach(video => {
//         const profileImg = video.uploader?.profile_image ||
//             "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//         const videoCard = document.createElement('div');
//         videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
//         videoCard.innerHTML = `
//             <div class="thumbnail-wrapper mb-3 relative">
//                 <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover"
//                      onerror="this.src='https://via.placeholder.com/320x180?text=No+Thumbnail'">
//                 <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
//                     ${video.duration ? (video.duration / 100).toFixed(2) : "0.00"}s
//                 </span>
//                 <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
//                     <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
//                             onclick="window.location.href='display.html?id=${video.id}'">
//                         <i class="fa-solid fa-play"></i> 
//                     </button>
//                 </div>
//             </div>
//             <div class="flex gap-3">
//                 <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
//                     <img src="${profileImg}" alt="${video.uploader?.username || 'User'}"
//                          onerror="this.src='https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg'">
//                 </div>
//                 <div class="flex-1 min-w-0">
//                     <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
//                         ${video.title}
//                     </h3>
//                     <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
//                     <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
//                 </div>
//             </div>
//         `;
//         container.appendChild(videoCard);
//     });
// }

// // ============================= 
// // LOAD HOMEPAGE VIDEOS
// // ============================= 
// async function loadHomepageVideos(append = false) {
//     const container = document.getElementById("video-results");
//     const loadMoreBtn = document.getElementById("loadMoreBtn");

//     if (!append) {
//         currentSkip = 0;
//         container.innerHTML = `
//             <div class="col-span-full flex justify-center items-center py-12">
//                 <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                     <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//             </div>
//         `;
//     } else {
//         if (loadMoreBtn) {
//             loadMoreBtn.disabled = true;
//             loadMoreBtn.innerHTML = `
//                 <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                     <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//             `;
//         }
//     }

//     try {
//         const limitToFetch = append ? LIMIT : INITIAL_LOAD;

//         const response = await fetch(
//             `https://vstad-api.cheatdev.online/api/videos/?skip=${currentSkip}&limit=${limitToFetch}`
//         );

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Homepage videos data:', data);

//         const newVideos = data.videos || [];

//         if (append) {
//             allVideos = [...allVideos, ...newVideos];
//         } else {
//             allVideos = newVideos;
//         }

//         if (!append) {
//             displayVideos(allVideos);
//         } else {
//             newVideos.forEach(video => {
//                 const profileImg = video.uploader?.profile_image ||
//                     "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//                 const videoCard = document.createElement('div');
//                 videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
//                 videoCard.innerHTML = `
//                     <div class="thumbnail-wrapper mb-3 relative">
//                         <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover"
//                              onerror="this.src='https://via.placeholder.com/320x180?text=No+Thumbnail'">
//                         <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
//                             ${video.duration ? (video.duration / 100).toFixed(2) : "0.00"}s
//                         </span>
//                         <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
//                             <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
//                                     onclick="window.location.href='display.html?id=${video.id}'">
//                                 <i class="fa-solid fa-play"></i> 
//                             </button>
//                         </div>
//                     </div>
//                     <div class="flex gap-3">
//                         <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
//                             <img src="${profileImg}" alt="${video.uploader?.username || 'User'}"
//                                  onerror="this.src='https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg'">
//                         </div>
//                         <div class="flex-1 min-w-0">
//                             <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
//                                 ${video.title}
//                             </h3>
//                             <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
//                             <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
//                         </div>
//                     </div>
//                 `;
//                 container.appendChild(videoCard);
//             });
//         }

//         currentSkip += limitToFetch;

//         if (loadMoreBtn) {
//             if (!append) {
//                 loadMoreBtn.style.display = 'block';
//                 loadMoreBtn.disabled = false;
//                 loadMoreBtn.innerHTML = 'Load More Videos';
//             } else {
//                 if (newVideos.length < LIMIT) {
//                     loadMoreBtn.style.display = 'none';
//                 } else {
//                     loadMoreBtn.style.display = 'block';
//                     loadMoreBtn.disabled = false;
//                     loadMoreBtn.innerHTML = 'Load More Videos';
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error loading homepage videos:', error);
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <p class="text-red-500">Failed to load videos. Please try again later.</p>
//             </div>
//         `;
//     }
// }

// // ============================= 
// // LOAD MORE VIDEOS HANDLER
// // ============================= 
// document.getElementById("loadMoreBtn")?.addEventListener("click", () => {
//     loadHomepageVideos(true);
// });

// // ============================= 
// // TIME AGO HELPER
// // ============================= 
// function timeSince(date) {
//     const seconds = Math.floor((new Date() - date) / 1000);
//     const intervals = {
//         year: 31536000,
//         month: 2592000,
//         week: 604800,
//         day: 86400,
//         hour: 3600,
//         minute: 60
//     };

//     for (const [unit, value] of Object.entries(intervals)) {
//         const result = Math.floor(seconds / value);
//         if (result >= 1) return `${result} ${unit}${result > 1 ? 's' : ''} ago`;
//     }

//     return "Just now";
// }

// // ============================= 
// // INITIALIZE ON PAGE LOAD
// // ============================= 
// window.addEventListener("load", () => {
//     console.log('Page loaded, fetching videos...');
//     fetchTrendingVideos();
//     loadHomepageVideos();
// });

// // ============================= 
// // VIDEO DISPLAY PAGE LOGIC
// // ============================= 
// document.addEventListener("DOMContentLoaded", () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const videoId = urlParams.get("id");

//     if (!videoId) {
//         return;
//     }

//     const apiEndpoint = `https://vstad-api.cheatdev.online/api/videos/${videoId}`;

//     fetch(apiEndpoint)
//         .then(response => response.json())
//         .then(video => {
//             const profileImg = video.uploader?.profile_image ||
//                 "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//             const videoPlayer = document.getElementById("videoPlayer");
//             if (videoPlayer) {
//                 videoPlayer.querySelector("source").src = video.video_url;
//                 videoPlayer.poster = video.thumbnail_url || "https://via.placeholder.com/720x480?text=No+Thumbnail";
//                 videoPlayer.load();
//             }

//             const videoTitle = document.getElementById("videoTitle");
//             const videoDescription = document.getElementById("videoDescription");
//             const videoView = document.getElementById("videoView");

//             if (videoTitle) videoTitle.textContent = video.title;
//             if (videoDescription) videoDescription.textContent = `${video.description}`;
//             if (videoView) videoView.textContent = `${video.view_count || 0} • Published on ${new Date(video.created_at).toLocaleDateString()}`;

//             const uploaderName = video.uploader?.full_name || video.uploader?.username || 'Unknown';
//             const uploaderElement = document.querySelector(".flex.items-center.space-x-3 h3");
//             if (uploaderElement) uploaderElement.textContent = uploaderName;

//             const profileContainer = document.getElementById("profileContainer");
//             if (profileContainer) {
//                 profileContainer.innerHTML = `<img src="${profileImg}" class="w-full h-full rounded-full object-cover" alt="${uploaderName}">`;
//             }

//             const likeCount = document.getElementById("likeCount");
//             const shareBtn = document.getElementById("shareBtn");
//             const favoriteBtn = document.getElementById("favoriteBtn");

//             if (likeCount) likeCount.textContent = video.like_count || 0;
//             if (shareBtn) shareBtn.querySelector("span").textContent = video.share_count || 0;
//             if (favoriteBtn) favoriteBtn.querySelector("span").textContent = video.comment_count || 0;
//         })
//         .catch(error => console.error("Error loading video:", error));
// });

// // ============================= 
// // SIDEBAR VIDEOS
// // ============================= 
// document.addEventListener("DOMContentLoaded", () => {
//     const sidebarContainerId = "sidebarVideos";
//     const sidebarContainer = document.getElementById(sidebarContainerId);

//     if (!sidebarContainer) return;

//     fetch("https://vstad-api.cheatdev.online/api/videos/?skip=0&limit=10")
//         .then(res => res.json())
//         .then(data => {
//             const urlParams = new URLSearchParams(window.location.search);
//             const mainVideoId = urlParams.get("id");

//             const sidebarVideos = (data.videos || []).filter(v => v.id != mainVideoId);

//             sidebarContainer.innerHTML = "";

//             sidebarVideos.forEach(video => {
//                 const profileImg = video.uploader?.profile_image ||
//                     "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//                 const videoCard = document.createElement('div');
//                 videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
//                 videoCard.innerHTML = `
//                     <div class="thumbnail-wrapper mb-3 relative">
//                         <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover">
//                         <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
//                             ${video.duration ? video.duration.toFixed(2) : "0.00"}s
//                         </span>
//                         <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-transform duration-300">
//                             <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
//                                     onclick="window.location.href='display.html?id=${video.id}'">
//                                     <i class="fa-solid fa-play"></i> 
//                             </button>
//                         </div>
//                     </div>
//                     <div class="flex gap-3">
//                         <div class="w-9 h-9 rounded-full overflow-hidden">
//                             <img src="${profileImg}" alt="${video.uploader?.username || 'User'}">
//                         </div>
//                         <div class="flex-1 min-w-0">
//                             <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
//                                 ${video.title}
//                             </h3>
//                             <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
//                             <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
//                         </div>
//                     </div>
//                 `;
//                 sidebarContainer.appendChild(videoCard);
//             });
//         })
//         .catch(err => console.error("Error loading sidebar videos:", err));
// });

// // ============================= 
// // LANDING PAGE MAIN VIDEO
// // ============================= 
// document.addEventListener("DOMContentLoaded", () => {
//     const mainVideo = document.getElementById("mainVideo");

//     if (!mainVideo) return;

//     const apiUrl = `https://vstad-api.cheatdev.online/api/videos/4`;

//     fetch(apiUrl)
//         .then(res => res.json())
//         .then(video => {
//             mainVideo.src = video.video_url;
//             mainVideo.load();
//             mainVideo.play().catch(err => console.warn("Autoplay blocked:", err));
//         })
//         .catch(err => console.error("Error fetching video:", err));
// });

// // ============================= 
// // FILTER BY YEAR
// // ============================= 
// document.addEventListener("DOMContentLoaded", () => {
//     const yearFilter = document.getElementById('year-filter');
//     if (yearFilter) {
//         yearFilter.addEventListener('change', (e) => {
//             const selectedYear = e.target.value;

//             if (selectedYear === 'all') {
//                 displayVideos(allVideos);
//             } else {
//                 const filteredVideos = allVideos.filter(video => {
//                     const createdYear = new Date(video.created_at).getFullYear().toString();
//                     return createdYear === selectedYear;
//                 });
//                 displayVideos(filteredVideos);
//             }
//         });
//     }
// });

// let allVideos = [];
// let trendingVideos = [];
// let currentSkip = 0;
// const LIMIT = 9;
// const INITIAL_LOAD = 3;
// let isSearchMode = false; // Track if we're in search mode

// // ============================= 
// // FETCH TRENDING VIDEOS
// // ============================= 
// async function fetchTrendingVideos() {
//     const container = document.getElementById("trending-videos");

//     container.innerHTML = `
//         <div class="col-span-full flex justify-center items-center py-12">
//             <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//     `;

//     try {
//         const response = await fetch('https://vstad-api.cheatdev.online/api/interactions/trending/videos?limit=20');

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Trending videos data:', data);

//         trendingVideos = data;
//         displayTrendingVideos(trendingVideos);
//     } catch (error) {
//         console.error('Error fetching trending videos:', error);
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <p class="text-red-500">Failed to load trending videos. Please try again later.</p>
//             </div>
//         `;
//     }
// }

// // ============================= 
// // DISPLAY TRENDING VIDEOS
// // ============================= 
// function displayTrendingVideos(videos) {
//     const container = document.getElementById("trending-videos");

//     if (!videos || videos.length === 0) {
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
//                 </svg>
//                 <p class="text-gray-500 dark:text-gray-400">No trending videos available</p>
//             </div>
//         `;
//         return;
//     }

//     container.innerHTML = "";

//     videos.forEach(video => {
//         const profileImg = video.uploader?.profile_image ||
//             "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//         const videoCard = document.createElement('div');
//         videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
//         videoCard.innerHTML = `
//             <div class="thumbnail-wrapper mb-3 relative">
//                 <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover" 
//                      onerror="this.src='https://via.placeholder.com/320x180?text=No+Thumbnail'">
//                 <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
//                     ${video.duration ? video.duration.toFixed(2) : "0.00"}s
//                 </span>
//                 <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
//                     <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
//                             onclick="window.location.href='display.html?id=${video.id}'">
//                         <i class="fa-solid fa-play"></i> 
//                     </button>
//                 </div>
//             </div>
//             <div class="flex gap-3">
//                 <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
//                     <img src="${profileImg}" alt="${video.uploader?.username || 'User'}" 
//                          onerror="this.src='https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg'">
//                 </div>
//                 <div class="flex-1 min-w-0">
//                     <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
//                         ${video.title}
//                     </h3>
//                     <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
//                     <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
//                 </div>
//             </div>
//         `;
//         container.appendChild(videoCard);
//     });
// }

// // ============================= 
// // SEARCH FUNCTIONALITY - FIXED
// // ============================= 
// async function fetchData() {
//     try {
//         const searchInput = document.getElementById('search-input');
//         const keyword = searchInput.value.trim(); // Don't convert to lowercase!

//         if (!keyword) {
//             console.log('Empty search keyword');
//             return;
//         }

//         console.log('Searching for:', keyword);
        
//         // Check if we're on the right page
//         const container = document.getElementById("video-results");
        
//         // If not on home/playlist page, redirect there with search query
//         if (!container) {
//             console.log('Not on search page, redirecting...');
//             window.location.href = `home.html?search=${encodeURIComponent(keyword)}`;
//             return;
//         }
        
//         isSearchMode = true; // Set search mode flag
        
//         // Show loading state
//         container.innerHTML = `
//             <div class="col-span-full flex justify-center items-center py-12">
//                 <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//                 <p class="ml-3 text-gray-600 dark:text-gray-400">Searching for "${keyword}"...</p>
//             </div>
//         `;

//         const response = await fetch(
//             `https://vstad-api.cheatdev.online/api/interactions/search/videos?q=${encodeURIComponent(keyword)}&skip=0&limit=20`
//         );

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Search results:', data);
//         console.log('Videos array:', data.videos);

//         allVideos = data.videos || [];
//         console.log('allVideos set to:', allVideos);
        
//         // Show search results count
//         if (allVideos.length > 0) {
//             console.log('Calling displayVideos with', allVideos.length, 'videos');
//             displayVideos(allVideos, `Found ${data.total || allVideos.length} result(s) for "${keyword}"`);
//             console.log('displayVideos called successfully');
//         } else {
//             container.innerHTML = `
//                 <div class="col-span-full text-center py-12">
//                     <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
//                     </svg>
//                     <p class="text-gray-500 dark:text-gray-400 mb-2">No results found for "${keyword}"</p>
//                     <p class="text-sm text-gray-400 dark:text-gray-500">Try different keywords or check your spelling</p>
//                 </div>
//             `;
//         }

//         // Hide load more button in search mode
//         const loadMoreBtn = document.getElementById("loadMoreBtn");
//         if (loadMoreBtn) {
//             loadMoreBtn.style.display = 'none';
//         }

//     } catch (error) {
//         console.error('Search error:', error);
//         const container = document.getElementById("video-results");
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <svg class="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//                 <p class="text-red-500 mb-2">Failed to search videos</p>
//                 <p class="text-sm text-gray-500">Please try again later</p>
//             </div>
//         `;
//     }
// }

// // Search input event listeners
// const searchInput = document.getElementById("search-input");

// if (searchInput) {
//     // Handle input changes
//     searchInput.addEventListener("input", (e) => {
//         const value = e.target.value.trim();
        
//         // If search is cleared, go back to normal mode
//         if (value === "") {
//             console.log('Search cleared, loading homepage videos');
//             isSearchMode = false;
//             currentSkip = 0;
//             loadHomepageVideos();
            
//             const loadMoreBtn = document.getElementById("loadMoreBtn");
//             if (loadMoreBtn) {
//                 loadMoreBtn.style.display = 'block';
//             }
//         }
//     });

//     // Handle Enter key press
//     searchInput.addEventListener("keypress", (e) => {
//         if (e.key === "Enter") {
//             e.preventDefault(); // Prevent form submission if in a form
//             console.log('Enter pressed, triggering search');
//             fetchData();
//         }
//     });
// }

// // ============================= 
// // DISPLAY ALL VIDEOS
// // ============================= 
// function displayVideos(videos, headerMessage = null) {
//     const container = document.getElementById("video-results");

//     if (!container) {
//         console.error('video-results container not found!');
//         return;
//     }

//     if (!videos || videos.length === 0) {
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
//                 </svg>
//                 <p class="text-gray-500 dark:text-gray-400">No videos available</p>
//             </div>
//         `;
//         return;
//     }

//     // Clear container first
//     container.innerHTML = "";
//     console.log('Displaying', videos.length, 'videos');

//     // Add header message if provided
//     if (headerMessage) {
//         const headerDiv = document.createElement('div');
//         headerDiv.className = "col-span-full mb-2 px-2";
//         headerDiv.innerHTML = `
//             <p class="text-sm font-medium text-gray-600 dark:text-gray-400">${headerMessage}</p>
//         `;
//         container.appendChild(headerDiv);
//     }
//      // Add section header for search results
    
//     videos.forEach(video => {
//         const profileImg = video.uploader?.profile_image ||
//             "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//         const videoCard = document.createElement('div');
//         videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
//         videoCard.innerHTML = `
//             <div class="thumbnail-wrapper mb-3 relative">
//                 <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover"
//                      onerror="this.src='https://via.placeholder.com/320x180?text=No+Thumbnail'">
//                 <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
//                     ${video.duration ? (video.duration / 100).toFixed(2) : "0.00"}s
//                 </span>
//                 <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
//                     <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
//                             onclick="window.location.href='display.html?id=${video.id}'">
//                         <i class="fa-solid fa-play"></i> 
//                     </button>
//                 </div>
//             </div>
//             <div class="flex gap-3">
//                 <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
//                     <img src="${profileImg}" alt="${video.uploader?.username || 'User'}"
//                          onerror="this.src='https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg'">
//                 </div>
//                 <div class="flex-1 min-w-0">
//                     <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
//                         ${video.title}
//                     </h3>
//                     <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
//                     <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
//                 </div>
//             </div>
//         `;
//         container.appendChild(videoCard);
//     });
// }

// // ============================= 
// // LOAD HOMEPAGE VIDEOS
// // ============================= 
// async function loadHomepageVideos(append = false) {
//     // Don't load if in search mode
//     if (isSearchMode && !append) {
//         console.log('In search mode, skipping homepage load');
//         return;
//     }

//     const container = document.getElementById("video-results");
//     const loadMoreBtn = document.getElementById("loadMoreBtn");

//     if (!append) {
//         currentSkip = 0;
//         container.innerHTML = `
//             <div class="col-span-full flex justify-center items-center py-12">
//                 <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                     <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//             </div>
//         `;
//     } else {
//         if (loadMoreBtn) {
//             loadMoreBtn.disabled = true;
//             loadMoreBtn.innerHTML = `
//                 <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                     <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//             `;
//         }
//     }

//     try {
//         const limitToFetch = append ? LIMIT : INITIAL_LOAD;

//         const response = await fetch(
//             `https://vstad-api.cheatdev.online/api/videos/?skip=${currentSkip}&limit=${limitToFetch}`
//         );

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Homepage videos data:', data);

//         const newVideos = data.videos || [];

//         if (append) {
//             allVideos = [...allVideos, ...newVideos];
//         } else {
//             allVideos = newVideos;
//         }

//         if (!append) {
//             displayVideos(allVideos);
//         } else {
//             newVideos.forEach(video => {
//                 const profileImg = video.uploader?.profile_image ||
//                     "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//                 const videoCard = document.createElement('div');
//                 videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
//                 videoCard.innerHTML = `
//                     <div class="thumbnail-wrapper mb-3 relative">
//                         <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover"
//                              onerror="this.src='https://via.placeholder.com/320x180?text=No+Thumbnail'">
//                         <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
//                             ${video.duration ? (video.duration / 100).toFixed(2) : "0.00"}s
//                         </span>
//                         <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
//                             <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
//                                     onclick="window.location.href='display.html?id=${video.id}'">
//                                 <i class="fa-solid fa-play"></i> 
//                             </button>
//                         </div>
//                     </div>
//                     <div class="flex gap-3">
//                         <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
//                             <img src="${profileImg}" alt="${video.uploader?.username || 'User'}"
//                                  onerror="this.src='https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg'">
//                         </div>
//                         <div class="flex-1 min-w-0">
//                             <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
//                                 ${video.title}
//                             </h3>
//                             <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
//                             <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
//                         </div>
//                     </div>
//                 `;
//                 container.appendChild(videoCard);
//             });
//         }

//         currentSkip += limitToFetch;

//         if (loadMoreBtn) {
//             if (!append) {
//                 loadMoreBtn.style.display = 'block';
//                 loadMoreBtn.disabled = false;
//                 loadMoreBtn.innerHTML = 'Load More Videos';
//             } else {
//                 if (newVideos.length < LIMIT) {
//                     loadMoreBtn.style.display = 'none';
//                 } else {
//                     loadMoreBtn.style.display = 'block';
//                     loadMoreBtn.disabled = false;
//                     loadMoreBtn.innerHTML = 'Load More Videos';
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error loading homepage videos:', error);
//         container.innerHTML = `
//             <div class="col-span-full text-center py-12">
//                 <p class="text-red-500">Failed to load videos. Please try again later.</p>
//             </div>
//         `;
//     }
// }

// // ============================= 
// // LOAD MORE VIDEOS HANDLER
// // ============================= 
// const loadMoreBtn = document.getElementById("loadMoreBtn");
// if (loadMoreBtn) {
//     loadMoreBtn.addEventListener("click", () => {
//         if (!isSearchMode) {
//             loadHomepageVideos(true);
//         }
//     });
// }

// // ============================= 
// // TIME AGO HELPER
// // ============================= 
// function timeSince(date) {
//     const seconds = Math.floor((new Date() - date) / 1000);
//     const intervals = {
//         year: 31536000,
//         month: 2592000,
//         week: 604800,
//         day: 86400,
//         hour: 3600,
//         minute: 60
//     };

//     for (const [unit, value] of Object.entries(intervals)) {
//         const result = Math.floor(seconds / value);
//         if (result >= 1) return `${result} ${unit}${result > 1 ? 's' : ''} ago`;
//     }

//     return "Just now";
// }

// // ============================= 
// // INITIALIZE ON PAGE LOAD
// // ============================= 
// window.addEventListener("load", () => {
//     console.log('Page loaded, fetching videos...');
    
//     // Check if there's a search query in URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const searchQuery = urlParams.get('search');
    
//     if (searchQuery && document.getElementById("video-results")) {
//         // If there's a search query, populate the search box and trigger search
//         const searchInput = document.getElementById('search-input');
//         if (searchInput) {
//             searchInput.value = searchQuery;
//             fetchData();
//         }
//     } else {
//         // Normal page load
//         fetchTrendingVideos();
//         loadHomepageVideos();
//     }
// });

// // ============================= 
// // VIDEO DISPLAY PAGE LOGIC
// // ============================= 
// document.addEventListener("DOMContentLoaded", () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const videoId = urlParams.get("id");

//     if (!videoId) {
//         return;
//     }

//     const apiEndpoint = `https://vstad-api.cheatdev.online/api/videos/${videoId}`;

//     fetch(apiEndpoint)
//         .then(response => response.json())
//         .then(video => {
//             const profileImg = video.uploader?.profile_image ||
//                 "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//             const videoPlayer = document.getElementById("videoPlayer");
//             if (videoPlayer) {
//                 videoPlayer.querySelector("source").src = video.video_url;
//                 videoPlayer.poster = video.thumbnail_url || "https://via.placeholder.com/720x480?text=No+Thumbnail";
//                 videoPlayer.load();
//             }

//             const videoTitle = document.getElementById("videoTitle");
//             const videoDescription = document.getElementById("videoDescription");
//             const videoView = document.getElementById("videoView");

//             if (videoTitle) videoTitle.textContent = video.title;
//             if (videoDescription) videoDescription.textContent = `${video.description}`;
//             if (videoView) videoView.textContent = `${video.view_count || 0} • Published on ${new Date(video.created_at).toLocaleDateString()}`;

//             const uploaderName = video.uploader?.full_name || video.uploader?.username || 'Unknown';
//             const uploaderElement = document.querySelector(".flex.items-center.space-x-3 h3");
//             if (uploaderElement) uploaderElement.textContent = uploaderName;

//             const profileContainer = document.getElementById("profileContainer");
//             if (profileContainer) {
//                 profileContainer.innerHTML = `<img src="${profileImg}" class="w-full h-full rounded-full object-cover" alt="${uploaderName}">`;
//             }

//             const likeCount = document.getElementById("likeCount");
//             const shareBtn = document.getElementById("shareBtn");
//             const favoriteBtn = document.getElementById("favoriteBtn");

//             if (likeCount) likeCount.textContent = video.like_count || 0;
//             if (shareBtn) shareBtn.querySelector("span").textContent = video.share_count || 0;
//             if (favoriteBtn) favoriteBtn.querySelector("span").textContent = video.comment_count || 0;
//         })
//         .catch(error => console.error("Error loading video:", error));
// });

// // ============================= 
// // SIDEBAR VIDEOS
// // ============================= 
// document.addEventListener("DOMContentLoaded", () => {
//     const sidebarContainerId = "sidebarVideos";
//     const sidebarContainer = document.getElementById(sidebarContainerId);

//     if (!sidebarContainer) return;

//     fetch("https://vstad-api.cheatdev.online/api/videos/?skip=0&limit=10")
//         .then(res => res.json())
//         .then(data => {
//             const urlParams = new URLSearchParams(window.location.search);
//             const mainVideoId = urlParams.get("id");

//             const sidebarVideos = (data.videos || []).filter(v => v.id != mainVideoId);

//             sidebarContainer.innerHTML = "";

//             sidebarVideos.forEach(video => {
//                 const profileImg = video.uploader?.profile_image ||
//                     "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

//                 const videoCard = document.createElement('div');
//                 videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
//                 videoCard.innerHTML = `
//                     <div class="thumbnail-wrapper mb-3 relative">
//                         <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover">
//                         <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
//                             ${video.duration ? video.duration.toFixed(2) : "0.00"}s
//                         </span>
//                         <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-transform duration-300">
//                             <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
//                                     onclick="window.location.href='display.html?id=${video.id}'">
//                                     <i class="fa-solid fa-play"></i> 
//                             </button>
//                         </div>
//                     </div>
//                     <div class="flex gap-3">
//                         <div class="w-9 h-9 rounded-full overflow-hidden">
//                             <img src="${profileImg}" alt="${video.uploader?.username || 'User'}">
//                         </div>
//                         <div class="flex-1 min-w-0">
//                             <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
//                                 ${video.title}
//                             </h3>
//                             <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
//                             <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
//                         </div>
//                     </div>
//                 `;
//                 sidebarContainer.appendChild(videoCard);
//             });
//         })
//         .catch(err => console.error("Error loading sidebar videos:", err));
// });

// // ============================= 
// // LANDING PAGE MAIN VIDEO
// // ============================= 
// document.addEventListener("DOMContentLoaded", () => {
//     const mainVideo = document.getElementById("mainVideo");

//     if (!mainVideo) return;

//     const apiUrl = `https://vstad-api.cheatdev.online/api/videos/4`;

//     fetch(apiUrl)
//         .then(res => res.json())
//         .then(video => {
//             mainVideo.src = video.video_url;
//             mainVideo.load();
//             mainVideo.play().catch(err => console.warn("Autoplay blocked:", err));
//         })
//         .catch(err => console.error("Error fetching video:", err));
// });

// // ============================= 
// // FILTER BY YEAR
// // ============================= 
// document.addEventListener("DOMContentLoaded", () => {
//     const yearFilter = document.getElementById('year-filter');
//     if (yearFilter) {
//         yearFilter.addEventListener('change', (e) => {
//             const selectedYear = e.target.value;

//             if (selectedYear === 'all') {
//                 displayVideos(allVideos);
//             } else {
//                 const filteredVideos = allVideos.filter(video => {
//                     const createdYear = new Date(video.created_at).getFullYear().toString();
//                     return createdYear === selectedYear;
//                 });
//                 displayVideos(filteredVideos);
//             }
//         });
//     }
// });

let allVideos = [];
let trendingVideos = [];
let currentSkip = 0;
const LIMIT = 9;
const INITIAL_LOAD = 3;
let isSearchMode = false; // Track if we're in search mode

// ============================= 
// FETCH TRENDING VIDEOS
// ============================= 
async function fetchTrendingVideos() {
    const container = document.getElementById("trending-videos");

    container.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    `;

    try {
        const response = await fetch('https://vstad-api.cheatdev.online/api/interactions/trending/videos?limit=20');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Trending videos data:', data);

        trendingVideos = data;
        displayTrendingVideos(trendingVideos);
    } catch (error) {
        console.error('Error fetching trending videos:', error);
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-red-500">Failed to load trending videos. Please try again later.</p>
            </div>
        `;
    }
}

// ============================= 
// DISPLAY TRENDING VIDEOS
// ============================= 
function displayTrendingVideos(videos) {
    const container = document.getElementById("trending-videos");

    if (!videos || videos.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <p class="text-gray-500 dark:text-gray-400">No trending videos available</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    videos.forEach(video => {
        const profileImg = video.uploader?.profile_image ||
            "https://i.pinimg.com/736x/29/cb/14/29cb14444ce3baf2704e0402b1a39e0e.jpg";

        const videoCard = document.createElement('div');
        videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
        videoCard.innerHTML = `
            <div class="thumbnail-wrapper mb-3 relative cursor-pointer" onclick="window.location.href='display.html?id=${video.id}'">
                <img src="${video.thumbnail_url}" ...>
                <span class="absolute bottom-2 right-2...">...</span>
                <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
                    <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50 pointer-events-none"> 
                        <i class="fa-solid fa-play"></i> 
                    </button>
                </div>
            </div>
            <div class="flex gap-3">
                <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <img src="${profileImg}" alt="${video.uploader?.username || 'User'}" 
                         onerror="this.src='https://i.pinimg.com/736x/29/cb/14/29cb14444ce3baf2704e0402b1a39e0e.jpg'">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        ${video.title}
                    </h3>
                    <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.appendChild(videoCard);
    });
}

// ============================= 
// SEARCH FUNCTIONALITY - FIXED
// ============================= 
async function fetchData() {
    try {
        const searchInput = document.getElementById('search-input');
        const keyword = searchInput.value.trim(); // Don't convert to lowercase!

        if (!keyword) {
            console.log('Empty search keyword');
            return;
        }

        console.log('Searching for:', keyword);
        
        // Check if we're on the right page
        const container = document.getElementById("video-results");
        
        // If not on home/playlist page, redirect there with search query
        if (!container) {
            console.log('Not on search page, redirecting...');
            window.location.href = `home.html?search=${encodeURIComponent(keyword)}`;
            return;
        }
        
        isSearchMode = true; // Set search mode flag
        
        // Hide trending section during search
        const trendingSection = document.getElementById("trendingSection");
        if (trendingSection) {
            trendingSection.style.display = 'none';
        }
        
        // Show loading state
        container.innerHTML = `
            <div class="col-span-full flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p class="ml-3 text-gray-600 dark:text-gray-400">Searching for "${keyword}"...</p>
            </div>
        `;

        const response = await fetch(
            `https://vstad-api.cheatdev.online/api/interactions/search/videos?q=${encodeURIComponent(keyword)}&skip=0&limit=20`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Search results:', data);
        console.log('Videos array:', data.videos);

        allVideos = data.videos || [];
        console.log('allVideos set to:', allVideos);
        
        // Show search results count
        if (allVideos.length > 0) {
            console.log('Calling displayVideos with', allVideos.length, 'videos');
            displayVideos(allVideos, `Found ${data.total || allVideos.length} result(s) for "${keyword}"`);
            console.log('displayVideos called successfully');
        } else {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <p class="text-gray-500 dark:text-gray-400 mb-2">No results found for "${keyword}"</p>
                    <p class="text-sm text-gray-400 dark:text-gray-500">Try different keywords or check your spelling</p>
                </div>
            `;
        }

        // Hide load more button in search mode
        const loadMoreBtn = document.getElementById("loadMoreBtn");
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }

    } catch (error) {
        console.error('Search error:', error);
        const container = document.getElementById("video-results");
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-red-500 mb-2">Failed to search videos</p>
                <p class="text-sm text-gray-500">Please try again later</p>
            </div>
        `;
    }
}

// Search input event listeners
const searchInput = document.getElementById("search-input");

if (searchInput) {
    let searchTimeout;
    
    // Handle input changes
    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        
        // Clear any existing timeout
        clearTimeout(searchTimeout);
        
        // If search is cleared, go back to normal mode
        if (value === "") {
            console.log('Search cleared, restoring homepage');
            isSearchMode = false;
            currentSkip = 0;
            
            // Show trending section again
            const trendingSection = document.getElementById("trendingSection");
            if (trendingSection) {
                trendingSection.style.display = 'block';
            }
            
            // Show all videos section header
            const allVideosSection = document.getElementById("allVideosSection");
            if (allVideosSection) {
                allVideosSection.style.display = 'block';
            }
            
            // Reload homepage videos
            loadHomepageVideos();
            
            // Show load more button
            const loadMoreBtn = document.getElementById("loadMoreBtn");
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'block';
            }
        }
    });

    // Handle Enter key press
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission if in a form
            console.log('Enter pressed, triggering search');
            fetchData();
        }
    });
}

// ============================= 
// DISPLAY ALL VIDEOS
// ============================= 
function displayVideos(videos, headerMessage = null) {
    const container = document.getElementById("video-results");

    if (!container) {
        console.error('video-results container not found!');
        return;
    }

    if (!videos || videos.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <p class="text-gray-500 dark:text-gray-400">No videos available</p>
            </div>
        `;
        return;
    }

    // Clear container first
    container.innerHTML = "";
    console.log('Displaying', videos.length, 'videos');

    // Add header message if provided
    if (headerMessage) {
        const headerDiv = document.createElement('div');
        headerDiv.className = "col-span-full mb-2 px-2";
        headerDiv.innerHTML = `
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">${headerMessage}</p>
        `;
        container.appendChild(headerDiv);
    }
    
    videos.forEach(video => {
        const profileImg = video.uploader?.profile_image ||
            "https://i.pinimg.com/736x/29/cb/14/29cb14444ce3baf2704e0402b1a39e0e.jpg";

        const videoCard = document.createElement('div');
        videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
        videoCard.innerHTML = `
            <div class="thumbnail-wrapper mb-3 relative cursor-pointer" onclick="window.location.href='display.html?id=${video.id}'">
                <img src="${video.thumbnail_url}" ...>
                <span class="absolute bottom-2 right-2...">...</span>
                <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
                    <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50 pointer-events-none"> 
                        <i class="fa-solid fa-play"></i> 
                    </button>
                </div>
            </div>
            <div class="flex gap-3">
                <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <img src="${profileImg}" alt="${video.uploader?.username || 'User'}"
                         onerror="this.src='https://i.pinimg.com/736x/29/cb/14/29cb14444ce3baf2704e0402b1a39e0e.jpg'">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        ${video.title}
                    </h3>
                    <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        container.appendChild(videoCard);
    });
}

// ============================= 
// LOAD HOMEPAGE VIDEOS
// ============================= 
async function loadHomepageVideos(append = false) {
    // Don't load if in search mode
    if (isSearchMode && !append) {
        console.log('In search mode, skipping homepage load');
        return;
    }

    const container = document.getElementById("video-results");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    if (!append) {
        currentSkip = 0;
        container.innerHTML = `
            <div class="col-span-full flex justify-center items-center py-12">
                <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        `;
    } else {
        if (loadMoreBtn) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.innerHTML = `
                <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            `;
        }
    }

    try {
        const limitToFetch = append ? LIMIT : INITIAL_LOAD;

        const response = await fetch(
            `https://vstad-api.cheatdev.online/api/videos/?skip=${currentSkip}&limit=${limitToFetch}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Homepage videos data:', data);

        const newVideos = data.videos || [];

        if (append) {
            allVideos = [...allVideos, ...newVideos];
        } else {
            allVideos = newVideos;
        }

        if (!append) {
            displayVideos(allVideos);
        } else {
            newVideos.forEach(video => {
                const profileImg = video.uploader?.profile_image ||
                    "https://i.pinimg.com/736x/29/cb/14/29cb14444ce3baf2704e0402b1a39e0e.jpg";

                const videoCard = document.createElement('div');
                videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
                videoCard.innerHTML = `
                    <div class="thumbnail-wrapper mb-3 relative cursor-pointer" onclick="window.location.href='display.html?id=${video.id}'">
                        <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover"
                             onerror="this.src='https://via.placeholder.com/320x180?text=No+Thumbnail'">
                        <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
                            ${video.duration ? (video.duration / 100).toFixed(2) : "0.00"}s
                        </span>
                        <div class="absolute inset-0 flex items-center justify-center scale-100 group-hover:scale-110 transition-transform duration-300">
                            <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50 pointer-events-none"> 
                                <i class="fa-solid fa-play"></i> 
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <div class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                            <img src="${profileImg}" alt="${video.uploader?.username || 'User'}"
                                 onerror="this.src='https://i.pinimg.com/736x/29/cb/14/29cb14444ce3baf2704e0402b1a39e0e.jpg'">
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                                ${video.title}
                            </h3>
                            <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                `;
                container.appendChild(videoCard);
            });
        }

        currentSkip += limitToFetch;

        if (loadMoreBtn) {
            if (!append) {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.disabled = false;
                loadMoreBtn.innerHTML = 'Load More Videos';
            } else {
                if (newVideos.length < LIMIT) {
                    loadMoreBtn.style.display = 'none';
                } else {
                    loadMoreBtn.style.display = 'block';
                    loadMoreBtn.disabled = false;
                    loadMoreBtn.innerHTML = 'Load More Videos';
                }
            }
        }
    } catch (error) {
        console.error('Error loading homepage videos:', error);
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-red-500">Failed to load videos. Please try again later.</p>
            </div>
        `;
    }
}

// ============================= 
// LOAD MORE VIDEOS HANDLER
// ============================= 
const loadMoreBtn = document.getElementById("loadMoreBtn");
if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
        if (!isSearchMode) {
            loadHomepageVideos(true);
        }
    });
}

// ============================= 
// TIME AGO HELPER
// ============================= 
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

// ============================= 
// INITIALIZE ON PAGE LOAD
// ============================= 
window.addEventListener("load", () => {
    console.log('Page loaded, fetching videos...');
    
    // Check if there's a search query in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery && document.getElementById("video-results")) {
        // If there's a search query, populate the search box and trigger search
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = searchQuery;
            fetchData();
        }
    } else {
        // Normal page load
        fetchTrendingVideos();
        loadHomepageVideos();
    }
});

// ============================= 
// VIDEO DISPLAY PAGE LOGIC
// ============================= 
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("id");

    if (!videoId) {
        return;
    }

    const apiEndpoint = `https://vstad-api.cheatdev.online/api/videos/${videoId}`;

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(video => {
            const profileImg = video.uploader?.profile_image ||
                "https://i.pinimg.com/736x/29/cb/14/29cb14444ce3baf2704e0402b1a39e0e.jpg";

            const videoPlayer = document.getElementById("videoPlayer");
            if (videoPlayer) {
                videoPlayer.querySelector("source").src = video.video_url;
                videoPlayer.poster = video.thumbnail_url || "https://via.placeholder.com/720x480?text=No+Thumbnail";
                videoPlayer.load();
            }

            const videoTitle = document.getElementById("videoTitle");
            const videoDescription = document.getElementById("videoDescription");
            const videoView = document.getElementById("videoView");

            if (videoTitle) videoTitle.textContent = video.title;
            if (videoDescription) videoDescription.textContent = `${video.description}`;
            if (videoView) videoView.textContent = `${video.view_count || 0} • Published on ${new Date(video.created_at).toLocaleDateString()}`;

            const uploaderName = video.uploader?.full_name || video.uploader?.username || 'Unknown';
            const uploaderElement = document.querySelector(".flex.items-center.space-x-3 h3");
            if (uploaderElement) uploaderElement.textContent = uploaderName;

            const profileContainer = document.getElementById("profileContainer");
            if (profileContainer) {
                profileContainer.innerHTML = `<img src="${profileImg}" class="w-full h-full rounded-full object-cover" alt="${uploaderName}">`;
            }

            const likeCount = document.getElementById("likeCount");
            const shareBtn = document.getElementById("shareBtn");
            const favoriteBtn = document.getElementById("favoriteBtn");

            if (likeCount) likeCount.textContent = video.like_count || 0;
            if (shareBtn) shareBtn.querySelector("span").textContent = video.share_count || 0;
            if (favoriteBtn) favoriteBtn.querySelector("span").textContent = video.comment_count || 0;
        })
        .catch(error => console.error("Error loading video:", error));
});

// ============================= 
// SIDEBAR VIDEOS
// ============================= 
document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainerId = "sidebarVideos";
    const sidebarContainer = document.getElementById(sidebarContainerId);

    if (!sidebarContainer) return;

    fetch("https://vstad-api.cheatdev.online/api/videos/?skip=0&limit=10")
        .then(res => res.json())
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            const mainVideoId = urlParams.get("id");

            const sidebarVideos = (data.videos || []).filter(v => v.id != mainVideoId);

            sidebarContainer.innerHTML = "";

            sidebarVideos.forEach(video => {
                const profileImg = video.uploader?.profile_image ||
                    "https://i.pinimg.com/736x/29/cb/14/29cb14444ce3baf2704e0402b1a39e0e.jpg";

                const videoCard = document.createElement('div');
                videoCard.className = "video-card cursor-pointer relative overflow-hidden group";
                videoCard.innerHTML = `
                    <div class="thumbnail-wrapper mb-3 relative">
                        <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover">
                        <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
                            ${video.duration ? video.duration.toFixed(2) : "0.00"}s
                        </span>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-transform duration-300">
                            <button class="text-white font-bold px-4 py-2 rounded-full bg-opacity-50" 
                                    onclick="window.location.href='display.html?id=${video.id}'">
                                    <i class="fa-solid fa-play"></i> 
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <div class="w-9 h-9 rounded-full overflow-hidden">
                            <img src="${profileImg}" alt="${video.uploader?.username || 'User'}">
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                                ${video.title}
                            </h3>
                            <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader?.username || 'Unknown'}</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400">${video.view_count || 0} views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                `;
                sidebarContainer.appendChild(videoCard);
            });
        })
        .catch(err => console.error("Error loading sidebar videos:", err));
});

// ============================= 
// LANDING PAGE MAIN VIDEO
// ============================= 
document.addEventListener("DOMContentLoaded", () => {
    const mainVideo = document.getElementById("mainVideo");

    if (!mainVideo) return;

    const apiUrl = `https://vstad-api.cheatdev.online/api/videos/4`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(video => {
            mainVideo.src = video.video_url;
            mainVideo.load();
            mainVideo.play().catch(err => console.warn("Autoplay blocked:", err));
        })
        .catch(err => console.error("Error fetching video:", err));
});

// ============================= 
// FILTER BY YEAR
// ============================= 
document.addEventListener("DOMContentLoaded", () => {
    const yearFilter = document.getElementById('year-filter');
    if (yearFilter) {
        yearFilter.addEventListener('change', (e) => {
            const selectedYear = e.target.value;

            if (selectedYear === 'all') {
                displayVideos(allVideos);
            } else {
                const filteredVideos = allVideos.filter(video => {
                    const createdYear = new Date(video.created_at).getFullYear().toString();
                    return createdYear === selectedYear;
                });
                displayVideos(filteredVideos);
            }
        });
    }
});

// Load current user's profile image for comment section
async function loadCommentProfileImage() {
    try {
        const bearerToken = localStorage.getItem('access_token') || localStorage.getItem('authToken');
        
        if (!bearerToken) {
            console.warn("No bearer token found");
            return;
        }

        // Try to get from API first
        const userId = localStorage.getItem('userId') || localStorage.getItem('user_id');
        
        if (userId) {
            const res = await fetch(`https://vstad-api.cheatdev.online/api/admin/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Accept': 'application/json'
                }
            });

            if (res.ok) {
                const userData = await res.json();
                
                if (userData.profile_image) {
                    // Use the API endpoint pattern to get profile image
                    const profileImageUrl = `https://vstad-api.cheatdev.online/api/profile/profile-image/${userData.profile_image}`;
                    document.getElementById('commentProfileImage').src = profileImageUrl;
                    return;
                }
            }
        }

        // Fallback to localStorage
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            
            if (profileData.profile_image) {
                const profileImageUrl = `https://vstad-api.cheatdev.online/api/profile/profile-image/${profileData.profile_image}`;
                document.getElementById('commentProfileImage').src = profileImageUrl;
            }
        }

    } catch (err) {
        console.error("Failed to load comment profile image:", err);
    }
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCommentProfileImage();
    // ... your other initialization code
});

// Load current user's profile image for comment section
async function loadCommentProfileImage() {
    try {
        const token = AUTH.getToken();
        
        if (!token) {
            console.warn('No authentication token found');
            return;
        }

        // Get user ID from localStorage
        const userId = localStorage.getItem('userId') || localStorage.getItem('user_id');
        
        if (!userId) {
            console.warn('No user ID found');
            return;
        }

        console.log('📤 Fetching user profile for comment section. User ID:', userId);

        // Fetch user profile from API
        const response = await fetch(`https://vstad-api.cheatdev.online/api/admin/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        console.log('📥 Profile API response status:', response.status);

        if (response.ok) {
            const userData = await response.json();
            console.log('✅ User profile loaded:', userData);
            
            // Update comment profile image
            const commentProfileImage = document.getElementById('commentProfileImage');
            if (commentProfileImage && userData.profile_image) {
                // Use the API endpoint pattern: GET /api/profile/profile-image/:filename
                const profileImageUrl = `https://vstad-api.cheatdev.online/api/profile/profile-image/${userData.profile_image}`;
                commentProfileImage.src = profileImageUrl;
                console.log('✅ Comment profile image updated:', profileImageUrl);
            }
        } else {
            console.warn('⚠️ Failed to fetch user profile:', response.status);
            // Try localStorage fallback
            loadProfileImageFromCache();
        }

    } catch (error) {
        console.error('❌ Error loading comment profile image:', error);
        // Try localStorage fallback
        loadProfileImageFromCache();
    }
}

// Fallback: Load profile image from localStorage cache
function loadProfileImageFromCache() {
    try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            
            const commentProfileImage = document.getElementById('commentProfileImage');
            if (commentProfileImage && profileData.profile_image) {
                const profileImageUrl = `https://vstad-api.cheatdev.online/api/profile/profile-image/${profileData.profile_image}`;
                commentProfileImage.src = profileImageUrl;
                console.log('✅ Comment profile image loaded from cache:', profileImageUrl);
            }
        }
    } catch (error) {
        console.error('❌ Error loading from cache:', error);
    }
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCommentProfileImage();
    // ... your other initialization code
});