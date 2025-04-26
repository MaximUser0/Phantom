import React from "react";
import image from "../assets/img/news_image.png";
import { useNavigate } from "react-router-dom";

export default function News() {
    const navigate = useNavigate();
    const [news, setNews] = React.useState([
        {
            id: 1,
            title: "Название новости",
            image: "./img/example.png",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        },
        {
            id: 2,
            title: "Название новости",
            image: "./img/example.png",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        },
        {
            id: 3,
            title: "Название новости",
            image: "./img/example.png",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        },
        {
            id: 4,
            title: "Название новости",
            image: "./img/example.png",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        },
        {
            id: 5,
            title: "Название новости",
            image: "./img/example.png",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        },
    ]);
    return (
        <div className="News">
            <h1>Новости</h1>
            <div>
                {news.map((value, i) => (
                    <div key={"news-page-news-" + i} onClick={() => navigate('../news/' + value.id)}>
                        <img alt="Изображение новости" src={value.image} />
                        <h2>{value.title}</h2>
                        <p>{value.description}</p>
                    </div>
                ))}
            </div>
            <img alt="Фоновое изображение" src={image} />
        </div>
    );
}
