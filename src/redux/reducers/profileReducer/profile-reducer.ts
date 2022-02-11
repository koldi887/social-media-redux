import { ResultCodeEnum } from "../../../api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux-store";
import { IPhotoType, IProfileData, profileData } from "../../../types/IProfileData";
import { profileAPI } from "../../../api/profile-api";
import {setAuthUserAvatar} from "../authReducer/auth-reducer";

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
      likesCount: 12
    }
  ],
  profile: profileData,
  status: "",
  isFetching: false
};

interface IProfile {
  profileData: IProfileData;
  status: string;
}

export const getUserProfile = createAsyncThunk<void, number | null, { state: RootState }>(
  "profile/getUserProfile",
  async function(userId, { dispatch, getState }) {
    const authorizedUserId = getState().auth.id;
    const authorizedUserAvatar = getState().auth.avatar;

    const profileData = await profileAPI.getProfile(userId);
    let status = await profileAPI.getUserStatus(userId);

    if (!authorizedUserAvatar && userId === authorizedUserId) {
      dispatch(setAuthUserAvatar(profileData.photos?.small as null));
    }
    if (!status) status = "No status";
    dispatch(setUserProfile({ profileData, status }));
  }
);

export const updateProfileStatus = createAsyncThunk<string | undefined, string>(
  "profile/updateUserStatus",
  async function(status) {
    const response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === ResultCodeEnum.success) {
      return status;
    }
    return;
  }
);

export const updateProfilePhoto = createAsyncThunk<IPhotoType | undefined, File>(
  "profile/updateProfilePhoto",
  async function(photoFile, { dispatch }) {
    const response = await profileAPI.updateProfilePhoto(photoFile);
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(setAuthUserAvatar(response.data.photos.small));
      return response.data.photos;
    }
  }
);

export const saveProfileInfo = createAsyncThunk<void | string[], object, { state: RootState }>(
  "profile/updateProfilePhoto",
  async function(profileData, { dispatch, getState }) {
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
          likesCount: 0
        });
      }
    },
    setUserProfile: (state, action: PayloadAction<IProfile>) => {
      state.isFetching = false;
      state.profile = action.payload.profileData;
      state.status = action.payload.status;
    }
  },

  extraReducers: (builder) => {
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
      (state, action: PayloadAction<IPhotoType | undefined>) => {
        state.profile.photos = action.payload;
      }
    );
  }
});

export const { addNewPost, setUserProfile } = profileSlice.actions;
export const profileSelector = (state: RootState) => state.profilePage;
export default profileSlice.reducer;
