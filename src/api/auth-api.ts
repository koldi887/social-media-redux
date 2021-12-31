import { IAPIResponse, instance } from "./api";

interface IAuthMe {
  id: number | null;
  email: string;
  login: string;
}

export const authAPI = {
  authMe() {
    return instance
      .get<IAPIResponse<IAuthMe>>(`auth/me`)
      .then((response) => response.data);
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance
      .post<IAPIResponse<number>>(`auth/login`, { email, password, rememberMe })
      .then((response) => response.data);
  },
  logOut() {
    return instance
      .delete<IAPIResponse<object>>(`auth/login`)
      .then((response) => response.data);
  }
};