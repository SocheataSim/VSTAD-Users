
async function fetchData() {
    try {
        const keyword = document.getElementById('search-input')
            .value.trim()
            .toLowerCase();

        if (!keyword) return;

        const response = await fetch(
            `https://vstad-api.cheatdev.online/api/interactions/search/videos?q=${encodeURIComponent(keyword)}&skip=0&limit=20`
        );

        const data = await response.json();

        displayVideos(videos);   // <—— THIS IS THE SECOND PLACE

    } catch (error) {
        console.error(error);
    }
}

document.getElementById("search-input").addEventListener("input", (e) => {
    if (e.target.value.trim() === "") {
        loadHomepageVideos();   // <—— THIS RETURNS TO HOMEPAGE CONTENT
    }
});


// Trigger search on ENTER
document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchData();
    }
});


function displayVideos(videos) {
    const container = document.getElementById("video-results");
    container.innerHTML = ""; // clear old results


    videos.forEach(video => {
        // Profile image or placeholder
        const profileImg = video.uploader.profile_image 
            ? video.uploader.profile_image 
            : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

        // Format date
        const timeAgo = timeSince(new Date(video.created_at));

        container.innerHTML += `
            <div class="video-card cursor-pointer relative overflow-hidden group">
            <div class="thumbnail-wrapper mb-3 relative">
                <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover">
                <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    ${video.duration ? (video.duration / 100).toFixed(2) : "0.000"}
                </span>
                <!-- Hover overlay -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-transform duration-300">
                    <button class="text-white font-bold px-4 py-2 rounded-full bg-secondary-color bg-opacity-50" 
                            onclick="window.location.href='display.html?id=${video.id}'">
                        <i class="fa-solid fa-play"></i> 
                    </button>
                </div>
            </div>
            <div class="flex gap-3">
                <div class="w-9 h-9 rounded-full overflow-hidden">
                    <img src="${profileImg}" alt="${video.uploader.username}">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        ${video.title}
                    </h3>
                    <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader.username}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">3k views • Published on ${new Date(video.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        </div>

        `;
    });
    // ${timeAgo}
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
window.addEventListener("load", loadHomepageVideos);

async function loadHomepageVideos() {
    try {
        const response = await fetch("https://vstad-api.cheatdev.online/api/videos/?skip=0&limit=10");
        const data = await response.json();

        displayVideos(data.videos); 
    } catch (error) {
        console.error(error);
    }
}
//////////////////
document.addEventListener("DOMContentLoaded", () => {
    // Get the video ID from URL params, e.g., video.html?id=3
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("id");

    // if (!videoId) {
    //     alert("No video ID provided.");
    //     return;
    // }

    const apiEndpoint = `https://vstad-api.cheatdev.online/api/videos/${videoId}`;

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(video => {
        // Profile image or placeholder
        const profileImg = video.uploader.profile_image 
            ? video.uploader.profile_image
            : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

        // Set video source
        const videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.querySelector("source").src = video.video_url;
        videoPlayer.poster = video.thumbnail_url || "https://via.placeholder.com/720x480?text=No+Thumbnail";
        videoPlayer.load();

        // Set video info
        document.getElementById("videoTitle").textContent = video.title;
        document.getElementById("videoDescription").textContent = `${video.description}`;
        document.getElementById("videoView").textContent = `3k views • Published on ${new Date(video.created_at).toLocaleDateString()}`;

// ${timeSince(new Date(video.created_at))}
        // Uploader info
        const uploaderName = video.uploader.full_name || video.uploader.username;
        document.querySelector(".flex.items-center.space-x-3 h3").textContent = uploaderName;

        // Insert profile image dynamically
        const profileContainer = document.getElementById("profileContainer");
        profileContainer.innerHTML = `<img src="${profileImg}" class="w-full h-full rounded-full object-cover" alt="${uploaderName}">`;


        // Stats
        // document.getElementById("viewCount").textContent = `3k views`; //${video.view_count}
        document.getElementById("likeCount").textContent = video.like_count;
        document.getElementById("shareBtn").querySelector("span").textContent = video.share_count;
        document.getElementById("favoriteBtn").querySelector("span").textContent = video.comment_count;
    })   
});


document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainerId = "sidebarVideos"; // ID of the sidebar container

    // Helper: convert date to "time ago"
    function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        const intervals = { year: 31536000, month: 2592000, week: 604800, day: 86400, hour: 3600, minute: 60 };
        for (const [unit, value] of Object.entries(intervals)) {
            const count = Math.floor(seconds / value);
            if (count >= 1) return `${count} ${unit}${count > 1 ? "s" : ""}`;
        }
        return "just now";
    }

    // Function to display sidebar videos
    function displayVideos(videos) {
        const container = document.getElementById(sidebarContainerId);
        container.innerHTML = ""; // clear old results

        videos.map(video => {
            const profileImg = video.uploader.profile_image 
                ? video.uploader.profile_image 
                : "https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg";

            const timeAgo = timeSince(new Date(video.created_at));

            container.innerHTML += `
                <div class="video-card cursor-pointer relative overflow-hidden group">
                    <div class="thumbnail-wrapper mb-3 relative">
                        <img src="${video.thumbnail_url}" alt="${video.title}" class="w-full rounded-lg object-cover">
                        <span class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-0.5 rounded">
                            ${video.duration ? video.duration.toFixed(2) : "0.00"}
                        </span>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-transform duration-300">
                            <button class="text-white font-bold px-4 py-2 rounded-full bg-secondary-color bg-opacity-50" 
                                    onclick="window.location.href='display.html?id=${video.id}'">
                                    <i class="fa-solid fa-play"></i> 
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <div class="w-9 h-9 rounded-full overflow-hidden">
                            <img src="${profileImg}" alt="${video.uploader.username}">
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                                ${video.title}
                            </h3>
                            <p class="text-xs text-gray-600 dark:text-gray-400">${video.uploader.username}</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400"> 3k views • 2 days ago</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    // ${video.view_count} ,  ${timeAgo}
    // ---------- Fetch videos for sidebar ----------
    fetch("https://vstad-api.cheatdev.online/api/videos/?skip=0&limit=10")
        .then(res => res.json())
        .then(videos => {
            const urlParams = new URLSearchParams(window.location.search);
            const mainVideoId = urlParams.get("id");
            console.log("Main Video ID:", mainVideoId);

            // Exclude main video from sidebar
            const sidebarVideos = videos.videos.filter(v => v.id != mainVideoId);
            console.log("sidebarVideos:", sidebarVideos);
            

            // Display in sidebar
            displayVideos(sidebarVideos);
        })
        .catch(err => console.error("Error loading sidebar videos:", err));
});
// display in landing page
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = `https://vstad-api.cheatdev.online/api/videos/4`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(video => {
      const mainVideo = document.getElementById("mainVideo");

      // Option 1: set src directly on <video> (ignore <source>)
      mainVideo.src = video.video_url;

      // Reload video and play
      mainVideo.load();
      mainVideo.play().catch(err => console.warn("Autoplay blocked:", err));
    })
    .catch(err => console.error("Error fetching video:", err));
});



