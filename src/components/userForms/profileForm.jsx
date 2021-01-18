import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import blogApi from '../../services/blogApi';
import Form from './form/form';
import UserForm from './userForm';

const ProfileForm = ({ user }) => {
    const inputs = ['username', 'email', 'newPassword', 'image'];

    return (
        <UserForm title='Edit Profile'>
            <Form
                btn='Save'
                token={user.token}
                inputs={inputs}
                handleDataApi={blogApi.editProfile}
            />
        </UserForm>
    );    
};

const mapStateToProps = (state) => ({
	user: state.user.userData,
});

export default connect(mapStateToProps, actions)(ProfileForm);

ProfileForm.defaultProps = {
    user: {},
};

ProfileForm.propTypes = {
    user: PropTypes.instanceOf(Object),
};