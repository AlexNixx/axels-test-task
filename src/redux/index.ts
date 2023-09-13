import { applyMiddleware, combineReducers, createStore } from 'redux';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import propertiesReducer from './ducks/properties';
import propertyReducer from './ducks/property';
import { rootWatcher } from './rootWatcher';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    propertiesReducer,
    propertyReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
