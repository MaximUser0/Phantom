import React from "react";
import Pagination from "../../components/Pagination";

export default function Users() {
    const [users, setUsers] = React.useState([
        {
            image: "../img/example.png",
            name: "fantom_skitsa",
            dateOfBirth: "04.09.2005",
            gender: "муж",
            comments_number: 2,
            teams_number: 2,
            forums_number: 2,
            isBlocked: false,
        },
        {
            image: "../img/example.png",
            name: "fantom_skitsa",
            dateOfBirth: "04.09.2005",
            gender: "муж",
            comments_number: 2,
            teams_number: 2,
            forums_number: 2,
            isBlocked: false,
        },
        {
            image: "../img/example.png",
            name: "fantom_skitsa",
            dateOfBirth: "04.09.2005",
            gender: "муж",
            comments_number: 2,
            teams_number: 2,
            forums_number: 2,
            isBlocked: true,
        },
        {
            image: "../img/example.png",
            name: "fantom_skitsa",
            dateOfBirth: "04.09.2005",
            gender: "муж",
            comments_number: 2,
            teams_number: 2,
            forums_number: 2,
            isBlocked: false,
        },
        {
            image: "../img/example.png",
            name: "fantom_skitsa",
            dateOfBirth: "04.09.2005",
            gender: "муж",
            comments_number: 2,
            teams_number: 2,
            forums_number: 2,
            isBlocked: false,
        },
    ]);
    return (
        <div className="Users">
            <div className="list">
                {users.map((value, i) => (
                    <div key={"admin-users-page-user-" + i}>
                        <img alt="Изображение пользователя" src={value.image} />
                        <div>
                            <h3>{value.name}</h3>
                            <p>год рождения: {value.dateOfBirth}</p>
                            <p>пол: {value.gender}.</p>
                        </div>
                        <div className="common-info">
                            <p>Комментарии: {value.comments_number}</p>
                            <p>Команды: {value.teams_number}</p>
                            <p>Форумы: {value.forums_number}</p>
                        </div>
                        <div className="buttons">
                            <button
                                className={value.isBlocked ? "green" : "gray"}
                            >
                                Разбанить
                            </button>
                            <button
                                className={value.isBlocked ? "gray" : "red"}
                            >
                                Забанить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination />
        </div>
    );
}
