import React from "react";
import image from "../assets/img/news_image.png";

export default function News() {
    const [news, setNews] = React.useState([
        {
            title: "Название новости",
            image: "./img/example.png",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        },
        {
            title: "Название новости",
            image: "./img/example.png",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        },
        {
            title: "Название новости",
            image: "./img/example.png",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        },
        {
            title: "Название новости",
            image: "./img/example.png",
            description:
                "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
        },
        {
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
                    <div key={"news_page_news_" + i}>
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
