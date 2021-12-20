import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dialogsPageSlice from "./dialogpage-reducer";
import UsersSlice from "./users-reducer";
import appSlice from "./app-reducer";
import authSlice from "./auth-reducer";
import profileSlice from "./profile-reducer";

const rootReducer = combineReducers({
  profilePage: profileSlice,
  dialogsPage: dialogsPageSlice,
  usersPage: UsersSlice,
  auth: authSlice,
  app: appSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
