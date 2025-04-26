import React from "react";
import icon from "../assets/img/forum_icon.svg";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function Forum() {
    const navigate = useNavigate();
    const [forums, setForums] = React.useState([
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            comments_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            comments_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            comments_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            comments_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            comments_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
    ]);
    return (
        <div className="Forums">
            <h1>Форумы</h1>
            <div className="list">
                {forums.map((value, i) => (
                    <div key={"forum-page-forum-" + i} onClick={() => navigate('../forum/1')}>
                        <img alt="Иконка форума" src={icon} />
                        <div className="info">
                            <h2>{value.title}</h2>
                            <p>{value.description}</p>
                            <p>Участники: {value.participants_number}</p>
                        </div>
                        <div className="messages">
                            <h3>{value.comments_number}</h3>
                            <p>Сообщений</p>
                        </div>
                        <div className="owner">
                            <img
                                alt="Иконка создателя форума"
                                src={value.owner_image}
                            />
                            <p>{value.owner}</p>
                            <p className="date">{value.created_at}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination />
        </div>
    );
}
