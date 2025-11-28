// Get elements
        const editProfileBtn = document.getElementById('editProfileBtn');
        const editProfileModal = document.getElementById('editProfileModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const saveChangesBtn = document.getElementById('saveChangesBtn');
        const changePhotoBtn = document.getElementById('changePhotoBtn');
        const photoInput = document.getElementById('photoInput');
        const profilePreview = document.getElementById('profilePreview');
        const nameInput = document.getElementById('nameInput');
        const bioInput = document.getElementById('bioInput');
        const profileName = document.getElementById('profileName');
        const profileBio = document.getElementById('profileBio');
        const profileImage = document.getElementById('profileImage');
        const navProfileImage = document.getElementById('navProfileImage');
        const successToast = document.getElementById('successToast');
        const menuButton = document.getElementById('menuButton');
        const menuDropdown = document.getElementById('menuDropdown');

        // Open modal
        editProfileBtn.addEventListener('click', () => {
            editProfileModal.classList.remove('hidden');
            nameInput.value = profileName.textContent;
            bioInput.value = profileBio.textContent;
            profilePreview.src = profileImage.src;
            document.body.style.overflow = 'hidden';
        });

        // Close modal function
        function closeModal() {
            editProfileModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // Close modal events
        closeModalBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        // Close when clicking outside
        editProfileModal.addEventListener('click', (e) => {
            if (e.target === editProfileModal) closeModal();
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !editProfileModal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // Change photo
        changePhotoBtn.addEventListener('click', () => {
            photoInput.click();
        });

        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert('File size must be less than 2MB');
                    return;
                }
                if (!file.type.match('image.*')) {
                    alert('Please select an image file');
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Save changes
        saveChangesBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            const bio = bioInput.value.trim();

            if (!name) {
                alert('Name is required');
                nameInput.focus();
                return;
            }
            if (bio.length > 150) {
                alert('Bio must be 150 characters or less');
                bioInput.focus();
                return;
            }

            // Update profile
            profileName.textContent = name;
            profileBio.textContent = bio;
            profileImage.src = profilePreview.src;
            navProfileImage.src = profilePreview.src;

            closeModal();

            // Show success toast
            successToast.classList.remove('hidden');
            setTimeout(() => {
                successToast.classList.add('hidden');
            }, 3000);
        });

        // Menu toggle
        menuButton.addEventListener('click', () => {
            menuDropdown.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuButton.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.add('hidden');
            }
        });