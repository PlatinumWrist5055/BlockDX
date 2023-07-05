import React from 'react';
import './Input.css';

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>):React.ReactElement => {
    return (
        <input {...props} className={`common-input ${props.className}`} />
    );
}