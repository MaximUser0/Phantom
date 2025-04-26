import React from "react";
import logo from "../../assets/img/logo.svg";
import mobile_menu from "../../assets/img/mobile_menu.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const isAdmin = false;
    const locationWithout = [
        "login",
        "sing-up",
        "survey",
        "chat",
        "admin-panel",
    ];
    return (
        <header
            className={
                "Header" +
                (locationWithout.includes(location.pathname.split("/")[1])
                    ? " block-hidden"
                    : "") +
                (location.pathname.split("/")[1] == "team-create"
                    ? " header-mobile-only"
                    : "")
            }
        >
            <img src={mobile_menu} alt="Меню" className="mobile-only" />
            <Link to={"../"} className="logo">
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
            {isAdmin ? (
                <Link to={"../admin-panel/users"}>Админ-панель</Link>
            ) : (
                ""
            )}
        </header>
    );
}
