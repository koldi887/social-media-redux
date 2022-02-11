import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultCodeEnum } from '../../../api/api';
import { IUser } from '../../../types/IUser';
import { AppDispatch, RootState } from '../../redux-store';
import { usersAPI } from '../../../api/users-api';

export interface IUsersState {
  users: IUser[];
  followingInProgress: Array<number>;
  isFetching: boolean;
  status: string;
  error: string;
  pageSize: number;
  currentPage: number;
  totalUsersCount: number;
  filter: {
    term: string;
    friend: null | boolean;
  };
}

interface IRequestResponse {
  items: IUser[];
  totalCount: number;
  error: null | string;
}

export const requestUsers = createAsyncThunk<
  IRequestResponse,
  {
    pageSize: number;
    page: number;
    filter: FilterType;
  }
>('Users/requestUsers', async function ({ pageSize, page, filter }, { dispatch }) {
  dispatch(setCurrentPage(page));
  dispatch(setFilter(filter));
  return await usersAPI.requestUsers(page, pageSize, filter.term, filter.friend);
});

export const followUnfollowUser = createAsyncThunk<
  void,
  { userId: number; followed: boolean },
  { dispatch: AppDispatch }
>('Users/followUnfollowUser', async function ({ userId, followed }, { dispatch }) {
  dispatch(followingInProgress(userId));
  const response = followed
    ? await usersAPI.unfollowUser(userId)
    : await usersAPI.followUser(userId);
  if (response.resultCode === ResultCodeEnum.success) {
    dispatch(followUnfollowUserSuccess(userId));
  }
});

const initialState: IUsersState = {
  users: [],
  followingInProgress: [],
  isFetching: true,
  status: '',
  error: '',
  pageSize: 15,
  currentPage: 1,
  totalUsersCount: 0,
  filter: {
    term: '',
    friend: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
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
    setFilter(state, action: PayloadAction<FilterType>) {
      state.filter = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestUsers.pending, (state) => {
      state.users = [];
      state.isFetching = true;
    });

    builder.addCase(requestUsers.fulfilled, (state, action: PayloadAction<IRequestResponse>) => {
      const { items, totalCount } = action.payload;
      state.isFetching = false;
      state.users = items;
      state.totalUsersCount = totalCount;
    });
  },
});

export const { followingInProgress, followUnfollowUserSuccess, setFilter, setCurrentPage } =
  usersSlice.actions;
export const usersSelector = (state: RootState) => state.usersPage;
export default usersSlice.reducer;
export type FilterType = typeof initialState.filter;
