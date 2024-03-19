import React from 'react';
import styles from './ProfileInfo.module.scss'
const ProfileInfo = ({auth}) => {

    return (
        <div className={styles.info}>
            <h2>Профиль</h2>

            <div className={styles.col}>
                <div className={styles.row}>
                    <h4>username:</h4>
                    <span>{auth?.username}</span>
                </div>
                <div className={styles.row}>
                    <h4>email:</h4>
                    <span>{auth?.email}</span>
                </div>

                <div className={styles.row}>
                    <h4>Сайт:</h4>
                    <span>{auth?.website}</span>
                </div>
                <div className={styles.row}>
                    <h4>Описание:</h4>
                    <span>{auth?.desc}</span>
                </div>

            </div>
        </div>
    );
};

export default ProfileInfo;