import { IUser } from "../models/IUser";
import { IAPIResponse, instance } from "./api";

export interface IRequestUserAPI {
  items: Array<IUser>;
  totalCount: number;
  error: string | null;
}

export const usersAPI = {
  requestUsers(page: number, pageSize: number) {
    return instance
      .get<IRequestUserAPI>(`users?page=${page}&count=${pageSize}`)
      .then((response) => response.data);
  },

  followUser(userId: number) {
    return instance
      .post<IAPIResponse<object>>(`follow/${userId}`)
      .then((response) => response.data);
  },

  unfollowUser(userId: number) {
    return instance
      .delete<IAPIResponse<object>>(`follow/${userId}`)
      .then((response) => response.data);
  },
};
