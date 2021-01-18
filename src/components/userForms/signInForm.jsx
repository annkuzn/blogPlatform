import React from 'react';

import routePaths from '../../routePaths';
import blogApi from '../../services/blogApi';
import Form from './form/form';
import FormLink from './formLink/formLink';
import UserForm from './userForm';

// eslint-disable-next-line react/prop-types
const SignInForm = ({ location }) => {
    const inputs = ['email', 'password'];
        
    return (
        <UserForm title='Sign In'>
            <Form
                btn='Log in'
                inputs={inputs}
                handleDataApi={blogApi.signIn}
                location={location}
            />
            <FormLink
                link={routePaths.signUp}
                linkName='Sign Up'
                span='Don’t have an account? '
            />
        </UserForm>
    );    
};

export default SignInForm;
