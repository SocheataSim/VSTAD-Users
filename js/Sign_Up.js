



const baseUrl = "https://vstad-api.cheatdev.online/api/auth/register";

export async function signUp(email, username, password) {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    })
    return await response.json();
    } catch (error) {
        console.error("Sign Up Error:", error);
        throw error;
    }
}