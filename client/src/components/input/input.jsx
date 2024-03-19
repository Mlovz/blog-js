import React from 'react';
import styles from './input.module.scss'

const Input = (props) => {
    const {...rest} = props


    return (
        <input className={styles.input} {...rest} />
    );
};

export default Input;