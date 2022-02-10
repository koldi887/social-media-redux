import {all, spawn} from "redux-saga/effects";
import peopleSaga from "./people/peopleSaga";

export default function* rootSaga() {
    const sagas = [
        peopleSaga
    ]
    yield all(sagas.map(saga => spawn(saga)))
}
