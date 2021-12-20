import axios from "axios";
import { IProfileData } from "../models/IUserProfile";
import { IUser } from "../models/IUser";

export enum ResultCodeEnum {
  success = 0,
  error = 1,
}

interface IUsers {
  items: Array<IUser>;
}

interface IAuthMe {
  id: number | null;
  email: string;
  login: string;
}

interface ILogin {
  userId: number;
}

interface IResponse<D> {
  data: D;
  resultCode: ResultCodeEnum;
  messages: Array<string>;
}

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "5a063c6f-71b9-4b11-9633-305ea5213c14",
  },
});

export const usersAPI = {
  getUsers() {
    return instance
      .get<IUsers>(`users?page=${1}&count=${99}`)
      .then((response) => response.data.items);
  },

  followUser(userId: number) {
    return instance
      .post<IResponse<object>>(`follow/${userId}`)
      .then((response) => response.data);
  },

  unfollowUser(userId: number) {
    return instance
      .delete<IResponse<object>>(`follow/${userId}`)
      .then((response) => response.data);
  },
};

export const authAPI = {
  authMe() {
    return instance
      .get<IResponse<IAuthMe>>(`auth/me`)
      .then((response) => response.data);
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance
      .post<IResponse<ILogin>>(`auth/login`, { email, password, rememberMe })
      .then((response) => response.data);
  },
  logOut() {
    return instance
      .delete<IResponse<object>>(`auth/login`)
      .then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(userId: number | null) {
    return instance
      .get<IProfileData>("profile/" + userId)
      .then((response) => response.data);
  },

  getUserStatus(userID: number | null) {
    return instance
      .get<string>(`profile/status/${userID}`)
      .then((response) => response.data);
  },

  updateUserStatus(status: string) {
    return instance
      .put<IResponse<object>>(`profile/status`, { status })
      .then((response) => response);
  },
};
