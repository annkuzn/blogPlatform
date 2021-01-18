export const getNewFavorites = (favorites, oldSlag, newSlug) => {
    let newFavorites = [...favorites, newSlug];

    if (favorites.includes(oldSlag)) {
        const ind = favorites.indexOf(newSlug);
        favorites.splice(ind, 1);
        newFavorites = [...favorites];
    };

    return newFavorites;
};

export const isValidUser = (object) => {
    if (typeof object !== 'object') return false;

    const { email, token, username } = object;
    
    return typeof email === 'string'
        && typeof token === 'string'
        && typeof username === 'string'
};