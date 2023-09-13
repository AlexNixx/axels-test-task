import { call, put, takeEvery } from 'redux-saga/effects';

import { fetchPropertyFromApi } from '../../services/fetchProperty';

export const FETCH_PROPERTY = 'PROPERTY/FETCH_PROPERTY';
export const SET_PROPERTY = 'PROPERTY/SET_PROPERTY';
export const SET_ERROR = 'PROPERTY/SET_ERROR';

type Property = {
    id: number;
    title: string;
    price: number;
    address: string;
    seller: string;
    description: string;
    images: string[];
};

type PropertyState = {
    property: Property | null;
    error: null | string;
    loading: boolean;
};

export const defaultState: PropertyState = {
    property: null,
    error: null,
    loading: false
};

type FetchPropertyAction = { type: typeof FETCH_PROPERTY; payload: number };
type SetPropertyAction = { type: typeof SET_PROPERTY; payload: Property };
type SetErrorAction = { type: typeof SET_ERROR; payload: string };

type PropertyActionTypes =
    | FetchPropertyAction
    | SetPropertyAction
    | SetErrorAction;

export default function propertyReducer(
    state = defaultState,
    action: PropertyActionTypes
): PropertyState {
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

export const fetchProperty = (id: number): FetchPropertyAction => ({
    type: FETCH_PROPERTY,
    payload: id
});
export const setProperty = (property: Property): SetPropertyAction => ({
    type: SET_PROPERTY,
    payload: property
});
export const setError = (error: string): SetErrorAction => ({
    type: SET_ERROR,
    payload: error
});

export function* fetchPropertyWorker(action: FetchPropertyAction) {
    try {
        const data: Property[] = yield call(
            fetchPropertyFromApi,
            action.payload
        );
        yield put(setProperty(data[0]));
    } catch (error) {
        yield put(setError(error.message));
    }
}

export function* propertyWatcher() {
    yield takeEvery(FETCH_PROPERTY, fetchPropertyWorker);
}
