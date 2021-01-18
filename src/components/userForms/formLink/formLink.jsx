import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import linkClasses from './formLink.module.scss';

const FormLink = ({span, link, linkName }) => (
    <span className={linkClasses.linkSpan}>
        {span}
        <Link to={link} className={linkClasses.link}> 
            {`${linkName}.`}
        </Link>
    </span>
);

export default FormLink;

FormLink.defaultProps = {
    span: null,
    link: null,
    linkName: null,    
};

FormLink.propTypes = {
    span: PropTypes.string,
    link: PropTypes.string,
    linkName: PropTypes.string,
};
