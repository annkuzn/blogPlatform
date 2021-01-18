import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import routePaths from '../../routePaths';

import ArticlesList from '../articles/articlesList/articlesList';
import FullArticle from '../articles/fullArticle/fullArticle';
import PrivateRoute from './privateRoute';
import SignInForm from '../userForms/signInForm';
import SignUpForm from '../userForms/signUpForm';
import ProfileForm from '../userForms/profileForm';
import EditArticleForm from '../articles/forms/editArticleForm';
import CreateArticleForm from '../articles/forms/createArticleForm';


const RouteSwitch = ({ updateUserData }) => {
    const { mainPage, signIn, signUp, editProfile, articles, article, createArticle, editArticle, logOut } = routePaths;

    return (
        <Switch>
            <Route path={mainPage} component={ArticlesList} exact />
            <Route path={signIn} component={SignInForm} />
            <Route path={signUp} component={SignUpForm} />
            <PrivateRoute path={editProfile} component={ProfileForm} />
            <Route path={articles} component={ArticlesList} exact/>
            <Route path={article} 
                    render = {
                        ({ match }) => <FullArticle slug={match.params.slug}/>
                    } />
            <PrivateRoute path={createArticle} component={CreateArticleForm} />
            <Route path={editArticle}
                    render = {
                        ({ match }) => <EditArticleForm slug={match.params.slug}/>
                    } />
            <Route path={logOut} 
                    render = {
                        () => {
                            updateUserData(null);
                            
                            return <Redirect to={articles}/>
                        }
                    } />
            <Redirect to={articles}/>   
        </Switch>
    );
};

export default connect(null, actions)(RouteSwitch);

RouteSwitch.defaultProps = {
    updateUserData: (() => {}),
};

RouteSwitch.propTypes = {
    updateUserData: PropTypes.func,
};