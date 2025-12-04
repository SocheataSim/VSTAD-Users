//  CONFIG

const BASE_URL = "https://vstad-api.cheatdev.online/api";


let bearerToken = localStorage.getItem('access_token') || localStorage.getItem('authToken');
const DEBUG = true;

function debugLog(...args) {
    if (DEBUG) {
        console.log("🔍 [DEBUG]", ...args);
    }
}

const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const htmlElement = document.documentElement;

let currentTheme = 'light';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlElement.classList.add('dark');
    currentTheme = 'dark';
    themeToggleLightIcon.classList.remove('hidden');
} else {
    htmlElement.classList.remove('dark');
    currentTheme = 'light';
    themeToggleDarkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function() {
    if (currentTheme === 'light') {
        htmlElement.classList.add('dark');
        currentTheme = 'dark';
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    } else {
        htmlElement.classList.remove('dark');
        currentTheme = 'light';
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    }
});

//  MENU TOGGLE

const menuButton = document.getElementById('menuButton');
const menuDropdown = document.getElementById('menuDropdown');

menuButton.addEventListener('click', function() {
    menuDropdown.classList.toggle('hidden');
});

document.addEventListener('click', function(event) {
    const menuContainer = document.getElementById('menuContainer');
    if (!menuContainer.contains(event.target)) {
        menuDropdown.classList.add('hidden');
    }
});

//  LOAD USER PROFILE
async function loadProfile() {
    try {
        
        
        if (bearerToken) {
            try {
                const userId = localStorage.getItem('userId') || localStorage.getItem('user_id');
                
                if (!userId) {
                    console.warn("⚠️ No user ID found. Using localStorage fallback.");
                    throw new Error("NO_USER_ID");
                }
                
                console.log("📤 Fetching profile from API for user:", userId);
                
                const res = await fetch(`https://vstad-api.cheatdev.online/api/admin/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`,
                        'Accept': 'application/json'
                    }
                });

                console.log("📥 Profile API response status:", res.status);

                if (res.status === 404) {
                    console.warn("⚠️ User not found in API. Using localStorage fallback.");
                    throw new Error("ENDPOINT_NOT_FOUND");
                }

                if (res.status === 401) {
                    console.warn("⚠️ Authentication failed. Token may be invalid. Using localStorage fallback.");
                    throw new Error("AUTH_FAILED");
                }

                if (!res.ok) {
                    throw new Error(`Failed to fetch profile: ${res.status}`);
                }

                const profileData = await res.json();
                console.log("✅ Profile loaded from API:", profileData);
                debugLog("API Response:", profileData);

                // Save to localStorage as cache
                const cacheData = {
                    full_name: profileData.full_name,
                    bio: profileData.bio,
                    profile_image: profileData.profile_image 
                };
                localStorage.setItem('userProfile', JSON.stringify(cacheData));

                updateProfileUI(profileData);
                return;

            } catch (apiError) {
                if (apiError.message !== "ENDPOINT_NOT_FOUND" && apiError.message !== "AUTH_FAILED") {
                    console.error("API Error:", apiError);
                }
            }
        }

        // OPTION 2: Load from localStorage (FALLBACK)
        console.log("💾 Loading profile from localStorage");
        
        const savedProfile = localStorage.getItem('userProfile');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        
        let profileData;
        
        if (savedProfile) {
            profileData = JSON.parse(savedProfile);
            console.log("✅ Profile loaded from localStorage:", profileData);
        } else {
            // Default mock data with user/profile fallback
            profileData = {
                full_name: user.full_name || user.name || user.username || profile.username || profile.name || "Lut Lina",
                bio: user.bio || profile.bio || "Content creator and video enthusiast",
                profile_image: user.profile_image || profile.profile_image || null 
            };
            console.log("⚠️ No saved profile. Using default data.");
        }

        // Update UI with localStorage data
        updateProfileUI(profileData);

    } catch (err) {
        console.error("Failed to load profile:", err);
        showToast("Failed to load profile", "error");
    }
}

// Helper function to update profile UI
function updateProfileUI(profileData) {
    // Get name for display and avatar generation
    const displayName = profileData.full_name || "User";
    
    // Update text fields
    document.getElementById("profileName").textContent = displayName;
    document.getElementById("profileBio").textContent = profileData.bio || "No bio";
    
    // Generate profile image URL with dynamic avatar fallback
    let profileImageUrl;
    if (profileData.profile_image) {
        // Use the API endpoint to get the image
        profileImageUrl = `https://vstad-api.cheatdev.online/api/profile/profile-image/${profileData.profile_image}`;
    } else {
        // Fallback to dynamic avatar with user initials
        profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e40af&color=fff`;
    }
    
    // Update all profile images with error fallback to dynamic avatar
    const profileImage = document.getElementById("profileImage");
    const navProfileImage = document.getElementById("navProfileImage");
    const profilePreview = document.getElementById("profilePreview");
    
    profileImage.src = profileImageUrl;
    profileImage.onerror = function() {
        this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e40af&color=fff`;
    };
    
    navProfileImage.src = profileImageUrl;
    navProfileImage.onerror = function() {
        this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e40af&color=fff`;
    };
    
    profilePreview.src = profileImageUrl;
    profilePreview.onerror = function() {
        this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e40af&color=fff`;
    };

    // Modal fields
    document.getElementById("nameInput").value = profileData.full_name || "";
    document.getElementById("bioInput").value = profileData.bio || "";

    debugLog("Profile UI updated with:", profileData);
}

//  LOAD VIDEOS BY TYPE
let currentTab = 'liked';

async function loadVideos(type) {
    if (!bearerToken || bearerToken === "YOUR_TOKEN_HERE") {
        console.warn("No bearer token set. Please authenticate first.");
        displayEmptyState(type);
        showToast("Please login to view your videos", "error");
        return;
    }

    try {
        let endpoint = '';
        
        switch(type) {
            case 'liked':
                endpoint = `${BASE_URL}/interactions/user/liked-videos?skip=0&limit=20`;
                break;
            case 'shared':
                endpoint = `${BASE_URL}/interactions/user/shared-videos?skip=0&limit=20`;
                break;
            case 'favorited':
                endpoint = `${BASE_URL}/interactions/user/favorite-videos?skip=0&limit=20`;
                break;
            default:
                endpoint = `${BASE_URL}/interactions/user/liked-videos?skip=0&limit=20`;
        }

        const res = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Accept': 'application/json'
            }
        });

        if (res.status === 401) {
            throw new Error("Authentication failed. Please login again.");
        }

        if (!res.ok) {
            throw new Error(`Failed to fetch ${type} videos: ${res.status}`);
        }
        
        const data = await res.json();
    
        const videos = data.map(item => item.video);
        displayVideos(videos);

    } catch (err) {
        console.error(`Failed to load ${type} videos:`, err);
        displayEmptyState(type);
        showToast(err.message, "error");
    }
}

//  DISPLAY VIDEOS IN GRID
function displayVideos(videos) {
    const videoGrid = document.querySelector('.grid');
    
    if (!videos || videos.length === 0) {
        videoGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <p class="text-gray-500 dark:text-gray-400 text-lg">No videos found</p>
            </div>
        `;
        return;
    }

    videoGrid.innerHTML = videos.map(video => {
        const thumbnailUrl = video.thumbnail_url; 
        
        // Generate uploader name for avatar
        const uploaderName = video.uploader?.username || video.uploader?.full_name || 'Unknown';
        
        let uploaderImageUrl;
        if (video.uploader?.profile_image) {
            uploaderImageUrl = `https://vstad-api.cheatdev.online/api/profile/profile-image/${video.uploader.profile_image}`;
        } else {
            // Use dynamic avatar with uploader's name
            uploaderImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(uploaderName)}&background=1e40af&color=fff`;
        }
        
        const videoUrl = video.video_url || `video-detail.html?id=${video.id}`;

        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer" onclick="window.location.href='${videoUrl}'">
                <div class="relative aspect-video bg-gray-200 dark:bg-gray-700">
                    <img src="${thumbnailUrl}" 
                         alt="${video.title || 'Video'}" 
                         class="w-full h-full object-cover"
                         onerror="this.src='../../pages/images/default-thumbnail.jpg'">
                    ${video.duration ? `
                        <span class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                            ${formatDuration(video.duration)}
                        </span>
                    ` : ''}
                </div>
                <div class="p-4">
                    <div class="flex items-start space-x-3">
                        <img src="${uploaderImageUrl}" 
                             alt="${uploaderName}" 
                             class="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(uploaderName)}&background=1e40af&color=fff'">
                        
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                                ${video.title || 'Untitled Video'}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                ${uploaderName}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-500">
                                ${formatViews(video.view_count)} views • ${formatDate(video.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

//  EMPTY STATE
function displayEmptyState(type) {
    const videoGrid = document.querySelector('.grid');
    const messages = {
        liked: 'You haven\'t liked any videos yet',
        shared: 'You haven\'t shared any videos yet',
        favorited: 'You haven\'t added any videos to favorites yet'
    };
    
    videoGrid.innerHTML = `
        <div class="col-span-full text-center py-12">
            <svg class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <p class="text-gray-500 dark:text-gray-400 text-lg">${messages[type]}</p>
        </div>
    `;
}

//  UTILITY FUNCTIONS
function formatDuration(seconds) {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatViews(views) {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
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

//  TAB HANDLING
function setupTabs() {
    const tabs = document.querySelectorAll('.flex.space-x-8 button');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => {
                t.classList.remove('border-b-2', 'border-red-600', 'text-gray-900', 'dark:text-white');
                t.classList.add('text-gray-500', 'dark:text-gray-400');
            });
            
            this.classList.add('border-b-2', 'border-red-600', 'text-gray-900', 'dark:text-white');
            this.classList.remove('text-gray-500', 'dark:text-gray-400');
            
            const types = ['liked', 'shared', 'favorited'];
            currentTab = types[index];
            loadVideos(currentTab);
        });
    });
    
    if (tabs[0]) {
        tabs[0].classList.add('border-b-2', 'border-red-600', 'text-gray-900', 'dark:text-white');
        tabs[0].classList.remove('text-gray-500', 'dark:text-gray-400');
    }
}

//  MODAL HANDLERS
document.getElementById("editProfileBtn").onclick = () => {
    document.getElementById("editProfileModal").classList.remove("hidden");
};

document.getElementById("closeModalBtn").onclick =
document.getElementById("cancelBtn").onclick = () => {
    document.getElementById("editProfileModal").classList.add("hidden");
};

//  IMAGE UPLOAD & PREVIEW
let selectedImageFile = null;

document.getElementById("changePhotoBtn").onclick = () => {
    document.getElementById("photoInput").click();
};

document.getElementById("photoInput").onchange = function () {
    const file = this.files[0];
    if (!file) return;

    debugLog("File selected:", {
        name: file.name,
        size: file.size,
        type: file.type
    });

    if (file.size > 2 * 1024 * 1024) {
        showToast("Image size must be less than 2MB", "error");
        console.error("❌ File too large:", (file.size / 1024 / 1024).toFixed(2) + "MB");
        return;
    }

    if (!file.type.startsWith('image/')) {
        showToast("Please select a valid image file", "error");
        console.error("❌ Invalid file type:", file.type);
        return;
    }

    selectedImageFile = file;
    console.log("✅ Image selected for upload:", file.name);

    const reader = new FileReader();
    reader.onload = () => {
        document.getElementById("profilePreview").src = reader.result;
        debugLog("Preview updated");
    };
    reader.readAsDataURL(file);
};

//  SAVE PROFILE

document.getElementById("saveChangesBtn").onclick = async () => {
    const name = document.getElementById("nameInput").value.trim();
    const bio = document.getElementById("bioInput").value.trim();

    if (!name) {
        showToast("Name is required", "error");
        return;
    }

    if (bio.length > 150) {
        showToast("Bio must be 150 characters or less", "error");
        return;
    }

    if (!bearerToken || bearerToken === "YOUR_TOKEN_HERE") {
        showToast("Please login to edit your profile", "error");
        console.warn("⚠️ No bearer token set. Set bearerToken = 'your_token' at line 9");
        return;
    }

    try {
        let imageUpdated = false;
        let profileUpdated = false;

        // STEP 1: UPLOAD PROFILE IMAGE 
        if (selectedImageFile) {
            console.log("📤 Uploading profile image...");
            
            const formData = new FormData();
            formData.append('file', selectedImageFile);

            const uploadRes = await fetch('https://vstad-api.cheatdev.online/api/profile/me/upload-profile-image', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`
                },
                body: formData
            });

            console.log("📥 Upload response status:", uploadRes.status);

            if (uploadRes.status === 401) {
                throw new Error("Authentication failed. Your token may be expired. Please login again.");
            }

            if (uploadRes.status === 422) {
                const errorData = await uploadRes.json().catch(() => ({}));
                console.error("Validation error:", errorData);
                throw new Error("Invalid file format. Please use JPG, PNG or GIF.");
            }

            if (!uploadRes.ok) {
                const errorText = await uploadRes.text();
                console.error("Upload error:", errorText);
                throw new Error(`Failed to upload profile image (Status: ${uploadRes.status})`);
            }

            const uploadData = await uploadRes.json();
            console.log("✅ Profile image uploaded successfully:", uploadData);
            debugLog("API Response:", uploadData);
            imageUpdated = true;

            let newImageFilename;
            
            if (uploadData.profile_image) {
                newImageFilename = uploadData.profile_image;
            } else if (uploadData.filename) {
                newImageFilename = uploadData.filename;
            } else if (uploadData.file_name) {
                newImageFilename = uploadData.file_name;
            } else if (uploadData.url) {
                const urlParts = uploadData.url.split('/');
                newImageFilename = urlParts[urlParts.length - 1];
            }

            console.log("📁 Image filename:", newImageFilename);

            const newImageUrl = `https://vstad-api.cheatdev.online/api/profile/profile-image/${newImageFilename}`;
            
            document.getElementById("profileImage").src = newImageUrl;
            document.getElementById("navProfileImage").src = newImageUrl;
            document.getElementById("profilePreview").src = newImageUrl;
        }

        // STEP 2: UPDATE NAME & BIO
        
        
        try {
            console.log("📤 Updating profile name and bio...");
            
            const updateRes = await fetch('https://vstad-api.cheatdev.online/api/profile/me', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    full_name: name,
                    bio: bio
                })
            });

            console.log("📥 Update profile response status:", updateRes.status);

            if (updateRes.status === 401) {
                throw new Error("Authentication failed. Please login again.");
            }

            if (updateRes.status === 404) {
                console.warn("⚠️ PUT /api/profile/me endpoint not found. Using localStorage fallback.");
                throw new Error("ENDPOINT_NOT_FOUND");
            }

            if (!updateRes.ok) {
                const errorData = await updateRes.json().catch(() => ({}));
                console.error("Update error:", errorData);
                throw new Error(errorData.detail || `Failed to update profile (Status: ${updateRes.status})`);
            }

            const updateData = await updateRes.json();
            console.log("✅ Profile name/bio updated successfully:", updateData);
            debugLog("API Response:", updateData);
            profileUpdated = true;

            document.getElementById("profileName").textContent = updateData.full_name || name;
            document.getElementById("profileBio").textContent = updateData.bio || bio;

            const profileData = {
                full_name: updateData.full_name || name,
                bio: updateData.bio || bio,
                profile_image: document.getElementById("profileImage").src.split('/').pop()
            };
            localStorage.setItem('userProfile', JSON.stringify(profileData));

        } catch (apiError) {
            // STEP 2 FALLBACK: Save to localStorage
            if (apiError.message === "ENDPOINT_NOT_FOUND" || apiError.message.includes("Failed to fetch")) {
                console.log("💾 Saving profile to localStorage (API endpoint not available)");
                
                const profileData = {
                    full_name: name,
                    bio: bio,
                    profile_image: document.getElementById("profileImage").src.split('/').pop()
                };
                localStorage.setItem('userProfile', JSON.stringify(profileData));
                
                // Update UI
                document.getElementById("profileName").textContent = name;
                document.getElementById("profileBio").textContent = bio;
                
                profileUpdated = true;
                console.log("✅ Profile saved to localStorage:", profileData);
            } else {
                // Re-throw if it's a different error
                throw apiError;
            }
        }

        // STEP 3: Show success message
        if (imageUpdated && profileUpdated) {
            showToast("Profile updated successfully!", "success");
        } else if (imageUpdated) {
            showToast("Profile image updated successfully!", "success");
        } else if (profileUpdated) {
            showToast("Profile information updated successfully!", "success");
        }

        // Close modal and reset
        document.getElementById("editProfileModal").classList.add("hidden");
        selectedImageFile = null;

    } catch (err) {
        console.error("❌ Error saving profile:", err);
        showToast(err.message || "Error saving profile", "error");
    }
};

//  TOAST NOTIFICATION
function showToast(message, type = "success") {
    const toast = document.getElementById("successToast");
    
    if (type === "error") {
        toast.classList.remove("bg-green-500");
        toast.classList.add("bg-red-500");
    } else {
        toast.classList.remove("bg-red-500");
        toast.classList.add("bg-green-500");
    }
    
    const messageSpan = toast.querySelector("span");
    if (messageSpan) {
        messageSpan.textContent = message;
    }
    
    toast.classList.remove("hidden");
    
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}

//  INITIALIZE ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    setupTabs();
    loadVideos('liked');
});