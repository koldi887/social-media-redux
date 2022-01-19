export interface IPhotoType {
  small: string | null
  large: string | null
}

export interface IProfileContacts {
  facebook: null | string
  github: null | string
  instagram: null | string
  mainLink: null | string
  twitter: null | string
  vk: null | string
  website: null | string
  youtube: null | string
}

export interface IProfileData {
  userId?: null | number
  lookingForAJob: boolean
  lookingForAJobDescription: null | string
  fullName: string
  contacts: IProfileContacts
  aboutMe?: null | string
  photos?: IPhotoType
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
  photos: {
    small: null,
    large: null,
  },
  userId: null,
}
