import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Users from "./Users";
import Comments from "./Comments";
import Teams from "./Teams";
import News from "./News";
import Forums from "./Forums";
import Games from "./Games";
import NewsCreate from "./News/Create";
import GameCreate from "./Games/Create";
import logo from "../../assets/img/logo.svg";

export default function AdminPanel() {
    const location = useLocation();
    const navigate = useNavigate();
    const pages = {
        users: <Users />,
        comments: <Comments />,
        teams: <Teams />,
        news: <News />,
        forums: <Forums />,
        games: <Games />,
        news_create: <NewsCreate />,
        game_create: <GameCreate />,
    };
    const links = [
        { title: "Пользователи", to: "users" },
        { title: "Комментарии", to: "comments" },
        { title: "Команды", to: "teams" },
        { title: "Новости", to: "news" },
        { title: "Форумы", to: "forums" },
        { title: "Игры", to: "games" },
    ];
    return (
        <div className="AdminPanel">
            <div className="header">
                <img alt="Логотип" src={logo} onClick={() => navigate("../")} />
                <div>
                    {links.map((link, i) => (
                        <Link
                            to={"../admin-panel/" + link.to}
                            key={"admin-page-link-" + i}
                            className={
                                location.pathname.split("/admin-panel/")[1] ==
                                link.to
                                    ? "active"
                                    : ""
                            }
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <p>Выход</p>
            </div>
            {pages[location.pathname.split("/admin-panel/")[1]]}
        </div>
    );
}
