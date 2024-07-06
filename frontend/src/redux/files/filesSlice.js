import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
    name: "files",
    initialState: {
        files: [],
        user: {}
    },
    reducers: {
        addFiles: (state, action) => {
            const { files, user } = action.payload;
            state.files = files;
            state.user = user || {};
        }
    }
})

export const { addFiles } = filesSlice.actions;

export default filesSlice.reducer;

export const selectAllFiles = state => state.files.files;