import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultCodeEnum } from "../api/api";
import { IUser } from "../types/IUser";
import { AppDispatch, RootState } from "./redux-store";
import { usersAPI } from "../api/users-api";

export interface IUsersState {
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
  totalUsersCount: 0,
};

interface IRequestUsers {
  items: IUser[];
  totalCount: number;
  error: null | string;
}

export const requestUsers = createAsyncThunk<
  IRequestUsers,
  { pageSize: number; currentPage: number }
>("Users/getUsers", async function ({ pageSize, currentPage }) {
  return await usersAPI.requestUsers(currentPage, pageSize);
});

export const followUnfollowUser = createAsyncThunk<
  void,
  { userId: number; followed: boolean },
  { dispatch: AppDispatch }
>(
  "Users/followUnfollowUser",
  async function ({ userId, followed }, { dispatch }) {
    dispatch(followingInProgress(userId));
    const response = followed
      ? await usersAPI.unfollowUser(userId)
      : await usersAPI.followUser(userId);
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(followUnfollowUserSuccess(userId));
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    followingInProgress(state, action: PayloadAction<number>) {
      state.followingInProgress.push(action.payload);
    },
    followUnfollowUserSuccess(state, action: PayloadAction<number>) {
      state.users.map((user) => {
        if (user.id === action.payload) {
          user.followed = !user.followed;
        }
        return user;
      });
      state.followingInProgress = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestUsers.pending, (state) => {
      state.users = [];
      state.isFetching = true;
    });

    builder.addCase(
      requestUsers.fulfilled,
      (state, action: PayloadAction<IRequestUsers>) => {
        const { items, totalCount } = action.payload;
        state.isFetching = false;
        state.users = items;
        state.totalUsersCount = totalCount;
      }
    );
  },
});

export const { followingInProgress, followUnfollowUserSuccess } =
  usersSlice.actions;
export const usersSelector = (state: RootState) => state.usersPage;
export default usersSlice.reducer;
