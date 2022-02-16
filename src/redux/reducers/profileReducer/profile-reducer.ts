import { ResultCodeEnum } from "../../../api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux-store";
import {
  IPhotoType,
  IProfileData,
  profileData,
} from "../../../types/IProfileData";
import { profileAPI } from "../../../api/profile-api";
import { setAuthUserAvatar } from "../authReducer/auth-reducer";

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

export const getUserProfile = createAsyncThunk<
  void,
  number | null,
  { state: RootState }
>("profile/getUserProfile", async function (userId, { dispatch, getState }) {
  const authorizedUserId = getState().auth.id;
  const authorizedUserAvatar = getState().auth.avatar;

  const profileData = await profileAPI.getProfile(userId);
  let status = (await profileAPI.getUserStatus(userId)) || "No status";

  if (
    !authorizedUserAvatar &&
    userId === authorizedUserId &&
    profileData.photos
  ) {
    dispatch(setAuthUserAvatar(profileData.photos.small));
  }
  dispatch(setProfileSuccess(profileData));
  dispatch(setStatusSuccess(status));
});

export const updateProfileStatus = createAsyncThunk<void, string>(
  "profile/updateUserStatus",
  async function (status, { dispatch }) {
    const response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === ResultCodeEnum.success) {
      dispatch(setStatusSuccess(status));
    }
  }
);

export const updateProfilePhoto = createAsyncThunk<IPhotoType | void, File>(
  "profile/updateProfilePhoto",
  async function (photoFile, { dispatch }) {
    const response = await profileAPI.updateProfilePhoto(photoFile);
    if (response.resultCode === ResultCodeEnum.success) {
      dispatch(setAuthUserAvatar(response.data.photos.small));
      return response.data.photos;
    }
  }
);

export const saveProfileInfo = createAsyncThunk<
  void,
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addPostSuccess: (state, action: PayloadAction<string>) => {
      const postId = state.posts.length;
      state.posts.push({
        id: postId,
        text: action.payload,
        likesCount: 0,
      });
    },

    setProfileSuccess: (state, action: PayloadAction<IProfileData>) => {
      state.isFetching = false;
      state.profile = action.payload;
    },
    setStatusSuccess: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    updateProfilePhotoSuccess: (state, action: PayloadAction<IPhotoType>) => {
      state.profile.photos = action.payload;
      state.isFetching = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.isFetching = true;
    });
  },
});

export const { addPostSuccess, setProfileSuccess, setStatusSuccess } =
  profileSlice.actions;
export const profileSelector = (state: RootState) => state.profilePage;
export default profileSlice.reducer;
