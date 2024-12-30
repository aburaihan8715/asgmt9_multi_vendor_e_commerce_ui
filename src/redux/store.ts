import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import productFilterReducer from './features/product-filter-slice';

import { baseApi } from './api/baseApi';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Auth persist config
const authPersistConfig = {
  key: 'auth',
  storage, // Uses localStorage
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer,
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    productFilter: productFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER, // Ignore non-serializable Redux Persist actions
        ],
      },
    }).concat(baseApi.middleware),
});

// Persist store
export const reduxPersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
