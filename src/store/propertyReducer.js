const defaultState = {
    property: null,
    error: '',
    loading: false
};

export const FETCH_PROPERTY = 'FETCH_PROPERTY';
export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_ERROR = 'SET_ERROR';

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
