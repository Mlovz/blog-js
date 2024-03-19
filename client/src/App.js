import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import Loading from "./components/Loading/Loading";
import Alert from "./components/Alert/Alert";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getAuthUser} from "./redux/actions/authAction";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuthUser())
    },[dispatch])

    return (
        <div className="App">
            <Header/>

            <Loading/>
            <Alert/>

            <main>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;
