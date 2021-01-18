import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'antd';

import articlesClasses from './articlesList.module.scss';
import * as actions from '../../../actions';

import Article from '../article/article';

const ArticlesList = ({ getArticles, loading, changeLoading, changeError }) => {
	
	const [ articles, setArticles ] = useState(null);
	const [ articlesCount, setArticlesCount] = useState(null);
	const [ currentPage, setCurrentPage ] = useState(1);

	useEffect(() => {
		changeLoading(true);

		getArticles(currentPage)
		.then(res => {
			setArticles(res.articles);
			setArticlesCount(res.articlesCount);
		});

		return () => {
            changeError(false);
        };
	}, [getArticles, currentPage, changeError, changeLoading]);

	const paginationChangeHandler = (page) => {
		changeLoading(true);
		setCurrentPage(page);
    };

	const list = articles ? articles.map(item => {
		const key = `${item.slug}${item.createdAt}`;

		return <li key={key}><Article item={item} /></li>
	}) : null;

	const pagination = <Pagination 
                hideOnSinglePage
                total={articlesCount}
                defaultPageSize={20}
                current={currentPage}
                showSizeChanger={false}
                size="small"
                className={articlesClasses.pagination}
                onChange={paginationChangeHandler}
            />

	return !loading ? (
		<>
			<ul className={articlesClasses.list}>
					{list}
			</ul>
			{pagination}
		</>	
	) : null;
};

const mapStateToProps = (state) => ({
	favorites: state.articles.favorites,
	loading: state.loading,
});

export default connect(mapStateToProps, actions)(ArticlesList);

ArticlesList.defaultProps = {
	getArticles: (() => {}),
	loading: true,
	changeError: (() => {}),
	changeLoading: (() => {}),
};

ArticlesList.propTypes = {
	getArticles: PropTypes.func,
	loading: PropTypes.bool,
	changeError: PropTypes.func,
	changeLoading: PropTypes.func,
};