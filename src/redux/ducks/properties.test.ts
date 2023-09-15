import { testSaga } from 'redux-saga-test-plan';

import propertiesReducer, {
    FETCH_PROPERTIES,
    fetchProperties,
    SET_PROPERTIES,
    setProperties,
    SET_ERROR,
    setError,
    defaultState,
    fetchPropertiesWorker
} from './properties';

import { fetchPropertiesFromApi } from '../../services/fetchProperties';
import { mockProperties } from '../../utils';

describe('Test Properties Action Creator', () => {
    test('should create an action with FETCH_PROPERTIES type', () => {
        const expectation = {
            type: FETCH_PROPERTIES
        };
        expect(fetchProperties()).toEqual(expectation);
    });

    test('should create an action with SET_PROPERTIES type', () => {
        const expectation = {
            type: SET_PROPERTIES,
            payload: mockProperties
        };
        expect(setProperties(mockProperties)).toEqual(expectation);
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

describe('Test Properties Reducer', () => {
    test('should handle FETCH_PROPERTIES', () => {
        expect(propertiesReducer(defaultState, fetchProperties())).toEqual({
            ...defaultState,
            loading: true
        });
    });

    test('should handle SET_ERROR', () => {
        const errorMessage = 'Error message';

        expect(propertiesReducer(defaultState, setError(errorMessage))).toEqual(
            { ...defaultState, error: errorMessage, loading: false }
        );
    });

    test('should handle SET_PROPERTIES', () => {
        expect(
            propertiesReducer(defaultState, setProperties(mockProperties))
        ).toEqual({ properties: mockProperties, loading: false, error: null });
    });
});

describe('Test Properties Saga', () => {
    test('should successfully fetch the properties', () => {
        testSaga(fetchPropertiesWorker)
            .next()
            .call(fetchPropertiesFromApi)
            .next(mockProperties)
            .put(setProperties(mockProperties))
            .next()
            .isDone();
    });
    test('should fail to fetch the properties', () => {
        const error = new Error('testError');

        testSaga(fetchPropertiesWorker)
            .next()
            .call(fetchPropertiesFromApi)
            .throw(error)
            .put(setError(error.message))
            .next()
            .isDone();
    });
});
