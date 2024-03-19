import React, {useState} from 'react';
import Input from "../../components/input/input";
import styles from './auth.module.scss'
import Button from "../../components/Button/Button";
import {useDispatch} from "react-redux";
import {register} from "../../redux/actions/authAction";
import {useNavigate} from "react-router-dom";
const RegisterPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        cf_password: ''
    })

    const dispatch = useDispatch()
    const navigate= useNavigate()

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(register(userData, navigate))
    }

    return (
        <div className={styles.auth}>
            <div className={styles.box}>
                <h1 className={styles.title}>Регистрация</h1>

                <form className={styles.form} onSubmit={onSubmit}>
                    <Input name='username' placeholder='Username' type='text' onChange={handleChange}/>
                    <Input name='email' placeholder='Email' type='text' onChange={handleChange}/>
                    <Input name='password' placeholder='Password' type='password' onChange={handleChange}/>
                    <Input name='cf_password' placeholder='Confirm password' type='password' onChange={handleChange}/>

                    <Button max variant='solid' type='submit'>Регистрация</Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;