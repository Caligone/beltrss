import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import RSSParser from 'rss-parser';

import { REFRESH_FEED, feedSelector, feedLoaded} from '../reduxModules/Feeds';
import { putArticle } from '../reduxModules/Articles';

export const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

let rssParser = new RSSParser();

export function getRssData(feed) {
    return new Promise((resolve, reject) => {
        rssParser.parseURL(`${CORS_PROXY}${feed.url}`, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

export function* insertArticle(article) {
    yield put(putArticle({
        ...article,
        read: false,
    }));
}

export function* handler(action) {
    const feedId = action.payload.id;
    const feed = yield select(feedSelector, feedId);
    try {
        const r = yield call(getRssData, feed);
        yield all(r.items.map(insertArticle));
    } catch(e) {
        console.error(e);
    }
    yield put(feedLoaded(feedId));
}
  
export default function* watcher() {
    yield takeEvery(REFRESH_FEED, handler);
}