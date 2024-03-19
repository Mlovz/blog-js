import React from "react";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, register} from "../../redux/actions/authAction";

const Header = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const authData = useSelector(state => state.auth.authData)

    const navigateLogin = () => {
        navigate("/login");
    };

    const navigateRegister = () => {
        navigate("/register");
    };

    const onLogout = () => {
      dispatch(logout())
    }

    return (
        <div className={styles.header}>
            <div className="container">
                <div className={styles.wrap}>
                    <Link to="/" className={styles.logo}></Link>

                    {
                        authData ? <div className={styles.row}>
                                <Button variant='outline' onClick={onLogout}>Выйти</Button>
                                <Button>Добавить пост</Button>
                              <Link to='/profile' className={styles.row}>
                                <img className={styles.avatar} src={authData.avatar} alt=""/>
                                <span>{authData.username}</span>
                              </Link>

                            </div>
                            :
                            <div className={styles.row}>
                                <Button onClick={navigateLogin} variant="solid">
                                    Войти
                                </Button>
                                <Button onClick={navigateRegister} variant="outline">
                                    Регистрация
                                </Button>
                            </div>

                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
