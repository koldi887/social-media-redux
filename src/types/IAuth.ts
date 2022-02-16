export interface IAuthState {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  avatar: string | null;
  captchaUrl: null | string;
  loginErrors: Array<string | undefined>;
}

export interface IAuthSuccess {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

export interface ILoginData {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}