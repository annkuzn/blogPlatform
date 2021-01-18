import * as yup from 'yup';

const passwordSchema = yup.string()
                            .required('Required field')
                            .min(8, 'Your password needs to be at least 8 characters')
                            .max(40, 'Your password must be less than 40 characters long');

const allInputs = {
    username: {
        label: 'Username',
        placeholder: 'Username',
        name: 'username',
        schema: yup.string()
                    .required('Required field')
                    .min(3, 'Username needs to be at least 3 characters')
                    .max(20, 'Username must be less than 20 characters long'),
    },
    email: {
        label: 'Email address',
        placeholder: 'Email address',
        name: 'email',
        schema: yup.string()
                    .required('Required field')
                    .email('Must be a valid email'),
    },
    password: {
        inputType: 'password',
        label: 'Password',
        placeholder: 'Password',
        name: 'password',
        schema: passwordSchema,
    },
    repeatPassword: {
        inputType: 'password',
        label: 'Repeat Password',
        placeholder: 'Password',
        name: 'repeatPassword',
        validateFn: (value, fn) => ( value === fn('password') || 'Неправильно повторен пароль'),
        schema: yup.string().oneOf([yup.ref('password')], 'Passwords don\'t match'),
    },
    newPassword: {
        inputType: 'password',
        label: 'New password',
        placeholder: 'New password',
        name: 'newPassword',
        schema: passwordSchema,
    },
    processPersonalInform: {
        inputType: 'checkbox',
        label: 'I agree to the processing of my personal information',
        checked: true,
        name: 'processPersonalInform',
    },
    image: {
        label: 'Avatar image (url)',
        placeholder: 'Avatar image',
        name: 'image',
        message: 'Неправильно введен URL',
        schema: yup.string()
                    .url('Must be a valid URL'),
    },
};

export default allInputs;