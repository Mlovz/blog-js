import React, {useEffect, useState} from "react";
import styles from "./auth.module.scss";
import Input from "../../components/input/input";
import Button from "../../components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from "../../redux/actions/authAction";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
   dispatch(login(userData, navigate))
  }

  return (
      <div className={styles.auth}>
        <div className={styles.box}>
          <h1 className={styles.title}>Войти</h1>

          <form className={styles.form} onSubmit={onSubmit}>
            <Input name='email' placeholder="email" type="text" onChange={handleChange}/>
            <Input name='password' placeholder="Password" type="password" onChange={handleChange}/>

            <Button max variant="solid" type='submit'>
              Войти
            </Button>
          </form>
        </div>
      </div>
  );
};

export default LoginPage;
