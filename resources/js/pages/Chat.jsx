import React from "react";
import sent from "../assets/img/sent.svg";
import logo from "../assets/img/logo.svg";
import image from "../assets/img/chat_image.png";
import image2 from "../assets/img//chat_image2.png";

export default function Chat() {
    const [messages, setMessages] = React.useState([
        {
            text: "Morbi tincidunt, lectus eu faucibus dictum, erat turpis scelerisque lectus, a varius nibh arcu et libero. ",
            owner_image: "../img/example.jpg",
            name: "name",
            isMine: true,
        },
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit sodales ligula at egestas. Cras porta felis velit, vitae egestas eros elementum ac. Maecenas arcu tellus, blandit sit amet varius ac, laoreet vel neque. Suspendisse sagittis dolor sollicitudin rhoncus euismod. Morbi tincidunt, lectus eu faucibus dictum, erat turpis scelerisque lectus, a varius nibh arcu et libero. Donec condimentum at elit vel feugiat. Suspendisse et urna vitae metus rutrum condimentum.",
            owner_image: "../img/example.png",
            name: "aeaea",
            isMine: false,
        },
        {
            text: "Morbi tincidunt, lectus eu faucibus dictum, erat turpis scelerisque lectus, a varius nibh arcu et libero. Donec condimentum at elit vel feugiat. Suspendisse et urna vitae metus rutrum condimentum.",
            owner_image: "../img/Example2.svg",
            name: "NaGiBaToR666",
            isMine: false,
        },
    ]);
    return (
        <div className="Chat">
            <div>
                <h1>
                    Чат
                    <span>TeamLefgen</span>
                </h1>
                <div className="messages">
                    <div>
                        {messages.map((value, i) => (
                            <div
                                key={"chat-page-message-" + i}
                                className={value.isMine ? "mine" : ""}
                            >
                                <div>
                                    <img
                                        alt="Изображение полбзователя"
                                        src={value.owner_image}
                                    />
                                    <h3>{value.name}</h3>
                                </div>
                                <p>{value.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="input">
                    <input type="text" placeholder="Напишите сообщение" />
                    <button>
                        <img alt="Отправить сообщение" src={sent} />
                    </button>
                </div>
            </div>
            <img
                alt="Логотип"
                src={logo}
                className="logo"
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
}
