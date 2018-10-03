import { all, put, select, takeEvery } from 'redux-saga/effects';

import {
    REFRESH_FEEDS,
    feedsSelector,
    refreshFeed,
} from '../reduxModules/Feeds';

export function* handler() {
    const feeds = yield select(feedsSelector);
    yield all(feeds.map(function* (feed) {
        yield put(refreshFeed(feed.id));
    }));
}
  
export default function* watcher() {
    yield takeEvery(REFRESH_FEEDS, handler);
}