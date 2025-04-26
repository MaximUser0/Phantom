import React from "react";
import Pagination from "../../components/Pagination";

export default function Teams() {
    const [teams, setTeams] = React.useState([
        {
            image: "../img/example.jpg",
            title: "TeamSpirt",
            created_at: "04.09.2005",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_number: 2,
        },
        {
            image: "../img/example.jpg",
            title: "TeamSpirt",
            created_at: "04.09.2005",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_number: 2,
        },
        {
            image: "../img/example.jpg",
            title: "TeamSpirt",
            created_at: "04.09.2005",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_number: 2,
        },
        {
            image: "../img/example.jpg",
            title: "TeamSpirt",
            created_at: "04.09.2005",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_number: 2,
        },
        {
            image: "../img/example.jpg",
            title: "TeamSpirt",
            created_at: "04.09.2005",
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            participants_number: 2,
        },
    ]);
    return (
        <div className="AdminTeams">
            <div className="list">
                {teams.map((value, i) => (
                    <div key={"admin-teams-page-user-" + i}>
                        <img alt="Изображение команды" src={value.image} />
                        <div>
                            <h3>{value.title}</h3>
                            <p>Дата создания: {value.created_at}</p>
                            <p>Участники: {value.participants_number}</p>
                        </div>
                        <div className="description">
                            <h3>Описание</h3>
                            <p>{value.description}</p>
                        </div>
                        <div className="buttons">
                            <button className="green">Просмотреть</button>
                            <button className="red">Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination />
        </div>
    );
}
