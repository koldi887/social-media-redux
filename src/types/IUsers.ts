import { IPhotoType } from "./IProfile";

export interface IUsersState {
  users: IUsers[];
  followingInProgress: Array<number>;
  isFetching: boolean;
  status: string;
  error: string;
  pageSize: number;
  currentPage: number;
  totalUsersCount: number;
  filter: {
    term: string;
    friend: null | boolean;
  };
}

export interface IUsers {
  followed: boolean;
  id: number;
  name: string;
  photos: IPhotoType;
  status: null | string;
  uniqueUrlName: null;
}
