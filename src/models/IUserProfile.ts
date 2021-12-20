export interface IProfileData {
  aboutMe: null | string;
  contacts: {
    facebook: null | string;
    github: null | string;
    instagram: null | string;
    mainLink: null | string;
    twitter: null | string;
    vk: null | string;
    website: null | string;
    youtube: null | string;
  };
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: null | string;
  photos: { small: null | string; large: null | string };
  userId: number;
}

export const profileData: IProfileData = {
  aboutMe: null,
  contacts: {
    facebook: null,
    github: null,
    instagram: null,
    mainLink: null,
    twitter: null,
    vk: null,
    website: null,
    youtube: null,
  },
  fullName: '',
  lookingForAJob: false,
  lookingForAJobDescription: null,
  photos: { small: null, large: null },
  userId: -1,
}