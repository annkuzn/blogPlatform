import types from '../actionsTypes';

const initialState = {
    article: null,
    favorites: [],
};

const articles = (state = initialState, action) => {
    switch (action.type) {
        case types.article:
            return {...state, article: action.article};
        case types.favorites:
            return {...state, favorites: action.favorites};
      default:
        return state;
    };
};

export default articles;