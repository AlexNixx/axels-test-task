import { all } from 'redux-saga/effects';

import { propertiesWatcher } from './propertiesSaga';
import { propertyWatcher } from './propertySaga';

export function* rootWatcher() {
    yield all([propertiesWatcher(), propertyWatcher()]);
}
