import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
    const [error, setError] = React.useState({ input: 0, message: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function LogIn() {
        const body = {
            password: document.getElementById("sing-up-password").value,
            accept: document.getElementById("sing-up-accept").checked,
            email: document.getElementById("sing-up-email").value,
            recaptcha_token: null,
        };
        let error_check = !body.accept
            ? { input: 3, message: "Согласие на обработку обязательно" }
            : !/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(body.email)
            ? { input: 1, message: "Неправильный формат почты" }
            : body.password == ""
            ? { input: 2, message: "Введите пароль" }
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
                    navigate("/profile");
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
                        message: "Неправильный E-mail или пароль",
                    });
                    return;
                });
        });
    }
    return (
        <div className="Login">
            <div className="right">
                <div>
                    <h2>Добро пожаловать!</h2>
                    <p>
                        Введите свои личные данные и откройте для себя новый мир
                        возможностей
                    </p>
                    <Link to="../sing-up">
                        <button>Регистрация</button>
                    </Link>
                </div>
            </div>
            <form
                className="form"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        LogIn();
                    }
                }}
            >
                <h1>Вход в аккаунт</h1>
                <input
                    type="email"
                    placeholder="E-mail"
                    id="sing-up-email"
                    className={error.input == 1 ? "error" : ""}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    id="sing-up-password"
                    className={error.input == 2 ? "error" : ""}
                />
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="sing-up-accept"
                        className={error.input == 3 ? "error" : ""}
                    />
                    <label>Согласие на обработку персональных данных</label>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            LogIn();
                        }}
                    >
                        Войти
                    </button>
                </div>
                {error.input != 0 ? (
                    <p className="error-message">{error.message}</p>
                ) : (
                    ""
                )}
                <p className="already">
                    Нет аккаунта? <Link to="../sing-up">Регистрация</Link>
                </p>
            </form>
        </div>
    );
}
