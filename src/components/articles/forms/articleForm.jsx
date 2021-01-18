import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom';

import articleFormClasses from './articleForm.module.scss';

import routePaths from '../../../routePaths';
import * as actions from '../../../actions';
import Input from '../../input/input';
import inputs from './inputs';



const DeleteBtn = ({ fn }) => (
    <Button danger onClick={fn} className={articleFormClasses.tagBtn} size='large' >Delete</Button>
)


const ArticleForm = ({ processData, autocomplete, article, changeLoading, changeError, user, slug, updateArticle }) => {

    const [ redirect, setRedirect ] = useState(false);
    const [ tagList, setTagList ] = useState([]);
    const [ tagInputValue, setTagInputValue ] = useState('');
    const [ disabledSendBtn, setDisabledSendBtn] = useState(false);

    useEffect(() => {
        changeLoading(false);
        changeError(false);

        if (article && autocomplete) setTagList(article.tagList);
    }, [article, changeError, changeLoading, autocomplete]);


    const schemaObj = inputs.reduce((acc, item) => (
        {...acc, [item.name]: item.schema}), {});

    const schema = yup.object().shape(schemaObj);

    const { errors, handleSubmit, register: registerRHF } = useForm({
        resolver: yupResolver(schema),
    });

    
    if (redirect) {
        const link = routePaths.article.replace(/:slug/, article.slug);
        return <Redirect to={link} />
    };


    const deleteTag = (ind) => {
        if (!ind) {
            setTagInputValue('');
        } else {
            tagList.splice(ind, 1);
            setTagList([...tagList]);
        };
    };

    const addTag = () => {
        setTagList([...tagList, tagInputValue]);
        setTagInputValue('');
    };

    const tagDeleteButtonClickHandler = (key) => {
        deleteTag(key);
    };

    const inputList = inputs.map(item => {
        const error = errors[item.name]?.message;
        const value = (article && autocomplete) ? article[item.name] : null;

        return  <Input 
                    inputData={item}
                    error={error}
                    registerRHF={registerRHF}
                    value={value}
                    className={articleFormClasses.input}
                />
    });

    const tags = tagList.map((item, ind) => {
        const key = `tag${item}${ind}`;

        return (
            <li key={key} className={articleFormClasses.tagListItem}>
                <Input  
                    value={item}
                    error={errors.tag?.message}
                    registerRHF={registerRHF}
                />
                <DeleteBtn fn={() => {tagDeleteButtonClickHandler(ind)}} />
            </li>
        );
    });

    const formSubmitHandler = (data) => {
        setDisabledSendBtn(true);
        processData({...data, tagList}, user.token, slug)
        .then(res => {
            updateArticle(res.article);
            setRedirect(true);
        })
        .catch(err => changeError(err.message));
    };

    const addTagButtonClickHandler = () => {
        addTag();
    };

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            {inputList}
            <label htmlFor='tags' className={articleFormClasses.label}>Tags</label>
            <ul className={articleFormClasses.tagList}>
                {tags}
                <li key='tagInput' className={articleFormClasses.tagListItem}>
                        <Input 
                            inputData={{placeholder: 'Tag'}}
                            error={errors.tag?.message}
                            registerRHF={registerRHF}
                            value={tagInputValue}
                            onChangeFn={(event) => {setTagInputValue(event.target.value)}}
                        />
                    <DeleteBtn fn={() => {tagDeleteButtonClickHandler()}}/>
                    <Button type='primary' ghost className={articleFormClasses.tagBtn} onClick={addTagButtonClickHandler} size='large'>Add tag</Button>
                </li>
            </ul>
            <Button type='primary' htmlType='submit' size='large' className={articleFormClasses.btn} disabled={disabledSendBtn}>Send</Button>
        </form>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.userData,
    article: state.articles.article,
});

export default connect(mapStateToProps, actions)(ArticleForm);


DeleteBtn.defaultProps = {
    fn: (() => {}),
}

DeleteBtn.propTypes = {
    fn: PropTypes.func,
}

ArticleForm.defaultProps = {
    article: null,
    autocomplete: false,
    processData: (() => {}),
    user: null,
    slug: null,
    updateArticle: (() => {}),
    changeLoading: (() => {}),
    changeError: (() => {}),
};

ArticleForm.propTypes = {
    article: PropTypes.instanceOf(Object),
    autocomplete: PropTypes.bool,
    processData: PropTypes.func,
    user: PropTypes.instanceOf(Object),
    slug: PropTypes.string,
    updateArticle: PropTypes.func,
    changeLoading: PropTypes.func,
    changeError: PropTypes.func,
};