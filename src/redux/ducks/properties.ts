import { call, put, takeEvery } from 'redux-saga/effects';

export const FETCH_PROPERTIES = 'PROPERTIES/FETCH_PROPERTIES';
export const SET_PROPERTIES = 'PROPERTIES/SET_PROPERTIES';
export const SET_ERROR = 'PROPERTIES/SET_ERROR';

type Property = {
    id: number;
    title: string;
    price: number;
    address: string;
    seller: string;
    description: string;
    images: string[];
};

type PropertiesState = {
    properties: Property[];
    error: string;
    loading: boolean;
};

const defaultState: PropertiesState = {
    properties: [],
    error: '',
    loading: false
};

type FetchPropertiesAction = { type: typeof FETCH_PROPERTIES };
type SetPropertiesAction = { type: typeof SET_PROPERTIES; payload: Property[] };
type SetErrorAction = { type: typeof SET_ERROR; payload: string };

type PropertiesActionTypes =
    | FetchPropertiesAction
    | SetPropertiesAction
    | SetErrorAction;

export default function propertiesReducer(
    state = defaultState,
    action: PropertiesActionTypes
): PropertiesState {
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

export const fetchProperties = (): FetchPropertiesAction => ({
    type: FETCH_PROPERTIES
});
export const setProperties = (properties: Property[]): SetPropertiesAction => ({
    type: SET_PROPERTIES,
    payload: properties
});
export const setError = (error: string): SetErrorAction => ({
    type: SET_ERROR,
    payload: error
});

const fetchPropertiesFromApi = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URI);
    if (!response.ok) {
        throw new Error('Could not download the data');
    }
    return await response.json();
};

function* fetchPropertiesWorker() {
    try {
        const data: Property[] = yield call(fetchPropertiesFromApi);
        yield put(setProperties(data));
    } catch (error) {
        yield put(setError(error.message));
    }
}

export function* propertiesWatcher() {
    yield takeEvery(FETCH_PROPERTIES, fetchPropertiesWorker);
}
