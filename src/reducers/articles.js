import types from '../actionsTypes';

const initialState = {
    articleList: [],
    articlesCount: null,
    article: null,
    favorites: [],
};

const articles = (state = initialState, action) => {
    switch (action.type) {
        case types.articles:
            return {...state, articleList: action.articles};
        case types.articlesCount:
            return {...state, articlesCount: action.articlesCount};
        case types.article:
            return {...state, article: action.article};
        case types.favorites:
            return {...state, favorites: action.favorites};
      default:
        return state;
    };
};

export default articles;