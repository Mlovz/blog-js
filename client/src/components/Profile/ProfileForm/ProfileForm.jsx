import React, {useState} from 'react';
import styles from './ProfileForm.module.scss'
import Input from "../../input/input";
import Button from "../../Button/Button";
import {useDispatch} from "react-redux";
import {updateUser} from "../../../redux/actions/authAction";

const ProfileForm = ({auth}) => {
    const [userData, setUserData] = useState({
        username: '',
        website: '',
        desc: ''
    })

    const {username, website, desc} = userData

    const [file, setFile] = useState(null)
const isDisabled = !username && !website && !desc

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if (file) setFile(file)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (isDisabled) return

        dispatch(updateUser(userData, file, auth))
        setUserData({
            username: '',
            desc: '',
            website: ''
        })
    };


    return (
        <div className={styles.card}>
            <h2>Изменить профиль</h2>

            <form className={styles.col} onSubmit={onSubmit}>
                <label htmlFor='file' className={styles.avatar}>
                    <img src={file ? URL.createObjectURL(file) : auth?.avatar} alt=""/>
                    <input type="file" id='file' onChange={changeAvatar}/>
                </label>

                <Input name='username' value={username} placeholder='Username' onChange={handleChange}/>
                <Input name='website' value={website} placeholder='Website' onChange={handleChange}/>
                <Input name='desc' value={desc} placeholder='Description' onChange={handleChange}/>
                <Button disabled={isDisabled} max type='submit'>Сохранить</Button>
            </form>
        </div>
    );
};

export default ProfileForm;