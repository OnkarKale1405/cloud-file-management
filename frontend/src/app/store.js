import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../redux/auth/authSlice";
import filesReducer from "../redux/files/filesSlice"

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../redux/auth/authSlice";


// const rootReducer = combineReducers({
//     auth: authSlice
// });

// const persistConfig = {
//     key: 'root',
//     storage
// };

// export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        files: filesReducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    },
    devTools: true
})