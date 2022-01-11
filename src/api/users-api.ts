import { IUser } from "../types/IUser";
import { IAPIResponse, instance } from "./api";

export interface IRequestUserAPI {
  items: Array<IUser>;
  totalCount: number;
  error: string | null;
}

export const usersAPI = {
  requestUsers(
    currentPage = 1,
    pageSize = 10,
    term = "",
    friend: null | boolean
  ) {
    return instance
      .get<IRequestUserAPI>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? "" : `&friend=${friend}`)
      )
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
