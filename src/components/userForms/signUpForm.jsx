import React from 'react';

import routePaths from '../../routePaths';
import blogApi from '../../services/blogApi';
import Form from './form/form';
import FormLink from './formLink/formLink';
import UserForm from './userForm';

const SignUpForm = () => {
    const inputs = ['username', 'email', 'password', 'repeatPassword', 'processPersonalInform'];
        
    return (
        <UserForm title='Create new account'>
            <Form
                btn='Create'
                inputs={inputs}
                handleDataApi={blogApi.signUp}
            />
            <FormLink
                link={routePaths.signIn}
                linkName='Sign In'
                span='Already have an account? '
            />
        </UserForm>
    );    
};

export default SignUpForm;