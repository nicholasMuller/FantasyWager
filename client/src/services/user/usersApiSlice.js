import { apiSlice } from "../apiSlice";
import { setCredentials } from "../../store/slices/authSlice";

const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),
    placeBet: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/bets`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          console.log("🔹 Placing Bet...");
          await queryFulfilled; // ✅ Wait for bet to be placed

          console.log("🔄 Fetching updated user profile...");
          const response = await fetch(`${USERS_URL}/profile`, {
            method: "GET",
            credentials: "include",
          });

          const updatedUserData = await response.json();

          if (response.ok) {
            console.log("✅ User profile updated:", updatedUserData);
            dispatch(setCredentials(updatedUserData)); // ✅ Store full user info in Redux
          } else {
            console.error(
              "❌ Failed to refresh user data:",
              updatedUserData.message
            );
          }
        } catch (error) {
          console.error("❌ Error updating wallet after placing bet:", error);
        }
      },
    }),
    getBets: builder.query({
      query: () => ({
        url: `${USERS_URL}/bets`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  usePlaceBetMutation,
  useGetBetsQuery,
  useGetUserProfileQuery,
} = userApiSlice;
