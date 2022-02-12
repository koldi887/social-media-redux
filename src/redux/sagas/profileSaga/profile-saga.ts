import {
  call,
  put,
  select,
  takeEvery,
  SagaReturnType,
} from "redux-saga/effects";
import {profileAPI} from "../../../api/profile-api";
import {
  authSuccess,
  authUserIdSelector,
  setAuthUserAvatar,
} from "../../reducers/authReducer/auth-reducer";
import {IAuthMe} from "../../../api/auth-api";
import {PayloadAction} from "@reduxjs/toolkit";
import {
  setProfileSuccess,
  setStatusSuccess,
} from "../../reducers/profileReducer/profile-reducer";

type StatusResponseType = SagaReturnType<typeof profileAPI.getUserStatus>;
type ProfileResponseType = SagaReturnType<typeof profileAPI.getProfile>;
type AuthUserIdSelectType = SagaReturnType<typeof authUserIdSelector>;

function* getUserProfile(userId: number) {
  const authUserId: AuthUserIdSelectType = yield select(authUserIdSelector);

  try {
    const profileData: ProfileResponseType = yield call(
        profileAPI.getProfile,
        userId
    );
    yield put(setProfileSuccess(profileData));

    if (userId === authUserId && profileData.photos) {
      yield put(setAuthUserAvatar(profileData.photos.small));
    }

  } catch (err) {
    console.log(err);
  }
}

function* getUserStatus(userId: number) {
  try {
    const userStatus: StatusResponseType = yield call(
        profileAPI.getUserStatus,
        userId
    );
    yield put(setStatusSuccess(userStatus));
  } catch (err) {
    err = "Some error occurred";
    yield put(setStatusSuccess(err as string));
  }
}

function* onUserChange({payload}: PayloadAction<IAuthMe>) {
  const {id} = payload;
  yield call(getUserStatus, id as number);
  yield call(getUserProfile, id as number);
}

export default function* profileSaga() {
  yield takeEvery(authSuccess, onUserChange);
}
