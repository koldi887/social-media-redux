import {IAPIResponse, instance} from "./api";

export interface IAuthMe {
  id: null | number;
  email: null | string;
  login: null | string;
  isAuth: null | boolean;
}

export interface ILoginArgs {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
}

export const authAPI = {
  authMe() {
    return instance
        .get<IAPIResponse<IAuthMe>>(`auth/me`)
        .then((response) => response.data);
  },

  login({email, password, rememberMe, captcha = ""}: ILoginArgs) {
    return instance
        .post<IAPIResponse<{ userId: number }>>(`auth/login`, {
          email,
          password,
          rememberMe,
          captcha,
        })
        .then((response) => response.data);
  },

  logOut() {
    return instance
        .delete<IAPIResponse<object>>(`auth/login`)
        .then((response) => response.data);
  },
};
