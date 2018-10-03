export const MARK_ARTICLE_AS_READ = 'MARK_ARTICLE_AS_READ';
export const PUT_ARTICLE = 'PUT_ARTICLE';

export const initialState = {
    items: {},
};

export default (state = initialState, action) => {
    let currentItem = null;
    switch(action.type) {
    case PUT_ARTICLE:
        currentItem = state.items[action.payload.article.id || action.payload.article.guid];
        return {
            ...state,
            items: {
                ...state.items,
                [action.payload.article.id || action.payload.article.guid]: {
                    id: action.payload.article.id || action.payload.article.guid,
                    read: false,
                    currentItem,
                    ...action.payload.article,
                },
            },
        };
    case MARK_ARTICLE_AS_READ:
        currentItem = state.items[action.payload.articleId];
        if (!currentItem) return state;
        return {
            ...state,
            items: {
                ...state.items,
                [action.payload.articleId]: {
                    ...currentItem,
                    read: true,
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
export const putArticle = (article) => ({
    type: PUT_ARTICLE,
    payload: { article },
});
export const markArticleAsRead = (articleId) => ({
    type: MARK_ARTICLE_AS_READ,
    payload: { articleId },
});

/*
    Selectors
*/
export const articlesSelector = (state) => ( Object.values(state.Articles.items) );
export const articleSelector = (state, id) => ( state.Articles.items[id] );
