import axios from "axios";
import React from "react";
import back_image from "../assets/img/login_image.png";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
    const [error, setError] = React.useState({ input: 0, message: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="Login">
            <form
                className="form"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        LogIn();
                    }
                }}
                onChange={() => setError({ input: 0, message: "" })}
            >
                <h1>Авторизация</h1>
                <Link to={"../sing-up"} className="desktop-only">
                    Регистрация
                </Link>
                <label>Логин</label>
                <input
                    type="text"
                    placeholder="Логин"
                    id="login"
                    className={error.input == 1 ? "error" : ""}
                />
                <label>Пароль</label>
                <input
                    type="password"
                    placeholder="Пароль"
                    id="login-password"
                    className={error.input == 2 ? "error" : ""}
                />
                <p>
                    Забыли пароль? <a>Смена пароля</a>
                </p>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        LogIn();
                    }}
                >
                    Войти
                </button>
                <Link to={"../sing-up"} className="mobile-only">
                    Регистрация
                </Link>
                {error.input != 0 ? (
                    <p className="error-message">{error.message}</p>
                ) : (
                    ""
                )}
            </form>
            <video id="back-video" autoPlay muted loop>
                <source src="img/background.mp4" type="video/mp4" />
            </video>
            <img id="back-img" src={back_image}/>
        </div>
    );
    function LogIn() {
        const body = {
            password: document.getElementById("login-password").value,
            name: document.getElementById("login").value.trim(),
            recaptcha_token: null,
        };
        let error_check =
            body.password == ""
                ? { input: 2, message: "Введите пароль" }
                : body.name == ""
                ? { input: 1, message: "Введите имя" }
                : { input: 0, message: "" };
        setError(error_check);
        if (error_check.input > 0) return;

        grecaptcha.enterprise.ready(async () => {
            const token = await grecaptcha.enterprise.execute(
                "6LfzjLAqAAAAAASZvgT8XW8DxlDdta9OiZr5cUzR",
                {
                    action: "LOGIN",
                }
            );

            body.recaptcha_token = await token;
            console.log(body.recaptcha_token);
            axios
                .post(window.location.origin + "/api/login", body, {})
                .then((response) => {
                    console.log(response.data);
                    dispatch(setToken(response.data.token));
                    dispatch(setUser(response.data.user));
                    navigate("../profile");
                })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.data == "The captcha blocked access") {
                        setError({
                            input: 3,
                            message:
                                "Вы не прошли reCaptcha, попробуйте ещё раз.",
                        });
                        return;
                    }
                    if (error.response.data == "You are blocked") {
                        setError({
                            input: 1,
                            message: "Ваш аккаунт заблокирован!",
                        });
                        return;
                    }
                    setError({
                        input: 1,
                        message: "Неправильное имя или пароль",
                    });
                    return;
                });
        });
    }
}
