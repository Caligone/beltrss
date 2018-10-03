import { all } from 'redux-saga/effects';

import initSaga from './initSaga';
import refreshFeedsSaga from './refreshFeedsSaga';
import refreshFeedSaga from './refreshFeedSaga';
import persistStoreSaga from './persistStoreSaga';

export default function* rootSaga() {
    yield all([
        refreshFeedsSaga(),
        refreshFeedSaga(),
        persistStoreSaga(),
        initSaga(),
    ]);
}