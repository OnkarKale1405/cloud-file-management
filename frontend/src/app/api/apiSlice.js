import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../../redux/auth/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: "https://cloud-file-management.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error) {
        console.log("Sending refresh token");

        // Get the refresh token from state
        const refreshToken = api.getState().auth.refreshToken;
        // console.log(refreshToken);

        // Send the refresh token to get a new access token
        const refreshResult = await baseQuery({
            url: '/users/refresh-token',
            method: 'POST',
            body: { refreshToken } ,
        }, api, extraOptions);

        if (refreshResult?.data) {

            const accessToken = refreshResult.data.data.accessToken;
            if (!accessToken) {
                console.error("Access token is missing in the refresh response.");
            }

            const user = api.getState().auth.user;
            // Store the new token
            api.dispatch(setCredentials({ accessToken, user }));
            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else if (result?.error) {  // if we remove this condition then the user is forcefully logged out of the app if the second request fails.
            console.error('Request failed:', result.error);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})