import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import formClasses from './userForms.module.scss';

import * as actions from '../../actions';

const UserForm = ({  changeLoading, title, children }) => {

    useEffect(() => {
        changeLoading(false);
    });

    return (
        <div className={formClasses.form}>
            <title className={formClasses.title}>{title}</title>
            {children}
        </div>
    );    
};

export default connect(null, actions)(UserForm);

UserForm.defaultProps = {
    title: null,
    children: null,
    changeLoading: (() => {}),
};

UserForm.propTypes = {
    title: PropTypes.string,
    children: PropTypes.instanceOf(Object),
    changeLoading: PropTypes.func,
};