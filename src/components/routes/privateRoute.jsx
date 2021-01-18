
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import routePaths from '../../routePaths';

const PrivateRoute = ({isLogin, component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isLogin ? <Component {...props} />
        : <Redirect to={routePaths.signIn} />
    )} />
);

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin,
});

export default connect(mapStateToProps, actions)(PrivateRoute);

PrivateRoute.defaultProps = {
    isLogin: false,
    component: null,
};

PrivateRoute.propTypes = {
    isLogin: PropTypes.bool,
    component: PropTypes.instanceOf(Object),
};