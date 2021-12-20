export interface IUser {
  followed: boolean;
  id: number;
  name: string;
  photos: { small: null | string; large: null | string };
  status: null | string;
  uniqueUrlName: null;
}
