import React from "react";
import logo from "../../assets/img/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    console.log(location);
    return (
        <header className="Header">
            <Link to={"../"}>
                <img src={logo} alt="Логотип" />
            </Link>
            <Link
                to={"../profile"}
                className={location.pathname == "/profile" ? "active" : ""}
            >
                Профиль
            </Link>
            <Link
                to={"../team"}
                className={location.pathname == "/team" ? "active" : ""}
            >
                Команды
            </Link>
            <Link
                to={"../news"}
                className={location.pathname == "/news" ? "active" : ""}
            >
                Новости
            </Link>
            <Link
                to={"../forum"}
                className={location.pathname == "/forum" ? "active" : ""}
            >
                Форум
            </Link>
            <Link
                to={"../game"}
                className={location.pathname == "/game" ? "active" : ""}
            >
                Игры
            </Link>
        </header>
    );
}
