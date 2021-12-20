import { authAPI, ResultCodeEnum } from "../api/Api";
import { getUserProfile } from "./profile-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./redux-store";

interface IAuth {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

const initialState: IAuth = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

export interface ILog {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const getAuthUserData = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>("auth/getAuthUser", async function (_, { dispatch }) {
  const response = await authAPI.authMe();
  if (response.resultCode === ResultCodeEnum.success) {
    const { id, email, login } = response.data;
    dispatch(setUserData({ id, email, login, isAuth: true }));
    dispatch(getUserProfile(id));
  }
  return;
});

export const login = createAsyncThunk<void, ILog, { dispatch: AppDispatch }>(
  "auth/login",
  async function ({ email, password, rememberMe }, { dispatch }) {
    const response = await authAPI.login(email, password, rememberMe);
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(getAuthUserData());
    }
    return;
  }
);

export const logOut = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  "auth/logOut",
  async function (_, { dispatch }) {
    const response = await authAPI.logOut();
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(
        setUserData({ id: null, email: null, login: null, isAuth: false })
      );
    }
    return;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IAuth>) => {
      const { id, email, login, isAuth } = action.payload;
      return {
        ...state,
        id,
        email,
        login,
        isAuth,
      };
    },
  },
});

export const { setUserData } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
