import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const authAdapter = createEntityAdapter({
    selectId: user => user
});
const initialState = authAdapter.getInitialState({});

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: credentials
            }),
            transformResponse: response => {
                // console.log(response);
                return authAdapter.setOne(initialState, response.data);
            },
            providesTags: (result, error, arg) => [
                { type: 'USER', id: result?._id || 'UNKNOWN' }
            ]
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/users/register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, args) => [
                { type: "USER", id: args._id }
            ]
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST'
            })
        }),
        refresh: builder.mutation({
            query: (refreshToken) => ({
                url: '/users/refresh-token',
                method: 'POST',
                body: { refreshToken }
            })
        }),
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshMutation
} = authApiSlice;
