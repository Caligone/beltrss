import { all, call, put, select, take } from 'redux-saga/effects';

import { initAppSuccess } from '../reduxModules/App';

import { FEED_LOADED, feedsSelector, refreshFeeds } from '../reduxModules/Feeds';

export default function* handler() {
    const feeds = yield select(feedsSelector);
    yield put(refreshFeeds());
    yield all(
        // Create {feeds.length} {take(FEED_LOADED)} actions
        Array.from(
            Array(feeds.length).keys()
        ).map(() => (take(FEED_LOADED))),
    );
    yield put(initAppSuccess());
}
  
export function* watcher() {
    yield call(handler);
    // yield takeEvery(INIT_APP, handler);
}