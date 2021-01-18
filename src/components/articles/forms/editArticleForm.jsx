import React from 'react';
import PropTypes from 'prop-types';


import articleFormClasses from './articleForm.module.scss';

import blogApi from '../../../services/blogApi';
import ArticleForm from './articleForm';


const EditArticleForm = ({ slug }) => (
    <div className={articleFormClasses.form}>
        <title className={articleFormClasses.title}>Edit article</title>
        <ArticleForm
            processData={blogApi.editArticle}
            autocomplete
            slug={slug}
        />
    </div>
);

export default EditArticleForm;

EditArticleForm.defaultProps = {
    slug: null,
};

EditArticleForm.propTypes = {
    slug: PropTypes.string,
};