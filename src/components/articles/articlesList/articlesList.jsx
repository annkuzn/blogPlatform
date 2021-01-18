import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'antd';

import articlesClasses from './articlesList.module.scss';
import * as actions from '../../../actions';

import Article from '../article/article';

const ArticlesList = ({ articles, articlesCount, getArticles, currentPage, loading, changeCurrentPage, changeLoading, changeError, favorites }) => {
	
	useEffect(() => {
		getArticles(currentPage);
		return () => {
            changeError(false);
        };
	}, [getArticles, currentPage, changeError]);

	const paginationChangeHandler = (page) => {
		changeLoading(true);
		changeCurrentPage(page);
    };

	const list = articles ? articles.map(item => {
		const key = `${item.slug}${item.createdAt}`;

		return <li key={key}><Article item={item} favorites={favorites}/></li>
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
	articles: state.articles.articleList,
	articlesCount: state.articles.articlesCount,
	favorites: state.articles.favorites,
	currentPage: state.currentPage,
	loading: state.loading,
});

export default connect(mapStateToProps, actions)(ArticlesList);

ArticlesList.defaultProps = {
	articles: [],
	articlesCount: 0,
	getArticles: (() => {}),
	currentPage: 1,
	favorites: [],
	loading: true,
	changeError: (() => {}),
	changeCurrentPage: (() => {}),
	changeLoading: (() => {}),
};

ArticlesList.propTypes = {
	articles: PropTypes.arrayOf(PropTypes.object),
	articlesCount: PropTypes.number,
	getArticles: PropTypes.func,
	currentPage: PropTypes.number,
	favorites: PropTypes.arrayOf(PropTypes.string),
	loading: PropTypes.bool,
	changeError: PropTypes.func,
	changeCurrentPage: PropTypes.func,
	changeLoading: PropTypes.func,
};