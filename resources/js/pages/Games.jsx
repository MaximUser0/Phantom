import React from "react";
import icon from "../assets/img/forum_icon.svg";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function Games() {
    const navigate = useNavigate();
    const [games, setGames] = React.useState([
        {
            title: "DOTA2",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            genre: "Стратегии",
            image: "./img/example.png",
        },
        {
            title: "DOTA2",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            genre: "Стратегии",
            image: "./img/example.png",
        },
        {
            title: "DOTA2",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            genre: "Стратегии",
            image: "./img/example.png",
        },
        {
            title: "DOTA2",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            genre: "Стратегии",
            image: "./img/example.png",
        },
        {
            title: "DOTA2",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            genre: "Стратегии",
            image: "./img/example.png",
        },
    ]);
    return (
        <div className="Games">
            <h1>Игры</h1>
            <div className="list">
                {games.map((value, i) => (
                    <div key={"games-page-game-" + i} onClick={() => navigate('../game/1')}>
                        <img alt="Изображение игры" src={value.image} />
                        <div className="info">
                            <h2>{value.title}</h2>
                            <p>{value.description}</p>
                            <a className="desktop-only">Подробнее...</a>
                        </div>
                        <a className="mobile-only">Подробнее...</a>
                        <div className="genre">
                            <div>
                                <p>Жанр:</p>
                                <p>{value.genre}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination />
        </div>
    );
}
