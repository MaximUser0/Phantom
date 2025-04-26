import React from "react";
import image from "../assets/img/team_image.png";
import image2 from "../assets/img/team_image2.png";
import { useNavigate } from "react-router-dom";

export default function Team() {
    const navigate = useNavigate();
    const [team, setTeam] = React.useState({
        image: "../img/Example2.svg",
        title: "TeamLefgen",
        categories: ["Стратегия", "Шутер", "Экшн"],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit sodales ligula at egestas. Cras porta felis velit, vitae egestas eros elementum ac. Maecenas arcu tellus, blandit sit amet varius ac, laoreet vel neque. Suspendisse sagittis dolor sollicitudin rhoncus euismod. Morbi tincidunt, lectus eu faucibus dictum, erat turpis scelerisque lectus, a varius nibh arcu et libero. Donec condimentum at elit vel feugiat. Suspendisse et urna vitae metus rutrum condimentum.",
        owner_image: "../img/example.png",
        name: "fantom_skitsa",
        participants: [
            { image: "../img/example.jpg", name: "aeaea" },
            { image: "../img/Example2.svg", name: "victor_aSdem" },
        ],
    });
    return (
        <div className="Team">
            <h2 className="mobile-only">{team.title}</h2>
            <div className="buttons">
                <div>
                    <img alt="Изображение пользователя" src={team.image} />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="66"
                        height="49"
                        viewBox="0 0 66 49"
                        fill="none"
                        className="right-top"
                    >
                        <path
                            d="M0 0.128906H66V48.1289V47.802C66 44.486 64.3562 41.3856 61.6114 39.5248L6.04124 1.85171C4.38522 0.729032 2.43052 0.128906 0.429824 0.128906H0Z"
                            fill="#020221"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="66"
                        height="49"
                        viewBox="0 0 66 49"
                        fill="none"
                        className="left-bottom"
                    >
                        <path
                            d="M66 48L0 48L4.19629e-06 -5.7699e-06L4.16772e-06 0.326888C3.87782e-06 3.64293 1.64383 6.74331 4.38858 8.60408L59.9588 46.2772C61.6148 47.3999 63.5695 48 65.5702 48L66 48Z"
                            fill="#0d093a"
                        />
                    </svg>
                </div>
                <button className="desktop-only">Удалить команду</button>
                <button className="desktop-only">Выбрать файл</button>
                <button className="light-button desktop-only">
                    Редактировать
                </button>
                <div className="gradient"></div>
            </div>
            <div className="info">
                <h2 className="desktop-only">{team.title}</h2>
                <p>{team.description}</p>
                <div className="mobile-only">
                    <button>Удалить команду</button>
                    <button>Выбрать файл</button>
                    <button className="light-button">
                        Редактировать
                    </button>
                </div>
                <h3>Категории игр команды</h3>
                <div className="categories">
                    {team.categories.map((category, i) => (
                        <p key={"team-page-category-" + i}>{category}</p>
                    ))}
                </div>
                <h3>Участники</h3>
                <div className="owner">
                    <img
                        alt="Изображение пользователя"
                        src={team.owner_image}
                    />
                    <p>{team.name}</p>
                    <p className="creator">Создатель</p>
                </div>
                <div className="participants">
                    {team.participants.map((participant, i) => (
                        <div key={"team-page-participant-" + i}>
                            <div>
                                <img
                                    alt="Изображение пользователя"
                                    src={participant.image}
                                />
                            </div>
                            <p>{participant.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="links">
                <div className="chat">
                    <h2>Чат команды</h2>
                    <button onClick={() => navigate("../chat/1")}>
                        Перейти в чат
                    </button>
                </div>
                <div className="find">
                    <h2>Найти команду</h2>
                    <button>Искать</button>
                </div>
            </div>
            <img
                alt="Фоновое изображение"
                src={image}
                className="back-image1"
            />
            <img
                alt="Фоновое изображение"
                src={image2}
                className="back-image2"
            />
        </div>
    );
}
