import { put, takeEvery } from "redux-saga/effects";
import { authSuccess } from "../../reducers/authReducer/auth-reducer";
import {
  initializedError,
  initializedSuccess,
} from "../../reducers/appReducer/app-reducer";

function* initialize() {
  yield put(initializedSuccess());
}

export default function* initializeSaga() {
  yield takeEvery(authSuccess, initialize);
  yield takeEvery(initializedError, initialize);
}
