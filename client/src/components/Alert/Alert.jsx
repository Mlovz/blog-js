import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './Alert.module.scss'
import {GLOBAL} from "../../redux/types/globalTypes";

const Alert = () => {
    const error = useSelector(state => state.global.error)

    const dispatch = useDispatch()
    const onClearError = () => {
        dispatch({type: GLOBAL.ERROR, payload: ''})
    }

    useEffect(() => {
        if (error) {
            let timer = setTimeout(() => {
                dispatch({type: GLOBAL.ERROR, payload: ''})
            }, 2000)

            return ()=> {
                clearTimeout(timer)
            }
        }
    },[error])

    if (error) {
        return (
            <div className={styles.alert}>
                <div className={styles.header}>
                    <h3>Error</h3>
                    <span onClick={onClearError}>&times;</span>
                </div>
                <p>{error}</p>
            </div>
        );
    }

    return null
};

export default Alert;