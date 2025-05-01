import React from "react";
import logo from "../../assets/img/logo.svg";
import mobile_menu from "../../assets/img/mobile_menu.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import axios from "axios";

export default function Header() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdmin = false;
    const locationWithout = [
        "login",
        "sing-up",
        "survey",
        "chat",
        "admin-panel",
    ];
    React.useEffect(() => {
        getUser();
    }, []);
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
            {sessionStorage.getItem("token") != null ? (
                <>
                    <Link
                        to={"../profile"}
                        className={
                            location.pathname == "/profile" ? "active" : ""
                        }
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
                        className={
                            location.pathname == "/forum" ? "active" : ""
                        }
                    >
                        Форум
                    </Link>
                    <Link
                        to={"../game"}
                        className={location.pathname == "/game" ? "active" : ""}
                    >
                        Игры
                    </Link>
                </>
            ) : (
                <>
                    <Link to={"../sing-up"}>Регистрация</Link>
                    <Link to={"../login"}>Войти</Link>
                </>
            )}
            {isAdmin ? (
                <Link to={"../admin-panel/users"}>Админ-панель</Link>
            ) : (
                ""
            )}
        </header>
    );
    function getUser() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/user", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                if(response.data.date_of_birth == null){
                    navigate("../survey");
                    return
                }
                dispatch(setUser(response.data));
            });
    }
}
