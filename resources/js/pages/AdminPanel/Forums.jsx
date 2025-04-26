import React from "react";
import Pagination from "../../components/Pagination";

export default function Forums() {
    const [forums, setForums] = React.useState([
        {
            image: "../img/example.jpg",
            title: "Название форума",
            messages_number: 1204,
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            owner: "victor_aSdem",
            owner_image: "../img/example.png",
            created_at: "30 марта 2025",
        },
        {
            image: "../img/example.jpg",
            title: "Название форума",
            messages_number: 1204,
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            owner: "victor_aSdem",
            owner_image: "../img/example.png",
            created_at: "30 марта 2025",
        },
        {
            image: "../img/example.jpg",
            title: "Название форума",
            messages_number: 1204,
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            owner: "victor_aSdem",
            owner_image: "../img/example.png",
            created_at: "30 марта 2025",
        },
        {
            image: "../img/example.jpg",
            title: "Название форума",
            messages_number: 1204,
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            owner: "victor_aSdem",
            owner_image: "../img/example.png",
            created_at: "30 марта 2025",
        },
        {
            image: "../img/example.jpg",
            title: "Название форума",
            messages_number: 1204,
            description:
                "Это командная тактико-стратегическая игра с элементами компьютерной ролевой игры, в которой каждый игрок управляет одним героем, и, если герой имеет соответствующие способности, некоторым количеством дополнительных существ.",
            owner: "victor_aSdem",
            owner_image: "../img/example.png",
            created_at: "30 марта 2025",
        },
    ]);
    return (
        <div className="AdminForums">
            <div className="list">
                {forums.map((value, i) => (
                    <div key={"admin-forums-page-forum-" + i}>
                        <img alt="Изображение форума" src={value.image} />
                        <div className="description">
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </div>
                        <div className="messages-number">
                            <p>{value.messages_number}</p>
                            <p>Сообщений</p>
                        </div>
                        <div className="owner-info">
                            <div>
                                <img
                                    alt="Изображение пользователя"
                                    src={value.owner_image}
                                />
                                <div>
                                    <h3>{value.owner}</h3>
                                    <p>{value.created_at}</p>
                                </div>
                            </div>
                            <button>Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination />
        </div>
    );
}
