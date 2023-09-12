import { call, put, takeEvery } from 'redux-saga/effects';

export const FETCH_PROPERTIES = 'PROPERTIES/FETCH_PROPERTIES';
export const SET_PROPERTIES = 'PROPERTIES/SET_PROPERTIES';
export const SET_ERROR = 'PROPERTIES/SET_ERROR';

const defaultState = {
    properties: [],
    error: '',
    loading: false
};

export default function propertiesReducer(state = defaultState, action) {
    switch (action.type) {
        case FETCH_PROPERTIES:
            return { ...state, loading: true, error: null };
        case SET_PROPERTIES:
            return { ...state, properties: action.payload, loading: false };
        case SET_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export const fetchProperties = () => ({ type: FETCH_PROPERTIES });
export const setProperties = properties => ({
    type: SET_PROPERTIES,
    payload: properties
});
export const setError = error => ({ type: SET_ERROR, payload: error });

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
