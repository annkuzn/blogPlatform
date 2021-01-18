import * as yup from 'yup';

const inputs = [
    {
        label: 'Title',
        placeholder: 'Title',
        name: 'title',
        schema: yup.string().required('Required field'),
    },
    {
        label: 'Short description',
        placeholder: 'Short description',
        name: 'description',
        schema: yup.string().required('Required field'),
    },
    {
        inputType: 'textarea',
        label: 'Text',
        placeholder: 'Text',
        name: 'body',
        schema: yup.string().required('Required field'),
    },
];

export default inputs;