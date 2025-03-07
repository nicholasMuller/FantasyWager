import { setCredentials } from "../../store/slices/authSlice";

export const refreshUserData = async (dispatch) => {
  try {
    const response = await fetch("/api/users/profile", {
      method: "GET",
      credentials: "include", // Ensures authentication cookies are included
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(setCredentials(data)); // ✅ Update Redux store with new user data
    } else {
      console.error("Error fetching user profile:", data.message);
    }
  } catch (error) {
    console.error("Failed to refresh user data:", error);
  }
};
