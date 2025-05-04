import React from "react";
import sent from "../assets/img/sent.svg";
import logo from "../assets/img/logo.svg";
import image from "../assets/img/chat_image.png";
import image2 from "../assets/img//chat_image2.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Chat() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];
    const [chat, setChat] = React.useState({ messages: [] });
    React.useEffect(() => {
        getChat();
    }, []);
    return (
        <div className="Chat">
            <div>
                <h1>
                    Чат
                    <span onClick={() => navigate("../team/" + chat.team_id)}>
                        TeamLefgen
                    </span>
                </h1>
                <div className="messages">
                    <div>
                        {chat.messages.map((value, i) => (
                            <div
                                key={"chat-page-message-" + i}
                                className={value.id == user.id ? "mine" : ""}
                            >
                                <div>
                                    <img
                                        alt="Изображение полбзователя"
                                        src={value.image}
                                    />
                                    <h3>{value.name}</h3>
                                </div>
                                <p>{value.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <form
                    className="input"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            sentMessage();
                        }
                    }}
                >
                    <input
                        type="text"
                        placeholder="Напишите сообщение"
                        id="chat-message-input"
                    />
                    <button onClick={() => sentMessage()} type="button">
                        <img alt="Отправить сообщение" src={sent} />
                    </button>
                </form>
            </div>
            <img
                alt="Логотип"
                src={logo}
                className="logo"
                onClick={() => navigate("../")}
            />
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
    function getChat() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/chat/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                let chat_response = response.data;
                chat_response.messages = JSON.parse(chat_response.messages);
                setChat(response.data);
                setTimeout(
                    () =>
                        document
                            .querySelector(".Chat .messages")
                            .scrollTo(0, 10000),
                    10
                );
            });
    }
    function sentMessage() {
        if (sessionStorage.getItem("token") == null) return;
        const body = {
            content: document.getElementById("chat-message-input").value.trim(),
        };
        if (body.content == "") {
            return;
        }
        axios
            .post(window.location.origin + "/api/chat/" + id, body, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                chat.messages.push(response.data);
                setChat({ ...chat });
                document.getElementById("chat-message-input").value = "";
                setTimeout(
                    () =>
                        document
                            .querySelector(".Chat .messages")
                            .scrollTo(0, 10000),
                    100
                );
            });
    }
}
