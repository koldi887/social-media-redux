import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import dialogsPageSlice from "./reducers/dialogsReducer/dialogs-reducer";
import UsersSlice from "./reducers/usersReducer/users-reducer";
import appSlice from "./reducers/appReducer/app-reducer";
import authSlice from "./reducers/authReducer/auth-reducer";
import profileSlice from "./reducers/profileReducer/profile-reducer";
import chatSlice from "./reducers/chatReducer/chat-reducer";
import { dialogsApi } from "../api/dialogs-api";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

export const rootReducer = combineReducers({
  profilePage: profileSlice,
  dialogsPage: dialogsPageSlice,
  usersPage: UsersSlice,
  auth: authSlice,
  app: appSlice,
  chat: chatSlice,
  [dialogsApi.reducerPath]: dialogsApi.reducer,
  router: routerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware, dialogsApi.middleware),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];

export default store;