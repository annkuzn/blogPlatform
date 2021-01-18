import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import buttonsClasses from './changeArticalButtons.module.scss';

import routePaths from '../../../routePaths';
import blogApi from '../../../services/blogApi';

const Modal = ({ changeDisplay, deleteArticle }) => {
	const modalBtnNoClickHandler = () => {
		changeDisplay(false);
	};

	const modalBtnYesClickHandler = () => {
		deleteArticle();
		changeDisplay(false);
	};

	return (
		<div className={buttonsClasses.modal}>
			<ExclamationCircleFilled  style={{ color:'#FAAD14', marginLeft: '-27px'}}/>
			<span className={buttonsClasses.modalSpan} >Are you sure to delete this article?</span>
			<div className={buttonsClasses.modalBtns}>
				<Button className={buttonsClasses.modalBtn}  type="ghost" onClick={modalBtnNoClickHandler}>
					No
				</Button>
				<Button className={buttonsClasses.modalBtn} type="primary" onClick={modalBtnYesClickHandler}>
					Yes
				</Button>
			</div>
		</div>
	);
};

const ChangeArticalButtons = ({ slug, token}) => {

	const [ redirect, setRedirect ] = useState(false);
    const [ deleteArticleModal, setDeleteArticleModal ] = useState(false);
    
	if (redirect) return <Redirect to={redirect}/>;
	
	const editArticle = () => {
		const link = routePaths.editArticle.replace(/:slug/, slug);
		setRedirect(link);
	};

	const deleteArticle = () => {
		blogApi.deleteArticle(slug, token);
		setRedirect(routePaths.articles);
	};

	const modal = deleteArticleModal ? <Modal changeDisplay={setDeleteArticleModal} deleteArticle={deleteArticle}/>: null;

	const editArticleBtnClickHandler = () => {
		editArticle();
	};

	const deleteArticleBtnClickHandler = () => {
		setDeleteArticleModal(true);
	};

	return (
		<div className={buttonsClasses.buttons}>
			<Button danger onClick={deleteArticleBtnClickHandler} className={buttonsClasses.btn} size='large' >Delete</Button>
			<Button 
				type="primary" 
				ghost 
				onClick={editArticleBtnClickHandler} 
				className={buttonsClasses.btn} 
				size='large'
				style={{color: '#52C41A', borderColor: '#52C41A'}}
			>
				Edit
			</Button>
			{modal}
		</div>
	);
};

export default ChangeArticalButtons;

Modal.defaultProps = {
	changeDisplay: (() => {}),
	deleteArticle: (() => {}),
};

Modal.propTypes = {
	changeDisplay: PropTypes.func,
	deleteArticle: PropTypes.func,
};

ChangeArticalButtons.defaultProps = {
	token: null,
	slug: null,
};

ChangeArticalButtons.propTypes = {
	token: PropTypes.string,
	slug: PropTypes.string,
};