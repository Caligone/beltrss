import { put, takeEvery } from 'redux-saga/effects';

import { ADD_FEED, refreshFeed} from '../reduxModules/Feeds';

export function* handler(action) {
    const feedId = action.payload.id;
    yield put(refreshFeed(feedId));
}
  
export default function* watcher() {
    yield takeEvery(ADD_FEED, handler);
}