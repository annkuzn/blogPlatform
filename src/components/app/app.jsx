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

const App = ({ loading, error, updateUserData, changeError }) => {

    useEffect(() => {
        if (localStorage.user) {
            updateUserData(JSON.parse(localStorage.user));
        };
    },[updateUserData]);

    const loader = loading ? <Spin size='large' className={appClasses.spin}/> : null;
    const errorMessage = error ? (
                            <Alert 
                                type='error' 
                                message='Error' 
                                description={error} 
                                style={{padding: '20px 30px'}}
                                className={appClasses.error}
                                closable
                                afterClose={() => {changeError(false)}}
                                />
                        ) : null;

    return (
        <>
            <Router>
                <Header />
                {loader}
                {errorMessage}
                <RouteSwitch />
            </Router>
        </>
    )};

const mapStateToProps = (state) => ({
    loading: state.loading,
    error: state.error,
});

export default connect(mapStateToProps, actions)(App);

App.defaultProps = {
    loading: true,
    error: false,
    updateUserData: (() => {}),
    changeError: (() => {}),
};

App.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    updateUserData: PropTypes.func,
    changeError: PropTypes.func,
};