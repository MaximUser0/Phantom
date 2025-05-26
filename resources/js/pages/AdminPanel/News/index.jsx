import React from "react";
import Pagination from "../../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function News() {
    const [paginationInfo, setPaginationInfo] = React.useState({});
    const [active, setActive] = React.useState(0);
    const navigate = useNavigate();
    const [news, setNews] = React.useState([]);
    React.useEffect(() => {
        getNews();
    }, [active]);

    return (
        <div className="AdminNews">
            <Link to={"../admin-panel/news_create"}>Создать новость +</Link>
            <div className="list">
                {news.map((value, i) => (
                    <div key={"admin-news-page-team-" + i}>
                        <img alt="Изображение новости" src={value.image} />
                        <div className="description">
                            <h3 onClick={() => navigate("../news/" + value.id)}>{value.title}</h3>
                            <p>{value.description}</p>
                        </div>
                        <div className="buttons">
                            <button
                                className="green"
                                onClick={() =>
                                    navigate(
                                        "../admin-panel/news_create/" + value.id
                                    )
                                }
                            >
                                Редактировать
                            </button>
                            <button
                                className="red"
                                onClick={() => deleteNews(value.id, i)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                info={paginationInfo}
                active={active}
                setActive={setActive}
            />
        </div>
    );
    function getNews() {
        axios
            .get(
                window.location.origin +
                    "/api/news/paginate?page=" +
                    (active + 1),
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((response) => {
                setNews(response.data.data);
                setPaginationInfo({
                    last_page: response.data.last_page,
                    current_page: response.data.current_page,
                });
            });
    }
    function deleteNews(id, i) {
        if (!confirm("Вы хотите удалить новость?")) return;
        axios
            .delete(window.location.origin + "/api/news/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(() => {
                news.splice(i, 1);
                setNews([...news]);
                getNews();
            });
    }
}
