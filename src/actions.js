import types from './actionsTypes';
import blogApi from './services/blogApi';
import { isValidUser, getNewFavorites } from './helpers';

export const updateArticle = (artic) => ({ type: types.article, article: artic });
export const updateUser = (data) => ({ type: types.user, user: data });
export const changeFavorites = (slugs) => ({ type: types.favorites, favorites: slugs });
export const changeLoading = (bool) => ({ type: types.loading, loading: bool });
export const changeError = (err) => ({ type: types.error, error: err });
export const changeLogin = (bool) => ({ type: types.isLogin, isLogin: bool });

export const updateUserData = (data) => (dispatch) => {
    if (!data) {
        dispatch(updateUser(null));
        dispatch(changeLogin(false));
        dispatch(changeFavorites([]));
        localStorage.removeItem('user');
    } else {
        dispatch(updateUser(data));
        dispatch(changeLogin(true));

        blogApi.getFavoritedArticles(data.username)
        .then(res => {
            const favoritedArticles = res.articles.map(elem => elem.slug);
            dispatch(changeFavorites(favoritedArticles));
        })
        .catch(err => {
            dispatch(changeError(err.message));
        });
    };

};

export const getArticles = (currentPage) => (dispatch) => {
    const articlesPerPageCount = 20;
    const previousPagesCount = currentPage - 1;
    const offset = previousPagesCount * articlesPerPageCount;

    return blogApi.getArticlesList(offset)
    .then(res => {
        dispatch(changeLoading(false));
        return res;
    })
    .catch(err => {
        dispatch(changeLoading(false));
        dispatch(changeError(err.message));
    });
};

export const handleData = (data, processData, token) => (dispatch) => (
    processData(data, token)
    .then(res => {
        const isValid = isValidUser(res.user);

        if (!isValid) {
            throw new Error('Invalid user data');
        };

        dispatch(updateUserData(res.user));
        localStorage.user = JSON.stringify(res.user);
    })
);

export const getArticle = (slug) => (dispatch) => (
    blogApi.getArticle(slug)
        .then(res => {
            dispatch(updateArticle(res.article));
            dispatch(changeLoading(false));
            
            return res;
        })
        .catch(err => {
            dispatch(updateArticle(null));
            dispatch(changeLoading(false));
            dispatch(changeError(err.message));
        })
);

export const changeFavoriteStatus = (favorites, slug, token) => (dispatch) => {
    const func = !favorites.includes(slug) ? blogApi.favoriteArticle : blogApi.unFavoriteArticle;
    return func(slug, token)
        .then(res => {
            const newFavorites = getNewFavorites(favorites, slug, res.article.slug);
            dispatch(changeFavorites(newFavorites));
            return res.article;
        })
        .catch(err => {
            dispatch(changeError(err.message));
        });
};