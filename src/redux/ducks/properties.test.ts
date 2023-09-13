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
import { testSaga } from 'redux-saga-test-plan';
import { fetchPropertiesFromApi } from '../../services/fetchProperties';

describe('Test Properties Action Creator', () => {
    test('should create an action with FETCH_PROPERTIES type', () => {
        const expectation = {
            type: FETCH_PROPERTIES
        };
        expect(fetchProperties()).toEqual(expectation);
    });
    test('should create an action with SET_PROPERTIES type', () => {
        const properties = [
            {
                id: 1,
                title: 'Title',
                price: 1000,
                address: 'Address',
                seller: 'Seller Name',
                description: 'description',
                images: ['image-url']
            }
        ];
        const expectation = {
            type: SET_PROPERTIES,
            payload: properties
        };
        expect(setProperties(properties)).toEqual(expectation);
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
        expect(
            propertiesReducer(defaultState, {
                type: FETCH_PROPERTIES
            })
        ).toEqual({ ...defaultState, loading: true });
    });

    test('should handle SET_ERROR', () => {
        const errorMessage = 'Error message';

        expect(
            propertiesReducer(defaultState, {
                type: SET_ERROR,
                payload: errorMessage
            })
        ).toEqual({ ...defaultState, error: errorMessage, loading: false });
    });

    test('should handle SET_PROPERTIES', () => {
        const properties = [
            {
                id: 1,
                title: 'Title',
                price: 1000,
                address: 'Address',
                seller: 'Seller Name',
                description: 'description',
                images: ['image-url']
            }
        ];

        expect(
            propertiesReducer(defaultState, {
                type: SET_PROPERTIES,
                payload: properties
            })
        ).toEqual({ ...defaultState, properties, loading: false });
    });
});

describe('Test Properties Saga', () => {
    test('Success fetch properties', () => {
        const properties = [
            {
                id: 1,
                title: 'Title',
                price: 1000,
                address: 'Address',
                seller: 'Seller Name',
                description: 'description',
                images: ['image-url']
            }
        ];

        testSaga(fetchPropertiesWorker)
            .next()
            .call(fetchPropertiesFromApi)
            .next(properties)
            .put(setProperties(properties))
            .next()
            .isDone();
    });
    test('Failed fetch properties', () => {
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
