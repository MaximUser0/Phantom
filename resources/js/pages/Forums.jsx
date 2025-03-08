import React from "react";
import icon from "../assets/img/forum_icon.svg";

export default function Forum() {
    const [forums, setForums] = React.useState([
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            messages_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            messages_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            messages_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            messages_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
        {
            title: "Название форума",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            participants_number: 234,
            messages_number: 1204,
            owner: "victor_aSdem",
            created_at: "30 марта 2025",
            owner_image: "./img/example.png",
        },
    ]);
    const [active, setActive] = React.useState(0);
    const pagination = ["1", "2", "3", "...", "12", ">"];
    return (
        <div className="Forums">
            <h1>Форумы</h1>
            <div className="list">
                {forums.map((value, i) => (
                    <div key={"forum_page_forum_" + i}>
                        <img alt="Иконка форума" src={icon} />
                        <div className="info">
                            <h2>{value.title}</h2>
                            <p>{value.description}</p>
                            <p>Участники: {value.participants_number}</p>
                        </div>
                        <div className="messages">
                            <h3>{value.messages_number}</h3>
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
            <div className="pagination">
                {pagination.map((text, i) => (
                    <p
                        key={"forums_pagination_" + i}
                        className={active == i ? "active" : ""}
                        onClick={() => {
                            setActive(i);
                        }}
                    >
                        {text}
                    </p>
                ))}
            </div>
        </div>
    );
}
