import React from "react";
import image from "../assets/img/news_image.png";
import { useNavigate } from "react-router-dom";

export default function News() {
    const navigate = useNavigate();
    const [news, setNews] = React.useState([]);
    React.useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="News">
            <h1>Новости</h1>
            <div>
                {news.map((value, i) => (
                    <div
                        key={"news-page-news-" + i}
                        onClick={() => navigate("../news/" + value.id)}
                    >
                        <img alt="Изображение новости" src={value.image} />
                        <h2>{value.title}</h2>
                        <p>{value.description}</p>
                    </div>
                ))}
            </div>
            <img alt="Фоновое изображение" src={image} />
        </div>
    );
    function getNews() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/news", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setNews(response.data);
            });
    }
}
