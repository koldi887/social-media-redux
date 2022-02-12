import {all, spawn} from "redux-saga/effects";
import authSaga from "./authSaga/auth-saga";
import initializeSaga from "./appSaga/initializeSaga";
import profileSaga from "./profileSaga/profile-saga";

export default function* rootSaga() {
    const sagas = [
        initializeSaga,
        authSaga,
        profileSaga
    ]
    yield all(sagas.map(saga => spawn(saga)))

}
