import React from 'react';

import articleFormClasses from './articleForm.module.scss';

import blogApi from '../../../services/blogApi';
import ArticleForm from './articleForm';

const CreateArticleForm = () => (
    <div className={articleFormClasses.form}>
        <title className={articleFormClasses.title}>Create new article</title>
        <ArticleForm
            processData={blogApi.createArticle}
        />
    </div>
);

export default CreateArticleForm;