import { all } from 'redux-saga/effects';

import { propertiesWatcher } from './ducks/properties';
import { propertyWatcher } from './ducks/property';

export function* rootWatcher() {
    yield all([propertiesWatcher(), propertyWatcher()]);
}
