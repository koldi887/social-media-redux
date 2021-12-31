import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultCodeEnum } from "../api/api";
import { IUser } from "../models/IUser";
import { AppDispatch, RootState } from "./redux-store";
import { usersAPI } from "../api/users-api";

interface IUsersState {
  users: IUser[];
  followingInProgress: Array<number>;
  isFetching: boolean;
  status: string;
  error: string;
  totalUsersCount: number;
}

const initialState: IUsersState = {
  users: [],
  followingInProgress: [],
  isFetching: true,
  status: "",
  error: "",
  totalUsersCount: 0
};

interface IRequestUsers {
  items: IUser[];
  totalCount: number;
  error: null | string;
}

export const requestUsers = createAsyncThunk<IRequestUsers,
  { pageSize: number; currentPage: number }>("users/getUsers", async function({ pageSize, currentPage }) {
  return await usersAPI.requestUsers(currentPage, pageSize);
});

export const followUnfollowUser = createAsyncThunk<undefined | number,
  IUser,
  { dispatch: AppDispatch }>("users/followUser", async function(user, { dispatch }) {
  dispatch(followingInProgress(user.id));
  const response = !user.followed
    ? await usersAPI.followUser(user.id)
    : await usersAPI.unfollowUser(user.id);
  if (response.resultCode === ResultCodeEnum.success) {
    return user.id;
  }
  return;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    followingInProgress(state, action: PayloadAction<number>) {
      state.followingInProgress.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestUsers.pending, (state) => {
      state.users = [];
      state.isFetching = true;
    });

    builder.addCase(requestUsers.fulfilled, (state, action: PayloadAction<IRequestUsers>) => {
      const { items, totalCount } = action.payload;

      state.isFetching = false;
      state.users = items;
      state.totalUsersCount = totalCount;
    });

    builder.addCase(followUnfollowUser.fulfilled, (state, action) => {
      state.users.map((user) => {
        if (user.id === action.payload) {
          user.followed = !user.followed;
        }
        return user;
      });
      state.followingInProgress = [];
    });
  },
});

export const { followingInProgress } = usersSlice.actions;
export const usersSelector = (state: RootState) => state.usersPage;
export default usersSlice.reducer;
