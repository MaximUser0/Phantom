import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../redux/slices/authSlice";

export default function SingUp() {
    const [error, setError] = React.useState({ input: 0, message: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function signUp() {
        const body = {
            name: document.getElementById("sing-up-name").value,
            number_phone: document.getElementById("sing-up-number").value,
            password: document.getElementById("sing-up-password").value,
            password_repeat: document.getElementById("sing-up-password-rep")
                .value,
            accept: document.getElementById("sing-up-accept").checked,
            email: document.getElementById("sing-up-email").value,
            recaptcha_token: null,
        };
        let error_check =
            body.password != body.password_repeat
                ? { input: 5, message: "Пароли должны совпадать" }
                : !body.accept
                ? { input: 6, message: "Согласие на обработку обязательно" }
                : body.password.length < 8
                ? { input: 4, message: "Пароль должен быть больше 8 символов" }
                : !/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(body.email)
                ? { input: 3, message: "Неправильный формат почты" }
                : !/^[а-яА-Яa-zA-Z0-9]+ +[а-яА-Яa-zA-Z0-9]+$/.test(body.name)
                ? {
                      input: 1,
                      message:
                          "Имя и фамилия должны писаться через пробел, без спец. символов",
                  }
                : !/[+0-9]{11,15}/.test(body.number_phone)
                ? {
                      input: 2,
                      message:
                          "Номер телефона должен содежать тольцо цифры и '+'",
                  }
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
                .post(window.location.origin + "/api/signup", body, {})
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
                            input: 6,
                            message:
                                "Вы не прошли reCaptcha, попробуйте ещё раз.",
                        });
                    }
                    if (
                        typeof error.response.data.errors.email !== "undefined"
                    ) {
                        setError({
                            input: 3,
                            message: "Такая почта уже существует",
                        });
                        return;
                    }
                });
        });
    }
    return (
        <div className="SingUp">
            <div className="form">
                <h1>Регистрация</h1>
                <input
                    type="text"
                    placeholder="Имя и фамилия"
                    id="sing-up-name"
                    className={error.input == 1 ? "error" : ""}
                />
                <input
                    type="text"
                    placeholder="Номер телефона"
                    id="sing-up-number"
                    className={error.input == 2 ? "error" : ""}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    id="sing-up-email"
                    className={error.input == 3 ? "error" : ""}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    id="sing-up-password"
                    className={error.input == 4 ? "error" : ""}
                />
                <input
                    type="password"
                    placeholder="Повтор пароля"
                    id="sing-up-password-rep"
                    className={error.input == 5 ? "error" : ""}
                />
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="sing-up-accept"
                        className={error.input == 6 ? "error" : ""}
                    />
                    <label>Согласие на обработку персональных данных</label>
                    <button
                        onClick={() => {
                            signUp();
                        }}
                    >
                        Регистрация
                    </button>
                </div>
                {error.input != 0 ? (
                    <p className="error-message">{error.message}</p>
                ) : (
                    ""
                )}
                <p className="already">
                    Уже есть аккаунт? <Link to="../login">Войти</Link>
                </p>
            </div>
            <div className="right">
                <div>
                    <h2>Добро пожаловать!</h2>
                    <p>
                        Чтобы оставаться на связи с нами, пожалуйста, войдите в
                        систему, указав свои личные данные
                    </p>
                    <Link to="../login">
                        <button>Войти</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
