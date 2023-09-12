import { applyMiddleware, combineReducers, createStore } from 'redux';

import propertiesReducer from './properties/propertiesReducer';
import propertyReducer from './property/propertyReducer';

import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './rootWatcher';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    propertiesReducer,
    propertyReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
