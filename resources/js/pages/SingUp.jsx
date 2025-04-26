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
            password: document.getElementById("sing-up-password").value,
            password_repeat: document.getElementById("sing-up-password-repeat")
                .value,
            email: document.getElementById("sing-up-email").value,
            accept: document.getElementById("sing-up-accept").checked,
            recaptcha_token: null,
        };
        let error_check =
            body.password != body.password_repeat
                ? { input: 3, message: "Пароли должны совпадать" }
                : !body.accept
                ? { input: 4, message: "Согласие на обработку обязательно" }
                : body.password.length < 8
                ? { input: 2, message: "Пароль должен быть больше 8 символов" }
                : !/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(body.email)
                ? { input: 1, message: "Неправильный формат почты" }
                : { input: 0, message: "" };
        setError(error_check);
        if (error_check.input > 0) return;

        grecaptcha.enterprise.ready(async () => {
            const token = await grecaptcha.enterprise.execute(
                "6LfzjLAqAAAAAASZvgT8XW8DxlDdta9OiZr5cUzR",
                {
                    action: "SIGNUP",
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
                    navigate("../survey");
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
                            input: 1,
                            message: "Такая почта уже существует",
                        });
                        return;
                    }
                });
        });
    }
    return (
        <div className="SingUp">
            <form
                className="form"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        signUp();
                    }
                }}
                onChange={() => setError({ input: 0, message: "" })}
            >
                <h1>Регистрация</h1>
                <Link to={"../login"} className="desktop-only">
                    Войти в аккаунт
                </Link>
                <label>Почта</label>
                <input
                    type="email"
                    placeholder="Почта"
                    id="sing-up-email"
                    className={error.input == 1 ? "error" : ""}
                />
                <label>Пароль</label>
                <input
                    type="password"
                    placeholder="Пароль"
                    id="sing-up-password"
                    className={error.input == 2 ? "error" : ""}
                />
                <label>Повторите пароль</label>
                <input
                    type="password"
                    placeholder="Пароль"
                    id="sing-up-password-repeat"
                    className={error.input == 3 ? "error" : ""}
                />
                <div>
                    <input
                        type="checkbox"
                        id="sing-up-accept"
                        className={error.input == 4 ? "error" : ""}
                    />
                    <label>
                        Согласие на обработку персональных данных и
                        пользовательское соглашение
                    </label>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        signUp();
                    }}
                >
                    Зарегистрироваться
                </button>
                <Link to={"../login"} className="mobile-only">
                    Войти в аккаунт
                </Link>
                {error.input != 0 ? (
                    <p className="error-message">{error.message}</p>
                ) : (
                    ""
                )}
            </form>
        </div>
    );
}
