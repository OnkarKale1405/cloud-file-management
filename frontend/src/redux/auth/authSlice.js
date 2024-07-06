import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        refreshToken: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            if (user !== undefined) state.user = user;
            if (accessToken !== undefined) state.token = accessToken;
            if (refreshToken !== undefined) state.refreshToken = refreshToken;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken;