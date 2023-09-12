import { put, takeEvery, call } from 'redux-saga/effects';
import {
    FETCH_PROPERTIES,
    setError,
    setProperties
} from '../store/propertiesReducer';

const fetchPropertiesFromApi = () => fetch(process.env.REACT_APP_BACKEND_URI);

function* fetchPropertiesWorker() {
    try {
        const data = yield call(fetchPropertiesFromApi);
        if (!data.ok) {
            throw new Error('Could not download the data');
        }
        const json = yield call(() => new Promise(res => res(data.json())));
        yield put(setProperties(json));
    } catch (error) {
        yield put(setError(error.message));
    }
}

export function* propertiesWatcher() {
    yield takeEvery(FETCH_PROPERTIES, fetchPropertiesWorker);
}
