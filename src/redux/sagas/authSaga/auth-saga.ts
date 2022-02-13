import { call, put, SagaReturnType } from "redux-saga/effects";
import { authAPI } from "../../../api/auth-api";
import { ResultCodeEnum } from "../../../api/api";
import { authSuccess } from "../../reducers/authReducer/auth-reducer";
import {
  initializedError,
  initializedSuccess,
} from "../../reducers/appReducer/app-reducer";
import { setUserProfile } from "../profileSaga/profile-saga";

type AuthResponseType = SagaReturnType<typeof authAPI.authMe>;

function* setAuthUserData() {
  try {
    const response: AuthResponseType = yield call(authAPI.authMe);
    if (response.resultCode === ResultCodeEnum.success) {
      const { id, email, login } = response.data;
      yield put(authSuccess({ id, email, login, isAuth: true }));
      yield call(setUserProfile, id as number);
    }
  } catch (err) {
    err = "Something went wrong. Please refresh the page";
    yield put(initializedError(err as string));
  } finally {
    yield put(initializedSuccess());
  }
}

export default function* authSaga() {
  yield call(setAuthUserData);
}
