const baseUrl = "https://vstad-api.cheatdev.online/api/auth/login";

export async function signUp(email, username, password) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    })
    return await response.json();
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
}