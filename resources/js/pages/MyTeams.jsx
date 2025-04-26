import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MyTeams() {
    const navigate = useNavigate();
    const my_teams = [
        {
            image: "../img/example.png",
            title: "TeamSpirt",
            participants_number: 3,
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
        },
        {
            image: "../img/example.png",
            title: "TeamSpirt",
            participants_number: 3,
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
        },
        {
            image: "../img/example.png",
            title: "TeamSpirt",
            participants_number: 3,
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
        },
        {
            image: "../img/example.png",
            title: "TeamSpirt",
            participants_number: 3,
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
        },
    ];
    const requests = [
        {
            image: "../img/example.jpg",
            name: "dinosour",
            text: "я играю на миду за Фиору",
            team_title: "TeamSpirt",
        },
    ];
    const invitations = [
        {
            image: "../img/example.png",
            title: "TeamLefgen",
            participants_number: 3,
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            status: "в ожидании",
        },
        {
            image: "../img/example.png",
            title: "TeamLefgen",
            participants_number: 3,
            description:
                "Команда для онлайн игр для супер крутых игроков. Вступайте, а то вас съедят.",
            status: "отклонено",
        },
    ];
    return (
        <div className="MyTeams">
            <div>
                <h2>Мои</h2>
                {my_teams.map((value, i) => (
                    <div key={"my-team-page-team-" + i}>
                        <img alt="Изображение команды" src={value.image} />
                        <div>
                            <h3>{value.title}</h3>
                            <p>Участники: {value.participants_number}</p>
                            <p>{value.description}</p>
                        </div>
                        <div>
                            <button>Покинуть</button>
                            <button onClick={() => navigate('../team/1')}>Просмотреть</button>
                        </div>
                    </div>
                ))}
                <Link to="../team-create">Создать команду</Link>
            </div>

            <div>
                <h2>Заявки</h2>
                {requests.map((value, i) => (
                    <div key={"my-team-page-request-" + i}>
                        <img alt="Изображение пользователя" src={value.image} />
                        <div>
                            <h3>{value.name}</h3>
                            <p>Команда: {value.team_title}</p>
                            <p>{value.text}</p>
                        </div>
                        <div>
                            <button className="green">Принять</button>
                            <button className="red">Отклонить</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="Invitations">
                <h2>В ожидании</h2>
                {invitations.map((value, i) => (
                    <div key={"my-team-page-invitation-" + i}>
                        <img alt="Изображение команды" src={value.image} />
                        <div>
                            <h3>{value.title}</h3>
                            <p>Участники: {value.participants_number}</p>
                            <p>{value.description}</p>
                        </div>
                        <div className="status">
                            <label>Статус: </label>
                            <select>
                                <option>в ожидании</option>
                                <option>отклонено</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
