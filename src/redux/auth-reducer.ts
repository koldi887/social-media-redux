import { ResultCodeEnum } from '../api/api';
import { getUserProfile } from './profile-reducer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './redux-store';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';

export interface IAuth {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  avatar: null | string;
  captchaUrl: null | string;
  errors: {
    loginErrors: Array<string | undefined>;
  };
}

const initialState: IAuth = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  avatar: null,
  captchaUrl: null,
  errors: {
    loginErrors: [],
  },
};

export interface ILog {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}

export const getAuthUserData = createAsyncThunk<void, void, { state: RootState }>(
  'auth/getAuthUser',
  async function (_, { dispatch }) {
    const response = await authAPI.authMe();
    if (response.resultCode === ResultCodeEnum.success) {
      const { id, email, login } = response.data;
      dispatch(setAuthUserData({ id, email, login, isAuth: true }));
      dispatch(getUserProfile(id));
    }
  }
);

export const login = createAsyncThunk<void, any, { dispatch: AppDispatch }>(
  'auth/login',
  async function ({ email, password, rememberMe, captcha }, { dispatch }) {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(getAuthUserData());
      dispatch(setCaptchaUrl(null));
      dispatch(setErrors([]));
    }
    if (response.resultCode === ResultCodeEnum.captcha) {
      dispatch(getCaptchaUrl());
    }
    if (response.messages.length) {
      dispatch(setErrors(response.messages));
    }
  }
);

export const getCaptchaUrl = createAsyncThunk(
  'auth/getCaptchaUrl',
  async function (_, { dispatch }) {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(response.url));
  }
);

export const logOut = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'auth/logOut',
  async function (_, { dispatch }) {
    const response = await authAPI.logOut();
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(
        setAuthUserData({
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUserData: (state, action) => {
      const { id, email, login, isAuth } = action.payload;
      return {
        ...state,
        id,
        email,
        login,
        isAuth,
      };
    },

    setCaptchaUrl: (state, action: PayloadAction<string | null>) => {
      state.captchaUrl = action.payload;
    },
    setErrors: (state, action) => {
      state.errors.loginErrors = action.payload;
    },
    setAuthUserAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setAuthUserData, setCaptchaUrl, setErrors, setAuthUserAvatar } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
