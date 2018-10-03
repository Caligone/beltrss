export const REFRESH_FEEDS = 'REFRESH_FEEDS';
export const REFRESH_FEED = 'REFRESH_FEED';
export const FEED_LOADED = 'FEED_LOADED';
export const ADD_FEED = 'ADD_FEED';

export const FEED_STATUS = {
    LOADING: 0,
    LOADED: 1,
};

export const initialState = {
    items: {},
};

export default (state = initialState, action) => {
    let currentItem;
    switch(action.type) {
    case ADD_FEED:
        return {
            ...state,
            items: {
                ...state.items,
                [action.payload.feed.id]: {
                    ...action.payload.feed,
                    status: FEED_STATUS.LOADED,
                },
            },
        };
    case REFRESH_FEED:
        currentItem = state.items[action.payload.id];
        return {
            ...state,
            items: {
                ...state.items,
                [action.payload.id]: {
                    ...currentItem,
                    status: FEED_STATUS.LOADING,
                },
            },
        };
    case FEED_LOADED:
        currentItem = state.items[action.payload.id];
        return {
            ...state,
            items: {
                ...state.items,
                [action.payload.id]: {
                    ...currentItem,
                    status: FEED_STATUS.LOADED,
                },
            },
        };
    default:
        return state;
    }
};

/*
    Action creators
*/
export const refreshFeeds = () => ({ type: REFRESH_FEEDS });
export const refreshFeed = (id) => ({
    type: REFRESH_FEED,
    payload: { id },
});
export const feedLoaded = (id) => ({
    type: FEED_LOADED,
    payload: { id },
});
export const addFeed = (feed) => ({
    type: ADD_FEED,
    payload: { feed },
});

/*
    Selectors
*/
export const feedsSelector = (state) => (
    Object.values(state.Feeds.items)
);
export const feedSelector = (state, id) => (
    Object.values(state.Feeds.items).find(feed => feed.id === id)
);

