import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const filesAdapter = createEntityAdapter({
    selectId: file => file._id
});
const intialState = filesAdapter.getInitialState();

const filesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFiles: builder.mutation({
            query: (email) => ({
                url: '/users/getFile',
                method: 'POST',
                body: email
            }),
            transformResponse: response => {
                // console.log(response);
                return filesAdapter.setOne(intialState, {
                    files: response?.files || [],
                    user: response?.user || undefined
                });
            },
            providesTags: (result, error, args) =>
                result
                    ? [
                        { type: 'File', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'File', id })),
                    ]
                    : [{ type: 'File', id: 'LIST' }]
        }),
        deleteFile: builder.mutation({
            query: (secure_url) => ({
                url: '/users/deleteFile',
                method: 'POST',
                body: { secure_url }
            }),
            invalidatesTags: [{ type: 'File', id: 'LIST' }]
        })
    })
});

export const {
    useGetFilesMutation,
    useDeleteFileMutation
} = filesApiSlice;