import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import authReducer from "../redux/features/auth/authSlice";

const persistConfig = {
    key: 'root',
    storage: localStorage,
}

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;