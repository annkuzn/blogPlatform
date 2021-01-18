import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import inputClasses from './input.module.scss';

const Input = ({ inputData, error, registerRHF, className, value, onChangeFn, updateInputs }) => {

    const [ inputValue, setValue ] = useState(value);
    
    useEffect(() => {
        setValue(value);
        
    },[value, updateInputs]);

    const { inputType, label, placeholder, checked, name } = inputData;

    const borderStyle = inputType === 'checkbox' ? {borderTop: '1px solid #E8E8E8', marginTop: '11px', paddingTop: '11px'} : null;

    const errorBorder = inputType !== 'checkbox' && error ? { border: '1px solid #F5222D'} : null;

    const inputClassName = `${inputClasses.input} ${className}`;

    const onChanged = (event) => {
        setValue(event.target.value);

        onChangeFn(event);
    };
    
    const input = inputType !== 'textarea' ? (
                    <input 
                        className={inputClassName} 
                        type={inputType} 
                        name={name}
                        defaultChecked={checked} 
                        placeholder={placeholder}
                        ref={registerRHF}
                        value={inputValue}
                        style={{...borderStyle, ...errorBorder}}
                        onChange={onChanged}
                    />) : (
                        <textarea name={name} onChange={onChanged} value={inputValue} wrap='hard' className={inputClassName} placeholder={placeholder} ref={registerRHF} style={{...borderStyle, ...errorBorder}}/>
                    )
    const style = inputType === 'checkbox' ? {flexDirection: 'row-reverse'} : null;
    return (
        <label className={inputClasses.label} style={style}>
            {label}
            {input}
        </label>
    );
};

export default Input;

Input.defaultProps = {
    inputData: {},
    value: '',
    error: null,
    updateInputs: false,
    className: '',
    registerRHF: null,
    onChangeFn: (() => {}),
};

Input.propTypes = {
    inputData: PropTypes.instanceOf(Object),
    value: PropTypes.string,
    error: PropTypes.instanceOf(Object),
    updateInputs: PropTypes.bool,
    className: PropTypes.string,
    registerRHF: PropTypes.instanceOf(Object),
    onChangeFn: PropTypes.func,
};

