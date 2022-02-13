import { ResultCodeEnum } from "../../../api/api";
import { getUserProfile } from "../profileReducer/profile-reducer";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux-store";
import { authAPI, IAuthMe } from "../../../api/auth-api";
import { securityAPI } from "../../../api/security-api";

export interface IAuth {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  avatar: string | null;
  captchaUrl: null | string;
  errors: {
    loginErrors: Array<string | undefined>;
  };
}

interface Interface {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

export interface ILog {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}

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

export const login = createAsyncThunk<void, any, { dispatch: AppDispatch }>(
  "auth/Login",
  async function ({ email, password, rememberMe, captcha }, { dispatch }) {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(setCaptchaUrl(null));
      dispatch(getAuthUserData());
    }
    if (response.resultCode === ResultCodeEnum.captcha) {
      dispatch(getCaptchaUrl());
    }
    dispatch(setErrors(response.messages));
  }
);

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
    return;
  }
);

const initialState: IAuth = {
  id: null,
  email: null,
  login: null,
  avatar: null,
  isAuth: false,
  captchaUrl: null,
  errors: {
    loginErrors: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state, action: PayloadAction<Interface>) => {
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
    setErrors: (state, action) => {
      state.errors.loginErrors = action.payload;
    },
  },
});

export const { authSuccess, setCaptchaUrl, setErrors, setAuthUserAvatar } =
  authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export const authUserIdSelector = (state: RootState) => state.auth.id;

export default authSlice.reducer;
