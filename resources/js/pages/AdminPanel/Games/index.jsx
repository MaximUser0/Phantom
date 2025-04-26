import React from "react";
import Pagination from "../../../components/Pagination";
import { Link } from "react-router-dom";

export default function Games() {
    const [games, setGames] = React.useState([
        {
            image: "../img/example.jpg",
            title: "DOTA2",
            genre: "Стратегии",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
        },
        {
            image: "../img/example.jpg",
            title: "DOTA2",
            genre: "Стратегии",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
        },
        {
            image: "../img/example.jpg",
            title: "DOTA2",
            genre: "Стратегии",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
        },
        {
            image: "../img/example.jpg",
            title: "DOTA2",
            genre: "Стратегии",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
        },
        {
            image: "../img/example.jpg",
            title: "DOTA2",
            genre: "Стратегии",
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
        },
    ]);
    return (
        <div className="AdminGames">
            <Link to={"../admin-panel/game_create"}>Создать игру +</Link>
            <div className="list">
                {games.map((value, i) => (
                    <div key={"admin-games-page-game-" + i}>
                        <img alt="Изображение игры" src={value.image} />
                        <div className="description">
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </div>
                        <div className="genre">
                            <p>Жанр:</p>
                            <p>{value.genre}</p>
                        </div>
                        <div className="buttons">
                            <button className="green">Редактировать</button>
                            <button className="red">Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination />
        </div>
    );
}
