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
        const property = {
            id: 1,
            title: 'Title',
            price: 1000,
            address: 'Address',
            seller: 'Seller Name',
            description: 'description',
            images: ['image-url']
        };

        const expectation = {
            type: SET_PROPERTY,
            payload: property
        };
        expect(setProperty(property)).toEqual(expectation);
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
            propertyReducer(defaultState, {
                type: FETCH_PROPERTY,
                payload: 1
            })
        ).toEqual({ ...defaultState, loading: true });
    });

    test('should handle SET_ERROR', () => {
        const errorMessage = 'Error message';

        expect(
            propertyReducer(defaultState, {
                type: SET_ERROR,
                payload: errorMessage
            })
        ).toEqual({ ...defaultState, error: errorMessage, loading: false });
    });

    test('should handle SET_PROPERTY', () => {
        const property = {
            id: 1,
            title: 'Title',
            price: 1000,
            address: 'Address',
            seller: 'Seller Name',
            description: 'description',
            images: ['image-url']
        };

        expect(
            propertyReducer(defaultState, {
                type: SET_PROPERTY,
                payload: property
            })
        ).toEqual({ ...defaultState, property, loading: false });
    });
});

describe('Test Property Saga', () => {
    test('Success fetch property', () => {
        const property = [
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

        const propertyId = 1;

        testSaga(fetchPropertyWorker, fetchProperty(propertyId))
            .next()
            .call(fetchPropertyFromApi, propertyId)
            .next(property)
            .put(setProperty(property[0]))
            .next()
            .isDone();
    });
    test('Failed fetch property', () => {
        const error = new Error('testError');

        const propertyId = 1;

        testSaga(fetchPropertyWorker, fetchProperty(propertyId))
            .next()
            .call(fetchPropertyFromApi, propertyId)
            .throw(error)
            .put(setError(error.message))
            .next()
            .isDone();
    });
});
