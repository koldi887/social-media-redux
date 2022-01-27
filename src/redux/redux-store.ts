import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dialogsPageSlice from './dialogs-reducer';
import UsersSlice from './users-reducer';
import appSlice from './app-reducer';
import authSlice from './auth-reducer';
import profileSlice from './profile-reducer';
import chatSlice from './chat-reducer';
import { dialogsApi } from '../api/dialogs-api';

export const rootReducer = combineReducers({
  profilePage: profileSlice,
  dialogsPage: dialogsPageSlice,
  usersPage: UsersSlice,
  auth: authSlice,
  app: appSlice,
  chat: chatSlice,
  [dialogsApi.reducerPath]: dialogsApi.reducer,
});

const persistConfig = {
  key: 'redux',
  storage,
  whitelist: ['chat'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([dialogsApi.middleware]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
