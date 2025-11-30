// // "use strict"
// // // auth.js - Complete Authentication Management System
// // const AUTH = {
// //   // API Base URL - Update this to your actual API endpoint
// //   API_BASE_URL: 'https://vstad-api.cheatdev.online/api',
  
// //   // Save authentication token
// //   saveToken(token) {
// //     localStorage.setItem('access_token', token);
// //   },
  
// //   // Get saved token
// //   getToken() {
// //     return localStorage.getItem('access_token');
// //   },
  
// //   // Check if user is logged in
// //   isLoggedIn() {
// //     return this.getToken() !== null;
// //   },
  
// //   // Logout user
// //   logout() {
// //     localStorage.removeItem('access_token');
// //     localStorage.removeItem('user_profile');
// //     localStorage.removeItem('user'); // Also remove Firebase user data
// //     window.location.href = 'index.html';
// //   },
  
// //   // Save user profile data
// //   saveUserProfile(profile) {
// //     localStorage.setItem('user_profile', JSON.stringify(profile));
// //   },
  
// //   // Get user profile
// //   getUserProfile() {
// //     const profile = localStorage.getItem('user_profile');
// //     return profile ? JSON.parse(profile) : null;
// //   },
  
// //   // Register new user
// //   async register(username, email, password) {
// //     try {
// //       const response = await fetch(`${this.API_BASE_URL}/auth/register`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ username, email, password })
// //       });
      
// //       if (!response.ok) {
// //         const error = await response.json();
// //         throw new Error(error.message || 'Registration failed');
// //       }
      
// //       return await response.json();
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       throw error;
// //     }
// //   },
  
// //   // Login user
// //   async login(email, password) {
// //     try {
// //       const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password })
// //       });
      
// //       if (!response.ok) {
// //         const error = await response.json();
// //         throw new Error(error.message || 'Login failed');
// //       }
      
// //       const data = await response.json();
      
// //       // Save token
// //       this.saveToken(data.access_token || data.token);
      
// //       // Fetch and save user profile
// //       const profile = await this.fetchUserProfile();
// //       this.saveUserProfile(profile);
      
// //       return data;
// //     } catch (error) {
// //       console.error('Login error:', error);
// //       throw error;
// //     }
// //   },
  
// //   // Fetch user profile from API
// //   async fetchUserProfile() {
// //     try {
// //       const token = this.getToken();
// //       const response = await fetch(`${this.API_BASE_URL}/user/profile`, {
// //         method: 'GET',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });
      
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch profile');
// //       }
      
// //       return await response.json();
// //     } catch (error) {
// //       console.error('Profile fetch error:', error);
// //       throw error;
// //     }
// //   },
  
// //   // Make authenticated API request
// //   async apiRequest(endpoint, options = {}) {
// //     const token = this.getToken();
// //     const headers = {
// //       'Content-Type': 'application/json',
// //       ...options.headers
// //     };
    
// //     if (token) {
// //       headers['Authorization'] = `Bearer ${token}`;
// //     }
    
// //     try {
// //       const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
// //         ...options,
// //         headers
// //       });
      
// //       // Handle token expiration
// //       if (response.status === 401) {
// //         this.logout();
// //         throw new Error('Session expired. Please login again.');
// //       }
      
// //       if (!response.ok) {
// //         const error = await response.json();
// //         throw new Error(error.message || 'Request failed');
// //       }
      
// //       return await response.json();
// //     } catch (error) {
// //       console.error('API Request error:', error);
// //       throw error;
// //     }
// //   }
// // };

// // // Make AUTH available globally
// // window.AUTH = AUTH;

// // auth.js - Complete Authentication Management System
// const AUTH = {
//   // API Base URL - Update this to your actual API endpoint
//   API_BASE_URL: 'https://vstad-api.cheatdev.online/api',
  
//   // Save authentication token
//   saveToken(token) {
//     localStorage.setItem('access_token', token);
//   },
  
//   // Get saved token
//   getToken() {
//     return localStorage.getItem('access_token');
//   },
  
//   // Check if user is logged in
//   isLoggedIn() {
//     return this.getToken() !== null;
//   },
  
//   // Logout user
//   logout(redirectTo = 'home.html') {
//     // Clear all authentication data
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('user_profile');
//     localStorage.removeItem('user'); // Also remove Firebase user data
    
//     // Redirect to specified page (default: home page)
//     window.location.href = redirectTo;
//   },
  
//   // Save user profile data
//   saveUserProfile(profile) {
//     localStorage.setItem('user_profile', JSON.stringify(profile));
//   },
  
//   // Get user profile
//   getUserProfile() {
//     const profile = localStorage.getItem('user_profile');
//     return profile ? JSON.parse(profile) : null;
//   },
  
//   // Register new user
//   async register(username, email, password) {
//     try {
//       const response = await fetch(`${this.API_BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, email, password })
//       });
      
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Registration failed');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Registration error:', error);
//       throw error;
//     }
//   },
  
//   // Login user
//   async login(email, password) {
//     try {
//       const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
      
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Login failed');
//       }
      
//       const data = await response.json();
      
//       // Save token
//       this.saveToken(data.access_token || data.token);
      
//       // Fetch and save user profile
//       const profile = await this.fetchUserProfile();
//       this.saveUserProfile(profile);
      
//       return data;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   },
  
//   // Fetch user profile from API
//   async fetchUserProfile() {
//     try {
//       const token = this.getToken();
//       const response = await fetch(`${this.API_BASE_URL}/user/profile`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch profile');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Profile fetch error:', error);
//       throw error;
//     }
//   },
  
//   // Make authenticated API request
//   async apiRequest(endpoint, options = {}) {
//     const token = this.getToken();
//     const headers = {
//       'Content-Type': 'application/json',
//       ...options.headers
//     };
    
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     try {
//       const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
//         ...options,
//         headers
//       });
      
//       // Handle token expiration
//       if (response.status === 401) {
//         this.logout();
//         throw new Error('Session expired. Please login again.');
//       }
      
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Request failed');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('API Request error:', error);
//       throw error;
//     }
//   }
// };

// // Make AUTH available globally
// window.AUTH = AUTH;

// "use strict"
// // auth.js - Authentication Handler for VSTAD Platform
// // API: https://vstad-api.cheatdev.online/api/

// const AUTH = {
//     apiBaseUrl: 'https://vstad-api.cheatdev.online/api',

//     // Check if user is logged in
//     isLoggedIn() {
//         const token = localStorage.getItem('authToken') || localStorage.getItem('access_token');
//         const userId = localStorage.getItem('userId');
//         return token !== null && userId !== null;
//     },

//     // Get current user info
//     getCurrentUser() {
//         const userStr = localStorage.getItem('user');
//         if (userStr) {
//             return JSON.parse(userStr);
//         }
//         return null;
//     },

//     // Get auth token
//     getToken() {
//         return localStorage.getItem('authToken') || localStorage.getItem('access_token');
//     },

//     // Get user ID
//     getUserId() {
//         return localStorage.getItem('userId');
//     },

//     // Login with email and password
//     async login(email, password) {
//         try {
//             const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password
//                 })
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Login failed');
//             }

//             // Store authentication data
//             this.storeAuthData(data);

//             return data;

//         } catch (error) {
//             console.error('Login error:', error);
//             throw error;
//         }
//     },

//     // Register new user
//     async register(username, email, password) {
//         try {
//             const response = await fetch(`${this.apiBaseUrl}/auth/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: username,
//                     email: email,
//                     password: password
//                 })
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Registration failed');
//             }

//             // Store authentication data
//             this.storeAuthData(data);

//             return data;

//         } catch (error) {
//             console.error('Registration error:', error);
//             throw error;
//         }
//     },

//     // Store authentication data in localStorage
//     storeAuthData(data) {
//         // Store token
//         if (data.token || data.access_token) {
//             const token = data.token || data.access_token;
//             localStorage.setItem('authToken', token);
//             localStorage.setItem('access_token', token); // For compatibility
//         }

//         // Store user ID
//         if (data.user?.id || data.userId || data.id) {
//             const userId = data.user?.id || data.userId || data.id;
//             localStorage.setItem('userId', userId);
//         }

//         // Store user info
//         const userInfo = {
//             id: data.user?.id || data.userId || data.id,
//             name: data.user?.username || data.user?.full_name || data.username || data.name,
//             email: data.user?.email || data.email,
//             photo: data.user?.profile_image || data.user?.avatar || data.photo || null,
//             username: data.user?.username || data.username || null
//         };

//         localStorage.setItem('user', JSON.stringify(userInfo));
//         localStorage.setItem('username', userInfo.name || userInfo.username);
        
//         if (userInfo.photo) {
//             localStorage.setItem('userAvatar', userInfo.photo);
//         }
//     },

//     // Logout
//     logout() {
//         // Clear all authentication data
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('user');
//         localStorage.removeItem('username');
//         localStorage.removeItem('userAvatar');

//         // Redirect to home page
//         window.location.href = 'home.html';
//     },

//     // Update navbar with user profile (for home page)
//     updateNavbar() {
//         if (!this.isLoggedIn()) {
//             return;
//         }

//         const user = this.getCurrentUser();
//         if (!user) return;

//         // Find the Sign In button/link
//         const signInBtn = document.querySelector('a[href="sign_in.html"]');
        
//         if (signInBtn) {
//             // Replace Sign In button with user profile
//             signInBtn.outerHTML = `
//                 <div class="relative group">
//                     <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
//                         <img src="${user.photo || 'https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg'}" 
//                              alt="${user.name}" 
//                              class="w-8 h-8 rounded-full object-cover">
//                         <span class="hidden md:block text-sm font-medium text-gray-900 dark:text-white">${user.name}</span>
//                         <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//                         </svg>
//                     </button>
                    
//                     <!-- Dropdown Menu -->
//                     <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                         <div class="p-3 border-b border-gray-200 dark:border-gray-700">
//                             <p class="text-sm font-semibold text-gray-900 dark:text-white">${user.name}</p>
//                             <p class="text-xs text-gray-500 dark:text-gray-400">${user.email}</p>
//                         </div>
//                         <div class="py-2">
//                             <a href="profile.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                                 My Profile
//                             </a>
//                             <a href="favorites.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                                 My Favorites
//                             </a>
//                             <a href="settings.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                                 Settings
//                             </a>
//                             <hr class="my-2 border-gray-200 dark:border-gray-700">
//                             <button onclick="AUTH.logout()" class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
//                                 Sign Out
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         }
//     },

//     // Get user's activity stats
//     async getUserStats() {
//         if (!this.isLoggedIn()) {
//             return null;
//         }

//         try {
//             const token = this.getToken();
            
//             // Fetch all user's interactions
//             const [likedVideos, favorites, commentedVideos, sharedVideos] = await Promise.all([
//                 fetch(`${this.apiBaseUrl}/interactions/user/liked-videos?skip=0&limit=100`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }).then(r => r.json()),
                
//                 fetch(`${this.apiBaseUrl}/interactions/user/favorite-videos?skip=0&limit=100`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }).then(r => r.json()),
                
//                 fetch(`${this.apiBaseUrl}/interactions/user/commented-videos?skip=0&limit=100`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }).then(r => r.json()),
                
//                 fetch(`${this.apiBaseUrl}/interactions/user/shared-videos?skip=0&limit=100`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }).then(r => r.json())
//             ]);

//             return {
//                 totalLikes: likedVideos.total || likedVideos.videos?.length || 0,
//                 totalFavorites: favorites.total || favorites.videos?.length || 0,
//                 totalComments: commentedVideos.total || commentedVideos.videos?.length || 0,
//                 totalShares: sharedVideos.total || sharedVideos.videos?.length || 0,
//                 likedVideos: likedVideos.videos || [],
//                 favorites: favorites.videos || [],
//                 commentedVideos: commentedVideos.videos || [],
//                 sharedVideos: sharedVideos.videos || []
//             };

//         } catch (error) {
//             console.error('Error fetching user stats:', error);
//             return null;
//         }
//     },

//     // Verify token is still valid
//     async verifyToken() {
//         if (!this.isLoggedIn()) {
//             return false;
//         }

//         try {
//             const token = this.getToken();
//             const response = await fetch(`${this.apiBaseUrl}/auth/verify`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 // Token is invalid, clear auth data
//                 this.logout();
//                 return false;
//             }

//             return true;

//         } catch (error) {
//             console.error('Error verifying token:', error);
//             return false;
//         }
//     }
// };

// // Auto-update navbar on page load (for pages that need it)
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', () => {
//         AUTH.updateNavbar();
//     });
// } else {
//     AUTH.updateNavbar();
// }

// // Export for use in other files
// window.AUTH = AUTH;
/////////////// auth is not a function error fix ///////////////

// "use strict"
// // auth.js - Authentication Handler for VSTAD Platform
// // API: https://vstad-api.cheatdev.online/api/

// const AUTH = {
//     apiBaseUrl: 'https://vstad-api.cheatdev.online/api',

//     // Check if user is logged in
//     isLoggedIn() {
//         const token = localStorage.getItem('authToken') || localStorage.getItem('access_token');
//         const userId = localStorage.getItem('userId');
//         return token !== null && userId !== null;
//     },

//     // Get current user info
//     getCurrentUser() {
//         const userStr = localStorage.getItem('user');
//         if (userStr) {
//             return JSON.parse(userStr);
//         }
//         return null;
//     },

//     // Get auth token
//     getToken() {
//         return localStorage.getItem('authToken') || localStorage.getItem('access_token');
//     },

//     // Get user ID
//     getUserId() {
//         return localStorage.getItem('userId');
//     },

//     // Login with email and password
//     async login(email, password) {
//         try {
//             const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password
//                 })
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Login failed');
//             }

//             // Store authentication data
//             this.storeAuthData(data);

//             return data;

//         } catch (error) {
//             console.error('Login error:', error);
//             throw error;
//         }
//     },

//     // Register new user
//     async register(username, email, password) {
//         try {
//             const response = await fetch(`${this.apiBaseUrl}/auth/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: username,
//                     email: email,
//                     password: password
//                 })
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Registration failed');
//             }

//             // Store authentication data
//             this.storeAuthData(data);

//             return data;

//         } catch (error) {
//             console.error('Registration error:', error);
//             throw error;
//         }
//     },

//     // Login with Google (Firebase)
//     async loginWithGoogle(idToken, userInfo) {
//         try {
//             console.log('Google login with token:', idToken);
//             console.log('User info:', userInfo);

//             // Store the Firebase user data
//             this.storeAuthData({
//                 token: idToken,
//                 access_token: idToken,
//                 user: {
//                     id: userInfo.uid,
//                     username: userInfo.displayName,
//                     email: userInfo.email,
//                     profile_image: userInfo.photoURL
//                 }
//             });

//             // Optional: Send to your backend for verification
//             // Uncomment if you want to verify with your backend
//             /*
//             const response = await fetch(`${this.apiBaseUrl}/auth/google`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     idToken: idToken,
//                     userInfo: userInfo
//                 })
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Google login failed');
//             }

//             return data;
//             */

//             return { 
//                 success: true, 
//                 user: userInfo,
//                 token: idToken 
//             };

//         } catch (error) {
//             console.error('Google login error:', error);
//             throw error;
//         }
//     },

//     // Store authentication data in localStorage
//     storeAuthData(data) {
//         // Store token
//         if (data.token || data.access_token) {
//             const token = data.token || data.access_token;
//             localStorage.setItem('authToken', token);
//             localStorage.setItem('access_token', token); // For compatibility
//         }

//         // Store user ID
//         if (data.user?.id || data.userId || data.id) {
//             const userId = data.user?.id || data.userId || data.id;
//             localStorage.setItem('userId', userId);
//         }

//         // Store user info
//         const userInfo = {
//             id: data.user?.id || data.userId || data.id,
//             name: data.user?.username || data.user?.full_name || data.username || data.name,
//             email: data.user?.email || data.email,
//             photo: data.user?.profile_image || data.user?.avatar || data.photo || null,
//             username: data.user?.username || data.username || null
//         };

//         localStorage.setItem('user', JSON.stringify(userInfo));
//         localStorage.setItem('username', userInfo.name || userInfo.username);
        
//         if (userInfo.photo) {
//             localStorage.setItem('userAvatar', userInfo.photo);
//         }
//     },

//     // Logout
//     logout() {
//         // Clear all authentication data
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('user');
//         localStorage.removeItem('username');
//         localStorage.removeItem('userAvatar');

//         // Redirect to home page
//         window.location.href = 'home.html';
//     },

//     // Update navbar with user profile (for home page)
//     updateNavbar() {
//         if (!this.isLoggedIn()) {
//             return;
//         }

//         const user = this.getCurrentUser();
//         if (!user) return;

//         // Find the Sign In button/link
//         const signInBtn = document.querySelector('a[href="sign_in.html"]');
        
//         if (signInBtn) {
//             // Replace Sign In button with user profile
//             signInBtn.outerHTML = `
//                 <div class="relative group">
//                     <button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
//                         <img src="${user.photo || 'https://i.pinimg.com/736x/37/57/5a/37575a213755cad83bd408908623ba22.jpg'}" 
//                              alt="${user.name}" 
//                              class="w-8 h-8 rounded-full object-cover">
//                         <span class="hidden md:block text-sm font-medium text-gray-900 dark:text-white">${user.name}</span>
//                         <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//                         </svg>
//                     </button>
                    
//                     <!-- Dropdown Menu -->
//                     <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                         <div class="p-3 border-b border-gray-200 dark:border-gray-700">
//                             <p class="text-sm font-semibold text-gray-900 dark:text-white">${user.name}</p>
//                             <p class="text-xs text-gray-500 dark:text-gray-400">${user.email}</p>
//                         </div>
//                         <div class="py-2">
//                             <a href="profile.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                                 My Profile
//                             </a>
//                             <a href="favorites.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                                 My Favorites
//                             </a>
//                             <a href="settings.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
//                                 Settings
//                             </a>
//                             <hr class="my-2 border-gray-200 dark:border-gray-700">
//                             <button onclick="AUTH.logout()" class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
//                                 Sign Out
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         }
//     },

//     // Get user's activity stats
//     async getUserStats() {
//         if (!this.isLoggedIn()) {
//             return null;
//         }

//         try {
//             const token = this.getToken();
            
//             // Fetch all user's interactions
//             const [likedVideos, favorites, commentedVideos, sharedVideos] = await Promise.all([
//                 fetch(`${this.apiBaseUrl}/interactions/user/liked-videos?skip=0&limit=100`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }).then(r => r.json()),
                
//                 fetch(`${this.apiBaseUrl}/interactions/user/favorite-videos?skip=0&limit=100`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }).then(r => r.json()),
                
//                 fetch(`${this.apiBaseUrl}/interactions/user/commented-videos?skip=0&limit=100`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }).then(r => r.json()),
                
//                 fetch(`${this.apiBaseUrl}/interactions/user/shared-videos?skip=0&limit=100`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 }).then(r => r.json())
//             ]);

//             return {
//                 totalLikes: likedVideos.total || likedVideos.videos?.length || 0,
//                 totalFavorites: favorites.total || favorites.videos?.length || 0,
//                 totalComments: commentedVideos.total || commentedVideos.videos?.length || 0,
//                 totalShares: sharedVideos.total || sharedVideos.videos?.length || 0,
//                 likedVideos: likedVideos.videos || [],
//                 favorites: favorites.videos || [],
//                 commentedVideos: commentedVideos.videos || [],
//                 sharedVideos: sharedVideos.videos || []
//             };

//         } catch (error) {
//             console.error('Error fetching user stats:', error);
//             return null;
//         }
//     },

//     // Verify token is still valid
//     async verifyToken() {
//         if (!this.isLoggedIn()) {
//             return false;
//         }

//         try {
//             const token = this.getToken();
//             const response = await fetch(`${this.apiBaseUrl}/auth/verify`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 // Token is invalid, clear auth data
//                 this.logout();
//                 return false;
//             }

//             return true;

//         } catch (error) {
//             console.error('Error verifying token:', error);
//             return false;
//         }
//     }
// };

// // Auto-update navbar on page load (for pages that need it)
// // if (document.readyState === 'loading') {
// //     document.addEventListener('DOMContentLoaded', () => {
// //         AUTH.updateNavbar();
// //     });
// // } else {
// //     AUTH.updateNavbar();
// // }

// // Auto-update navbar on page load (for pages that need it)
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', () => {
//         AUTH.updateNavbar();
//         // Reinitialize mobile features after auth updates navbar
//         if (typeof window.reinitializeMobileFeatures === 'function') {
//             setTimeout(window.reinitializeMobileFeatures, 200);
//         }
//     });
// } else {
//     AUTH.updateNavbar();
//     // Reinitialize mobile features after auth updates navbar
//     if (typeof window.reinitializeMobileFeatures === 'function') {
//         setTimeout(window.reinitializeMobileFeatures, 200);
//     }
// }

// // Export for use in other files
// window.AUTH = AUTH;

"use strict"
// auth.js - Authentication Handler for VSTAD Platform
// API: https://vstad-api.cheatdev.online/api/

const AUTH = {
    apiBaseUrl: 'https://vstad-api.cheatdev.online/api',

    // Check if user is logged in
    isLoggedIn() {
        const token = localStorage.getItem('authToken') || localStorage.getItem('access_token');
        const userId = localStorage.getItem('userId');
        return token !== null && userId !== null;
    },

    // Get current user info
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    // Get auth token
    getToken() {
        return localStorage.getItem('authToken') || localStorage.getItem('access_token');
    },

    // Get user ID
    getUserId() {
        return localStorage.getItem('userId');
    },

    // Login with email and password
    async login(email, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store authentication data
            this.storeAuthData(data);

            return data;

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Register new user
    async register(username, email, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Store authentication data
            this.storeAuthData(data);

            return data;

        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    // Login with Google (Firebase)
    async loginWithGoogle(idToken, userInfo) {
        try {
            console.log('Google login with token:', idToken);
            console.log('User info:', userInfo);

            // Store the Firebase user data
            this.storeAuthData({
                token: idToken,
                access_token: idToken,
                user: {
                    id: userInfo.uid,
                    username: userInfo.displayName,
                    email: userInfo.email,
                    profile_image: userInfo.photoURL
                }
            });

            // Optional: Send to your backend for verification
            // Uncomment if you want to verify with your backend
            /*
            const response = await fetch(`${this.apiBaseUrl}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken: idToken,
                    userInfo: userInfo
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Google login failed');
            }

            return data;
            */

            return { 
                success: true, 
                user: userInfo,
                token: idToken 
            };

        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    },

    // Store authentication data in localStorage
    storeAuthData(data) {
        // Store token
        if (data.token || data.access_token) {
            const token = data.token || data.access_token;
            localStorage.setItem('authToken', token);
            localStorage.setItem('access_token', token); // For compatibility
        }

        // Store user ID
        if (data.user?.id || data.userId || data.id) {
            const userId = data.user?.id || data.userId || data.id;
            localStorage.setItem('userId', userId);
        }

        // Store user info
        const userInfo = {
            id: data.user?.id || data.userId || data.id,
            name: data.user?.username || data.user?.full_name || data.username || data.name,
            email: data.user?.email || data.email,
            photo: data.user?.profile_image || data.user?.avatar || data.photo || null,
            username: data.user?.username || data.username || null
        };

        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('username', userInfo.name || userInfo.username);
        
        if (userInfo.photo) {
            localStorage.setItem('userAvatar', userInfo.photo);
        }

        // ✅ Trigger navbar update after storing auth data
        if (typeof window.updateNavbar === 'function') {
            window.updateNavbar();
        }
    },

    // Logout
    logout(redirectPage = 'home.html') {
        // Clear all authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('access_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('profile');

        // Redirect to specified page
        window.location.href = redirectPage;
    },

    // Get user's activity stats
    async getUserStats() {
        if (!this.isLoggedIn()) {
            return null;
        }

        try {
            const token = this.getToken();
            
            // Fetch all user's interactions
            const [likedVideos, favorites, commentedVideos, sharedVideos] = await Promise.all([
                fetch(`${this.apiBaseUrl}/interactions/user/liked-videos?skip=0&limit=100`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(r => r.ok ? r.json() : { videos: [], total: 0 }),
                
                fetch(`${this.apiBaseUrl}/interactions/user/favorite-videos?skip=0&limit=100`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(r => r.ok ? r.json() : { videos: [], total: 0 }),
                
                fetch(`${this.apiBaseUrl}/interactions/user/commented-videos?skip=0&limit=100`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(r => r.ok ? r.json() : { videos: [], total: 0 }),
                
                fetch(`${this.apiBaseUrl}/interactions/user/shared-videos?skip=0&limit=100`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(r => r.ok ? r.json() : { videos: [], total: 0 })
            ]);

            return {
                totalLikes: likedVideos.total || likedVideos.videos?.length || 0,
                totalFavorites: favorites.total || favorites.videos?.length || 0,
                totalComments: commentedVideos.total || commentedVideos.videos?.length || 0,
                totalShares: sharedVideos.total || sharedVideos.videos?.length || 0,
                likedVideos: likedVideos.videos || [],
                favorites: favorites.videos || [],
                commentedVideos: commentedVideos.videos || [],
                sharedVideos: sharedVideos.videos || []
            };

        } catch (error) {
            console.error('Error fetching user stats:', error);
            return null;
        }
    },

    // Verify token is still valid
    async verifyToken() {
        if (!this.isLoggedIn()) {
            return false;
        }

        try {
            const token = this.getToken();
            const response = await fetch(`${this.apiBaseUrl}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                // Token is invalid, clear auth data
                this.logout();
                return false;
            }

            return true;

        } catch (error) {
            console.error('Error verifying token:', error);
            return false;
        }
    }
};

// Auto-update navbar on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Call navbar.js updateNavbar function if it exists
        if (typeof window.updateNavbar === 'function') {
            window.updateNavbar();
        }
    });
} else {
    // Call navbar.js updateNavbar function if it exists
    if (typeof window.updateNavbar === 'function') {
        window.updateNavbar();
    }
}

// Export for use in other files
window.AUTH = AUTH;