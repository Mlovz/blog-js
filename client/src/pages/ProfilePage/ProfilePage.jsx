import React from 'react';
import styles from './ProfilePage.module.scss'
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import ProfileForm from "../../components/Profile/ProfileForm/ProfileForm";
import {useSelector} from "react-redux";

const ProfilePage = () => {
    const authData = useSelector(state => state.auth.authData)


    return (
        <div className={styles.profile}>
            <ProfileInfo auth={authData}/>
            <ProfileForm auth={authData}/>
        </div>
    );
};

export default ProfilePage;