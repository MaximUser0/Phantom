import React from "react";
import logo from "../../assets/img/logo.svg";
import mobile_menu from "../../assets/img/mobile_menu.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import axios from "axios";

export default function Header() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const locationWithout = ["login", "sing-up", "survey", "admin-panel"];
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);
    const links = (
        <>
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
                    {location.pathname == "/" ? (
                        ""
                    ) : (
                        <a onClick={() => logout()} className="logout">
                            Выйти
                        </a>
                    )}
                </>
            ) : (
                <>
                    <Link to={"../sing-up"}>Регистрация</Link>
                    <Link to={"../login"}>Войти</Link>
                </>
            )}
            {user.is_admin ? (
                <Link to={"../admin-panel/users"}>Админ-панель</Link>
            ) : (
                ""
            )}
        </>
    );
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
                (location.pathname.split("/")[1] == "team-create" ||
                location.pathname.split("/")[1] == "forum-create" ||
                location.pathname.split("/")[1] == "chat"
                    ? " header-mobile-only"
                    : "")
            }
        >
            <img
                src={mobile_menu}
                alt="Меню"
                className="mobile-only"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            />

            <Link to={"../"} className="logo">
                <img src={logo} alt="Логотип" />
            </Link>
            {window.screen.width > 1080 ? (
                links
            ) : showMobileMenu ? (
                <div className="mobile-menu" onClick={() => setShowMobileMenu(false)}>
                    {links}
                </div>
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
                if (response.data.date_of_birth == null) {
                    navigate("../survey");
                    return;
                }
                dispatch(setUser(response.data));
            })
            .catch(() => {
                sessionStorage.removeItem("token");
                navigate("../");
            });
    }
    function logout() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/logout", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(() => {
                sessionStorage.removeItem("token");
                navigate("../");
                dispatch(setUser({}));
                dispatch(setToken(null));
            });
    }
}
