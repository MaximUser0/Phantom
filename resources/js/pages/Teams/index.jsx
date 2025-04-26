import React from "react";

export default function Teams() {
    const [teams, setTeams] = React.useState([
        {
            id: 1,
            title: "TeamSpirt",
            image: "./img/example.jpg",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_count: 3,
        },
        {
            id: 2,
            title: "TeamSpirt",
            image: "./img/example.jpg",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_count: 3,
        },
        {
            id: 2,
            title: "TeamSpirt",
            image: "./img/example.jpg",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_count: 3,
        },
        {
            id: 2,
            title: "TeamSpirt",
            image: "./img/example.jpg",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_count: 3,
        },
        {
            id: 2,
            title: "TeamSpirt",
            image: "./img/example.jpg",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_count: 3,
        },
        {
            id: 2,
            title: "TeamSpirt",
            image: "./img/example.jpg",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_count: 3,
        },
        {
            id: 2,
            title: "TeamSpirt",
            image: "./img/example.jpg",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_count: 3,
        },
        {
            id: 2,
            title: "TeamSpirt",
            image: "./img/example.jpg",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_count: 3,
        },
    ]);
    return (
        <div className="Teams">
            <h1>Команды</h1>
            <div>
                {teams.map((value, i) => (
                    <div key={"teams-page-team-" + i}>
                        <img alt="Изображение команды" src={value.image} />
                        <div>
                            <h2>{value.title}</h2>
                            <p>{value.description}</p>
                            <button>Подать заявку</button>
                            <p>Участники: {value.participants_count}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
