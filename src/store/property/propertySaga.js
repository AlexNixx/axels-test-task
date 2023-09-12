import { put, takeEvery, call } from 'redux-saga/effects';

import { FETCH_PROPERTY } from './propertyAction';
import { setError, setProperty } from './propertyReducer';

const fetchPropertyFromApi = id =>
    fetch(`${process.env.REACT_APP_BACKEND_URI}?id=${id}`);

function* fetchPropertyWorker(action) {
    try {
        const data = yield call(fetchPropertyFromApi, action.payload);
        if (!data.ok) {
            throw new Error('Could not download the data');
        }
        const json = yield call(() => new Promise(res => res(data.json())));
        yield put(setProperty(...json));
    } catch (error) {
        yield put(setError(error.message));
    }
}

export function* propertyWatcher() {
    yield takeEvery(FETCH_PROPERTY, fetchPropertyWorker);
}
