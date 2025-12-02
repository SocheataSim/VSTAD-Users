const AUTH = {
    apiBaseUrl: 'https://vstad-api.cheatdev.online/api',

    // Check if user is logged in
    isLoggedIn() {
        const token = localStorage.getItem('authToken') || localStorage.getItem('access_token');
        const userId = localStorage.getItem('userId') || localStorage.getItem('user_id');
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
        return localStorage.getItem('access_token');
    },

    // Get user ID
    getUserId() {
        return localStorage.getItem('userId') || localStorage.getItem('user_id');
    },

    // Login with email and password
    async login(email, password) {
        try {
            // Use application/json format for login
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'Login failed';
                if (data.detail) {
                    errorMessage = typeof data.detail === 'object' ? JSON.stringify(data.detail) : data.detail;
                } else if (data.message) {
                    errorMessage = typeof data.message === 'object' ? JSON.stringify(data.message) : data.message;
                }
                throw new Error(errorMessage);
            }

            // Response format: { access_token, user_data, token_type }
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
                throw new Error(data.detail || data.message || 'Registration failed');
            }

            // Registration response only returns user data (no access_token)
            // Response format: { id, username, email, full_name, profile_image, bio, is_active, role, created_at }
            //User needs to login after registration

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

            // Try to login with your backend using the Google credentials
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userInfo.email,
                    password: idToken.substring(0, 16)
                })
            });

            const data = await response.json();
            this.storeAuthData(data);
            return data;

        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    },

    // Store authentication data in localStorage  
    storeAuthData(data) {
        console.log('Storing auth data:', data);

        // Handle different response formats
        const token = data.token || data.access_token;
        const tokenType = data.token_type || 'Bearer';
        const userData = data.user_data || data.user;

        if (token) {
            localStorage.setItem('authToken', token);
            localStorage.setItem('access_token', token);
            localStorage.setItem('token_type', tokenType);
        }

        // Store user ID
        if (userData) {
            const userId = userData.id || data.userId || data.id;
            if (userId) {
                localStorage.setItem('userId', userId);
                localStorage.setItem('user_id', userId);
            }

            // Store complete user info
            const userInfo = {
                id: userData.id,
                username: userData.username,
                email: userData.email,
                full_name: userData.full_name || userData.username,
                profile_image: userData.profile_image || userData.avatar || null,
                bio: userData.bio || null,
                role: userData.role || 'user',
                is_active: userData.is_active !== undefined ? userData.is_active : true,
                created_at: userData.created_at || new Date().toISOString()
            };

            localStorage.setItem('user', JSON.stringify(userInfo));
            localStorage.setItem('username', userInfo.username);
            localStorage.setItem('email', userInfo.email);

            if (userInfo.profile_image) {
                localStorage.setItem('userAvatar', userInfo.profile_image);
            }
            // Also sync with userProfile for navbar profile image display
            const existingUserProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            const updatedUserProfile = {
                ...existingUserProfile,
                full_name: userInfo.full_name,
                bio: userInfo.bio,
                profile_image: userInfo.profile_image
            };
            localStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));
        }

        // Trigger navbar update after storing auth data
        if (typeof window.updateNavbar === 'function') {
            setTimeout(() => window.updateNavbar(), 100);
        }

        console.log('Auth data stored successfully');
    },

    // Logout
    logout(redirectPage = 'home.html') {
        // Clear all authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('userId');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
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
        if (typeof window.updateNavbar === 'function') {
            window.updateNavbar();
        }
    });
} else {
    if (typeof window.updateNavbar === 'function') {
        window.updateNavbar();
    }
}

// Export for use in other files
window.AUTH = AUTH;