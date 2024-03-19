import React from 'react';
import styles from './Button.module.scss'
import clsx from "clsx";

const Button = (props) => {
    const {variant = 'solid',max, children, ...rest} = props

    return (
        <button {...rest} className={clsx(styles.btn, styles[variant], max ? styles.max : '')}>{children}</button>
    );
};

export default Button;