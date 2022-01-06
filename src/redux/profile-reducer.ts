import { ResultCodeEnum } from "../api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./redux-store";
import { IPhotoType, IProfileData, profileData } from "../models/IProfileData";
import { profileAPI } from "../api/profile-api";
import { capitalize } from "../helpers/capitalize";

export interface IPosts {
  id: number | null;
  text: string;
  likesCount: number;
}

export interface IState {
  posts: Array<IPosts>;
  profile: IProfileData;
  status: string | undefined;
  isFetching: boolean;
}

const initialState: IState = {
  posts: [
    {
      id: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      likesCount: 12,
    },
  ],
  profile: profileData,
  status: "",
  isFetching: false,
};

interface IProfile {
  profileData: IProfileData;
  status: string;
}

export const getUserProfile = createAsyncThunk<IProfile, number | null>(
  "profile/getUserProfile",
  async function (userId) {
    const profileData = await profileAPI.getProfile(userId);
    let status = await profileAPI.getUserStatus(userId);
    if (!status) status = "No status";
    return { profileData, status };
  }
);

export const updateProfileStatus = createAsyncThunk<string | undefined, string>(
  "profile/updateUserStatus",
  async function (status) {
    const response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === ResultCodeEnum.success) {
      return status;
    }
    return;
  }
);
export const updateProfilePhoto = createAsyncThunk<IPhotoType, File>(
  "profile/updateProfilePhoto",
  // @ts-ignore
  async function (photoFile) {
    const response = await profileAPI.updateProfilePhoto(photoFile);
    if (response.resultCode === ResultCodeEnum.success) {
      return response.data.photos;
    }
  }
);

export const saveProfileInfo = createAsyncThunk<
  void | string[],
  object,
  { state: RootState }
>(
  "profile/updateProfilePhoto",
  async function (profileData, { dispatch, getState }) {
    const authUserId = getState().auth.id;
    const response = await profileAPI.updateProfileInfo(profileData);
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(getUserProfile(authUserId));
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addNewPost: (state, action: PayloadAction<string>) => {
      const postId = state.posts.length;
      if (action.payload) {
        state.posts.push({
          id: postId,
          text: action.payload,
          likesCount: 0,
        });
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getUserProfile.fulfilled,
      (state, action: PayloadAction<IProfile>) => {
        console.log(action.payload);
        state.profile = action.payload.profileData;
        state.status = action.payload.status;
      }
    );

    builder.addCase(
      updateProfileStatus.fulfilled,
      (state, action: PayloadAction<string | undefined>) => {
        state.status = action.payload;
      }
    );

    builder.addCase(updateProfilePhoto.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(
      updateProfilePhoto.fulfilled,
      (state, action: PayloadAction<IPhotoType>) => {
        state.profile.photos = action.payload;
        state.isFetching = false;
      }
    );
  },
});

export const { addNewPost } = profileSlice.actions;
export const profileSelector = (state: RootState) => state.profilePage;
export default profileSlice.reducer;
