import {
  call,
  put,
  SagaReturnType,
  select,
  takeEvery,
} from "redux-saga/effects";
import { profileAPI } from "../../../api/profile-api";
import {
  authSuccess,
  authUserIdSelector,
  setAuthUserAvatar,
} from "../../reducers/authReducer/auth-reducer";
import { IAuthMe } from "../../../api/auth-api";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  profileSelector,
  ProfileSelectorType,
  setProfileSuccess,
  setStatusSuccess,
} from "../../reducers/profileReducer/profile-reducer";
import { LOCATION_CHANGE } from "redux-first-history";
import { matchPath } from "react-router-dom";
import {
  getRouteConfig,
  ROUTE,
  USER_PROFILE_ROUTE,
} from "../../../routes/routes";
import { LocationType } from "../../../types/locationChangeType";

type StatusResponseType = SagaReturnType<typeof profileAPI.getUserStatus>;
type ProfileResponseType = SagaReturnType<typeof profileAPI.getProfile>;
type AuthUserIdSelectType = SagaReturnType<typeof authUserIdSelector>;
type MatchPathType = ReturnType<typeof matchPath>;

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

function* loadUsersOnRouteEnter({ payload }: PayloadAction<LocationType>) {
  const actionPath: string = payload.location.pathname;
  const { profile }: ProfileSelectorType = yield select(profileSelector);
  const authUserId: AuthUserIdSelectType = yield select(authUserIdSelector);

  const profilePage: MatchPathType = matchPath(
    // @ts-ignore
    getRouteConfig(USER_PROFILE_ROUTE),
    actionPath
  );

  if (profilePage) {
    const { userId } = profilePage.params;
    yield call(setUserProfile, {
      payload: { id: Number(userId) },
    } as PayloadAction<IAuthMe>);
  }

  if (actionPath === ROUTE.PROFILE && profile.userId !== authUserId) {
    yield call(setUserProfile, {
      payload: { id: authUserId },
    } as PayloadAction<IAuthMe>);
  }
}

function* setUserProfile({ payload }: PayloadAction<IAuthMe>) {
  const { id } = payload;
  if (id) {
    yield call(getUserProfile, id as number);
    yield call(getUserStatus, id as number);
  }
}

export default function* profileSaga() {
  yield takeEvery(authSuccess, setUserProfile);
  yield takeEvery(LOCATION_CHANGE, loadUsersOnRouteEnter);
}
