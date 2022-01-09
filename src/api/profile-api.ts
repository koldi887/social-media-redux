import { IPhotoType, IProfileData } from "../types/IProfileData";
import { IAPIResponse, instance } from "./api";

export const profileAPI = {
  getProfile(userId: number | null) {
    console.log("profileAPI");
    return instance
      .get<IProfileData>("profile/" + userId)
      .then((response) => response.data);
  },

  getUserStatus(userID: number | null) {
    console.log("statusAPI");
    return instance
      .get<string>(`profile/status/${userID}`)
      .then((response) => response.data);
  },

  updateUserStatus(status: string) {
    return instance
      .put<IAPIResponse<object>>(`profile/status`, { status })
      .then((response) => response);
  },

  updateProfilePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<IAPIResponse<{ photos: IPhotoType }>>(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  updateProfileInfo(profileData: object) {
    return instance
      .put<IAPIResponse<object>>(`profile`, profileData)
      .then((response) => response.data);
  },
};
