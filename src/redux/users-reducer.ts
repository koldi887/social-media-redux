import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultCodeEnum, usersAPI } from "../api/Api";
import { IUser } from "../models/IUser";
import { AppDispatch, RootState } from "./redux-store";

interface IUsersState {
  users: IUser[];
  followingInProgress: Array<number>;
  isFetching: boolean;
  status: string;
  error: string;
}

const initialState: IUsersState = {
  users: [],
  followingInProgress: [],
  isFetching: true,
  status: "",
  error: "",
};

export const getUsers = createAsyncThunk<IUser[]>(
  "users/getUsers",
  async function () {
    return await usersAPI.getUsers();
  }
);

export const followUnfollowUser = createAsyncThunk<
  undefined | number,
  IUser,
  { dispatch: AppDispatch }
>("users/followUser", async function (user, { dispatch }) {
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
    builder.addCase(getUsers.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isFetching = false;
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
