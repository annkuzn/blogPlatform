import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import articleClasses from './article.module.scss';

import * as actions from '../../../actions';
import routePaths from '../../../routePaths';
import likeImg from '../../../img/Vector.svg';
import redLikeImg from '../../../img/redLike.svg';
import noAvatarImg from '../../../img/noAvatar.jpg';
import ChangeArticalButtons from '../changeArticalButtons/changeArticalButtons';


const Article = ({ user, item, btns, favorites, fullText, changeFavoriteStatus }) => {
	
	const [ article, setArticle ] = useState(item);
	const [ imageSrc, setImageSrc ] = useState(article.author.image);

	useEffect(() => {
		setArticle(item);
	},[item]);
	
	const tags = article.tagList.map(tag => {
		const key = `${tag}${article.createdAt}`;

		return <li key={key} className={articleClasses.tag}>{tag}</li>;
	});

	const buttons = btns ? <ChangeArticalButtons slug={article.slug} token={user.token} /> : null;

	const body = fullText ? <pre className={articleClasses.fullText}>{fullText}</pre> : null;
	
	const link = routePaths.article.replace(/:slug/, article.slug);

	const like = favorites.includes(article.slug) ? redLikeImg : likeImg;
	
	const favoritesBtnClickHandler = () => {
		changeFavoriteStatus(favorites, article.slug, user.token)
		.then(res => setArticle(res));
	};

	const imgDownloadErrorHandler = () => setImageSrc(noAvatarImg);

	return (
		<div className={articleClasses.article}>
			<Link to={link} className={articleClasses.title} >{article.title}</Link>
			<img className={articleClasses.img} src={imageSrc} onError={imgDownloadErrorHandler} alt="avatar"/>
			<span className={articleClasses.author} >{article.author.username}</span>
			<span className={articleClasses.data}>{format(new Date(article.createdAt), 'PP')}</span>
			<ul className={articleClasses.tags}>{tags}</ul>
			<div className={articleClasses.favorites}>
				<button type='submit' disabled={!user} className={articleClasses.favoritesBtn} onClick={favoritesBtnClickHandler}>
					<img src={like} alt="like"/>
				</button>
				<span className={articleClasses.favoritesCount}>{article.favoritesCount}</span> 
			</div>
			{buttons}
			<p className={articleClasses.text}>{article.description}</p>
			{body}
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.user.userData,
	favorites: state.articles.favorites,
});

export default connect(mapStateToProps, actions)(Article);

Article.defaultProps = {
	user: null,
	item: null,
	btns: false,
	favorites: [],
	fullText: null,
	changeFavoriteStatus: (() => {}),
};

Article.propTypes = {
	user: PropTypes.instanceOf(Object),
	item: PropTypes.instanceOf(Object),
	btns: PropTypes.bool,
	favorites: PropTypes.arrayOf(PropTypes.string),
	fullText: PropTypes.string,
	changeFavoriteStatus: PropTypes.func,
};