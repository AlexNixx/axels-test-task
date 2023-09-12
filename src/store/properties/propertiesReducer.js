import {
    FETCH_PROPERTIES,
    SET_ERROR,
    SET_PROPERTIES
} from './propertiesActions';

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
