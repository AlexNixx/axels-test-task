import { testSaga } from 'redux-saga-test-plan';

import propertyReducer, {
    FETCH_PROPERTY,
    fetchProperty,
    SET_ERROR,
    setError,
    SET_PROPERTY,
    setProperty,
    defaultState,
    fetchPropertyWorker
} from './property';

import { fetchPropertyFromApi } from '../../services/fetchProperty';
import { mockProperties } from '../../utils';

describe('Test Properties Action Creator', () => {
    test('should create an action with FETCH_PROPERTY type', () => {
        const expectation = {
            type: FETCH_PROPERTY,
            payload: 1
        };
        expect(fetchProperty(1)).toEqual(expectation);
        expect(fetchProperty(3)).not.toEqual(expectation);
    });

    test('should create an action with SET_PROPERTY type', () => {
        const expectation = {
            type: SET_PROPERTY,
            payload: mockProperties[0]
        };
        expect(setProperty(mockProperties[0])).toEqual(expectation);
    });

    test('should create an action with SET_ERROR type', () => {
        const message = 'Data retrieval failure';
        const expectation = {
            type: SET_ERROR,
            payload: message
        };
        expect(setError(message)).toEqual(expectation);
    });
});

describe('Test Property Reducer', () => {
    test('should handle FETCH_PROPERTY', () => {
        expect(
            propertyReducer(defaultState, fetchProperty(mockProperties[0].id))
        ).toEqual({ ...defaultState, loading: true });
    });

    test('should handle SET_ERROR', () => {
        const errorMessage = 'Error message';

        expect(propertyReducer(defaultState, setError(errorMessage))).toEqual({
            ...defaultState,
            error: errorMessage,
            loading: false
        });
    });

    test('should handle SET_PROPERTY', () => {
        expect(
            propertyReducer(defaultState, setProperty(mockProperties[0]))
        ).toEqual({
            property: mockProperties[0],
            loading: false,
            error: null
        });
    });
});

describe('Test Property Saga', () => {
    test('should successfully fetch the property', () => {
        testSaga(fetchPropertyWorker, fetchProperty(mockProperties[0].id))
            .next()
            .call(fetchPropertyFromApi, mockProperties[0].id)
            .next(mockProperties)
            .put(setProperty(mockProperties[0]))
            .next()
            .isDone();
    });
    test('should fail to fetch the property', () => {
        const error = new Error('testError');

        testSaga(fetchPropertyWorker, fetchProperty(mockProperties[0].id))
            .next()
            .call(fetchPropertyFromApi, mockProperties[0].id)
            .throw(error)
            .put(setError(error.message))
            .next()
            .isDone();
    });
});
