// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcSDfF6Q1znMUZcctzcIh49GwrlkdJEqo",
  authDomain: "nodejsxfirebase-6dc04.firebaseapp.com",
  projectId: "nodejsxfirebase-6dc04",
  storageBucket: "nodejsxfirebase-6dc04.firebasestorage.app",
  messagingSenderId: "558403697904",
  appId: "1:558403697904:web:fc8fde8962bf1e46e65635",
  measurementId: "G-B1MHFC9JVL",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Auth State Observer
auth.onAuthStateChanged((user) => {
  console.log(
    "Auth state changed:",
    user ? "User signed in" : "User signed out"
  );

  console.log("user email: ", user?.email);
  if (user) {
    console.log("User details:", {
      uid: user.uid,
      email: user?.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    });
    showUserProfile(user);
  } else {
    hideUserProfile();
  }
});

// Sign In with Google
async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    showAlert("Signed in with Google!");
  } catch (error) {
    showAlert(getErrorMessage(error.code), "error");
  }
}


// Sign Out
async function signOut() {
  try {
    await auth.signOut();
    showAlert("Signed out successfully!");
  } catch (error) {
    showAlert("Failed to sign out", "error");
  }
}

// Send Email Verification
async function sendVerification() {
  try {
    const user = auth.currentUser.sendEmailVerification();
    console.log("user prepare to verification:", user);
    if (!user) {
      showAlert("No user is currently signed in", "error");
      return;
    }

    if (!user.email) {
      showAlert("User email is missing", "error");
      return;
    }

    if (user.emailVerified) {
      showAlert("Email is already verified!", "success");
      return;
    }

    // Action code settings for email verification
    const actionCodeSettings = {
      url: window.location.href, // Redirect back to this page
      handleCodeInApp: true,
    };

    await user.sendEmailVerification(actionCodeSettings);
    showAlert("Verification email sent! Please check your inbox.");
  } catch (error) {
    console.error("Verification error:", error);
    showAlert(`Failed to send verification email: ${error.message}`, "error");
  }
}

// Show User Profile
function showUserProfile(user) {
  document.getElementById("authCard").style.display = "none";
  document.getElementById("userProfile").classList.add("show");

  document.getElementById("userName").textContent =
    user.displayName || "Anonymous";
  document.getElementById("userEmail").textContent = user?.email;
  document.getElementById("userId").textContent = user.uid;

  // Avatar
  const avatarDiv = document.getElementById("userAvatar");
  if (user.photoURL) {
    avatarDiv.innerHTML = `<img src="${user.photoURL}" alt="Avatar">`;
  } else {
    avatarDiv.textContent = (user.displayName || user.email)
      .charAt(0)
      .toUpperCase();
  }

  // Email Verification
  const verifiedBadge = user.emailVerified
    ? '<span class="badge badge-success">Verified</span>'
    : '<span class="badge badge-warning">Not Verified</span>';
  document.getElementById("emailVerified").innerHTML = verifiedBadge;

  // Show/hide verification button
  document.getElementById("verifyBtn").style.display = user.emailVerified
    ? "none"
    : "block";

  // Dates
  if (user.metadata.creationTime) {
    document.getElementById("accountCreated").textContent = new Date(
      user.metadata.creationTime
    ).toLocaleString();
  }
  if (user.metadata.lastSignInTime) {
    document.getElementById("lastSignIn").textContent = new Date(
      user.metadata.lastSignInTime
    ).toLocaleString();
  }
}
// Hide User Profile
function hideUserProfile() {
  document.getElementById("authCard").style.display = "block";
  document.getElementById("userProfile").classList.remove("show");
}