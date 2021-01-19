import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';

import 'antd/dist/antd.css';
import appClasses from './app.module.scss';

import * as actions from '../../actions';
import Header from '../header/header';
import RouteSwitch from '../routes/routeSwitch';

const App = ({ error, loading, changeError, updateUserData }) => {

    useEffect(() => {
        if (localStorage.user) {
            updateUserData(JSON.parse(localStorage.user));
        };
    },[updateUserData]);

    const loader = loading ? <Spin size='large' className={appClasses.spin}/> : null;
    const errorMessage = error ? (
                            <Alert 
                                closable
                                type='error' 
                                message='Error' 
                                description={error} 
                                style={{padding: '20px 30px'}}
                                className={appClasses.error}
                                afterClose={() => {changeError(false)}}
                                />
                        ) : null;

    return (
        <Router>
            <Header />
            {loader}
            {errorMessage}
            <RouteSwitch />
        </Router>
    );
};

const mapStateToProps = (state) => ({
    error: state.error,
    loading: state.loading,
});

export default connect(mapStateToProps, actions)(App);

App.defaultProps = {
    error: false,
    loading: true,
    changeError: (() => {}),
    updateUserData: (() => {}),
};

App.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    loading: PropTypes.bool,
    changeError: PropTypes.func,
    updateUserData: PropTypes.func,
};