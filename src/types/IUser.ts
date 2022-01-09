import { IPhotoType } from "./IProfileData";

export interface IUser {
  followed: boolean;
  id: number;
  name: string;
  photos: IPhotoType;
  status: null | string;
  uniqueUrlName: null;
}
