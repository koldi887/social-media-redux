import { ResultCodeEnum } from "../../../api/api";
import { getUserProfile } from "../profileReducer/profile-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux-store";
import { authAPI, ILoginArgs } from "../../../api/auth-api";
import { securityAPI } from "../../../api/security-api";
import { IAuthState, IAuthSuccess } from "../../../types/IAuth";

export const getAuthUserData = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>("auth/getAuthUser", async function (_, { dispatch }) {
  const response = await authAPI.authMe();
  if (response.resultCode === ResultCodeEnum.success) {
    const { id, email, login } = response.data;
    dispatch(authSuccess({ id, email, login, isAuth: true }));
    dispatch(getUserProfile(id));
  }
});

export const login = createAsyncThunk<
  void,
  ILoginArgs,
  { dispatch: AppDispatch }
>("auth/Login", async function (data, { dispatch }) {
  const response = await authAPI.login(data);
  switch (response.resultCode) {
    case ResultCodeEnum.success:
      dispatch(getAuthUserData());
      dispatch(setCaptchaUrl(null));
      dispatch(setLoginErrors(response.messages));
      break;
    case ResultCodeEnum.captcha:
      dispatch(getCaptchaUrl());
      dispatch(setLoginErrors(response.messages));
      break;
    default:
      dispatch(setLoginErrors(response.messages));
  }
});

export const getCaptchaUrl = createAsyncThunk(
  "auth/getCaptchaUrl",
  async function (_, { dispatch }) {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(response.url));
  }
);

export const logOut = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  "auth/logOut",
  async function (_, { dispatch }) {
    const response = await authAPI.logOut();
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(
        authSuccess({
          id: null,
          email: null,
          login: null,
          isAuth: false,
        })
      );
    }
  }
);

const initialState: IAuthState = {
  id: null,
  email: null,
  login: null,
  avatar: null,
  isAuth: false,
  captchaUrl: null,
  loginErrors: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state, action: PayloadAction<IAuthSuccess>) => {
      const { id, email, login, isAuth } = action.payload;
      return {
        ...state,
        id,
        email,
        login,
        isAuth,
      };
    },
    setAuthUserAvatar: (state, action: PayloadAction<string | null>) => {
      state.avatar = action.payload;
    },
    setCaptchaUrl: (state, action: PayloadAction<string | null>) => {
      state.captchaUrl = action.payload;
    },
    setLoginErrors: (state, action: PayloadAction<string[]>) => {
      state.loginErrors = action.payload;
    },
  },
});

export const { authSuccess, setCaptchaUrl, setLoginErrors, setAuthUserAvatar } =
  authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export const authUserIdSelector = (state: RootState) => state.auth.id;

export default authSlice.reducer;
