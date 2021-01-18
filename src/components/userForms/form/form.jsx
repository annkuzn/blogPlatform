import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'antd';

import formClasses from './form.module.scss';

import * as actions from '../../../actions';
import routePaths from '../../../routePaths';
import Input from '../../input/input';
import allInputs from '../allInputs';



const Form = ({ btn, inputs, token, handleData, handleDataApi, user, changeError, errorAlert }) => {

    const [ redirect, setRedirect ] = useState(false);
    const [ disabledBtn, setDisabledBtn ] = useState(false);
    const [ updateInputs, setUpdateInputs ] = useState(false);

    useEffect(() => (() => {
        changeError(false);
    }), [changeError]);

    const schemaObj = inputs.reduce((acc, item) => (
        {...acc, [allInputs[item].name]: allInputs[item].schema}), {})
    const schema = yup.object().shape(schemaObj);

    const { errors, handleSubmit, register: registerRHF } = useForm({
        resolver: yupResolver(schema),
    });

    if (redirect) {
        if (!errorAlert) {
            return <Redirect to={routePaths.mainPage} />;
        };
    };

    

    const inputList = inputs.map(item => {
        const error = errors[allInputs[item].name]?.message;

        const value = user ? user[item] : '';

        return (
            <>
                <Input
                    inputData={allInputs[item]}
                    error={error}
                    registerRHF={registerRHF}
                    value={value}
                    updateInputs={updateInputs}
                />
                <span className={formClasses.error}>{error}</span>
            </>
        );
    });

    const formSubmitHandler = (data) => {
        changeError(false);
        setDisabledBtn(true);
        handleData(data, handleDataApi, token)
        .then(() => {
            setRedirect(true);
        })
        .catch(err => {
            changeError(err.message);
            setDisabledBtn(false);
            setUpdateInputs(!updateInputs);
        });
    };

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            {inputList}
            <Button type='primary' htmlType='submit' size='large' className={formClasses.btn} disabled={disabledBtn}>{btn}</Button>
        </form>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.userData,
    errorAlert: state.error,
});

export default connect(mapStateToProps, actions)(Form);

Form.defaultProps = {
    btn: null,
    user: null,
    inputs: [],
    token: null,
    errorAlert: false,
    changeError: (() => {}),
    handleData: (() => {}),
    handleDataApi: (() => {}),
};

Form.propTypes = {
    btn: PropTypes.string,
    user: PropTypes.instanceOf(Object),
    inputs: PropTypes.arrayOf(PropTypes.string),
    token: PropTypes.string,
    errorAlert: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    changeError: PropTypes.func,
    handleData: PropTypes.func,
    handleDataApi: PropTypes.func,
};


