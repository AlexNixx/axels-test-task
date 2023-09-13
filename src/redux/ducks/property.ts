import { call, put, takeEvery } from 'redux-saga/effects';

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
    error: string;
    loading: boolean;
};

const defaultState: PropertyState = {
    property: null,
    error: '',
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

const fetchPropertyFromApi = async (id: number) => {
    const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}?id=${id}`
    );
    if (!response.ok) {
        throw new Error('Could not download the data');
    }
    return await response.json();
};

function* fetchPropertyWorker(
    action: FetchPropertyAction
): Generator<any, void, any> {
    try {
        const data = yield call(fetchPropertyFromApi, action.payload);
        yield put(setProperty(data[0]));
    } catch (error) {
        yield put(setError(error.message));
    }
}

export function* propertyWatcher() {
    yield takeEvery(FETCH_PROPERTY, fetchPropertyWorker);
}
