const apiBase = "https://conduit.productionready.io/api/";

const getResource = (path, errorMes) => (
    fetch(path)
    .then(res => {
        if (!res.ok) {
            throw new Error(errorMes)
        };
        return res.json();
    })
);

const processData = (path, bodyData, errorMes, token, method = 'POST') => {
    const authHeader = token ? `Token ${token}` : '';

    return fetch(path, {
        method,
        body: bodyData,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader,
        },
    })
    .then(res => {
        if (!res.ok) {
            throw Error(errorMes)
        };

        return res.json();
    })
};

const blogApi = {

    getArticlesList (offset)  {
        const path = `${apiBase}articles?offset=${offset}`;
        const errorMes = 'Could not get list of articles.';

        return getResource(path, errorMes);
    },

    getArticle (slug) {
        const path = `${apiBase}articles/${slug}`;
        const errorMes = 'Could not get the article.';

        return getResource(path, errorMes);
    },

    signUp (data) {
        const { username, email, password } = data;

        const path = `${apiBase}users`;
        const bodyData = JSON.stringify({
            "user":{
                "username": username,
                "email": email,
                "password": password
            }
        });
        const errorMes = 'Failed to sign up';

        return processData(path, bodyData, errorMes);
    },

    signIn (data) {
        const { email, password } = data;

        const path = `${apiBase}users/login`;
        const bodyData = JSON.stringify({
            "user":{
              "email": email,
              "password": password
            }
        });
        const errorMes = 'Failed to log in';

        return processData(path, bodyData, errorMes);
    },

    editProfile (data, token) {
        const { username, email, newPassword: password, image } = data;
        
        const path = `${apiBase}user`;
        const bodyData = JSON.stringify({
            "user":{
              "email": email,
              "password": password,
              "username": username,
              "image": image,
            }
        });
        const errorMes = 'Could not edit profile';
        const method = 'PUT';

        return processData(path, bodyData, errorMes, token, method);
    },

    createArticle (data, token) {
        const path = `${apiBase}articles`;
        const bodyData = JSON.stringify({"article": data});
        const errorMes = 'Could not create article';

        return processData(path, bodyData, errorMes, token);
    },

    editArticle (data, token, slug) {
        const path = `${apiBase}articles/${slug}`;
        const bodyData = JSON.stringify({"article": data});
        const errorMes = 'Could not edit article';
        const method = 'PUT';

        return processData(path, bodyData, errorMes, token, method);
    },

    deleteArticle (slug, token) {
        const path = `${apiBase}articles/${slug}`;
        const bodyData = null;
        const errorMes = 'Could not delete article';
        const method = 'DELETE';

        return processData(path, bodyData, errorMes, token, method);
    }, 

    favoriteArticle (slug, token) {
        const path = `${apiBase}articles/${slug}/favorite`;
        const bodyData = null;
        const errorMes = 'Could not favorite article';

        return processData(path, bodyData, errorMes, token);
    },

    unFavoriteArticle (slug, token) {
        const path = `${apiBase}articles/${slug}/favorite`;
        const bodyData = null;
        const errorMes = 'Could not unfavorite article';
        const method = 'DELETE';

        return processData(path, bodyData, errorMes, token, method);
    },

    getFavoritedArticles (author) {
        const path = `${apiBase}articles?favorited=${author}`;
        const errorMes = 'Could not get list of favorited articles.';

        return getResource(path, errorMes);
    },
};

export default blogApi;