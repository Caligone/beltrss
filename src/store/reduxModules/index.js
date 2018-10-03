import { combineReducers } from 'redux';

import App, { initialState as appInitialState } from './App';
import Articles, { initialState as articlesInitialState } from './Articles';
import Feeds, { initialState as feedsInitialState } from './Feeds';

export const initialState = Object.assign({
    App: appInitialState,
    Articles: articlesInitialState,
    Feeds: feedsInitialState,
});

export default combineReducers({
    App,
    Articles,
    Feeds,
});
