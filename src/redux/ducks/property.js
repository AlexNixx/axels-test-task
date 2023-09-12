import { call, put, takeEvery } from 'redux-saga/effects';

export const FETCH_PROPERTY = 'PROPERTY/FETCH_PROPERTY';
export const SET_PROPERTY = 'PROPERTY/SET_PROPERTY';
export const SET_ERROR = 'PROPERTY/SET_ERROR';

const defaultState = {
    property: null,
    error: '',
    loading: false
};

export default function propertyReducer(state = defaultState, action) {
    switch (action.type) {
        case FETCH_PROPERTY:
            return { ...state, loading: true, error: null };
        case SET_PROPERTY:
            return { ...state, property: action.payload, loading: false };
        case SET_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export const fetchProperty = id => ({ type: FETCH_PROPERTY, payload: id });
export const setProperty = property => ({
    type: SET_PROPERTY,
    payload: property
});
export const setError = error => ({ type: SET_ERROR, payload: error });

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
