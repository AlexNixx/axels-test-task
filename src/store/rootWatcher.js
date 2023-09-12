import { all } from 'redux-saga/effects';

import { propertiesWatcher } from './properties/propertiesSaga';
import { propertyWatcher } from './property/propertySaga';

export function* rootWatcher() {
    yield all([propertiesWatcher(), propertyWatcher()]);
}
