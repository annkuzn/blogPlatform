import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import articleClasses from './fullArticle.module.scss';

import * as actions from '../../../actions';
import Article from '../article/article';

const FullArticle = ({ slug, getArticle, changeLoading, changeError, user }) => {
    
    const [ article, setArticle ] = useState(null);

    useEffect(() => {
        changeLoading(true);

        getArticle(slug)
        .then(res => {
            if (res) setArticle(res.article);
        });

        return () => {
            changeError(false);
        };
    }, [changeError, changeLoading, getArticle, slug]);

    const btns = user && article ? article.author.username === user.username : false;

    const fullArticle = article ? <Article item={article} fullText={article.body} btns={btns}/> : null;
    
    return (
        <div className={articleClasses.article}>
            {fullArticle}
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.userData,
    favorites: state.articles.favorites,
});

export default connect(mapStateToProps, actions)(FullArticle);

FullArticle.defaultProps = {
    slug: null,
    user: null,
    getArticle: (() => {}),
    changeLoading: (() => {}),
    changeError: (() => {}),
};

FullArticle.propTypes = {
    slug: PropTypes.string,
    user: PropTypes.instanceOf(Object),
    getArticle: PropTypes.func,
    changeLoading: PropTypes.func,
    changeError: PropTypes.func,
};