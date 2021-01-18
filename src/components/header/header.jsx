import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import headerClasses from './header.module.scss';

import routePaths from '../../routePaths';
import * as actions from '../../actions';
import noAvatarImg from '../../img/noAvatar.jpg';


const Header = ({ user }) => {

    const { articles, editProfile, signIn, signUp, createArticle, logOut } = routePaths;

    const imageSrc = user ? (user.image || noAvatarImg) : null;

    const userLink = user ? (
        <div className={headerClasses.user}>
            <Link to={editProfile} className={headerClasses.link}>{user.username}</Link>
            <img className={headerClasses.img} src={imageSrc} alt="avatar"/>
        </div>
        
    ) : null;

     const entranceBtn = user ? 'Log Out' : 'Sign In';
     const entranceLink = user ? logOut : signIn;
     const signUpBtn = !user ? (
         <Link to={signUp} className={headerClasses.link} data-btn='Sign Up'>Sign Up</Link>
     ) : null;

     const createArticleBtn = user ? (
        <Link to={createArticle} className={headerClasses.link} data-btn='Create'>Create article</Link>
     ) : null;
    
    return (
        <header className={headerClasses.header}>
            <Link to={articles} className={headerClasses.title} >Realworld Blog</Link>
            <div>
                {createArticleBtn}
                {userLink}
                <Link to={entranceLink} className={headerClasses.link} data-btn={entranceBtn}>{entranceBtn}</Link>
                {signUpBtn}
            </div>
        </header>
    )
};

const mapStateToProps = (state) => ({
	user: state.user.userData,
});

export default connect(mapStateToProps, actions)(Header);

Header.defaultProps = {
    user: null,
};

Header.propTypes = {
    user: PropTypes.instanceOf(Object),
};