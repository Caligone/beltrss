import { call, takeEvery } from 'redux-saga/effects';

import { FEED_LOADED } from '../reduxModules/Feeds';

import { getPersistor } from '../createStore';

export function* handler() {
    const persistor = getPersistor();
    if (!persistor) return;
    yield call(persistor.persist);
}
  
export default function* watcher() {
    yield takeEvery(FEED_LOADED, handler);
}