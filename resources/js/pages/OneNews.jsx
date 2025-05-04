import React from "react";
import image from "../assets/img/one_news_image.png";
import image2 from "../assets/img/one_news_image.svg";

export default function OneNews() {
    const id = location.pathname.split("/")[2];
    const [news, setNews] = React.useState({ comments: [] });
    React.useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="OneNews">
            <h1 className="mobile-only">{news.title}</h1>
            <img alt="Изображение новости" src={news.image} />
            <img alt="Изображение новости" src={image} className="back-image" />
            <img
                alt="Изображение новости"
                src={image2}
                className="back-shadow"
            />
            <div className="content">
                <h1 className="desktop-only">{news.title}</h1>
                <h2>Описание</h2>
                <p>{news.description}</p>
                <h2>Новость</h2>
                <p>{news.content}</p>
            </div>
            <div className="comments">
                <div className="list">
                    <div>
                        {news.comments.map((comment, i) => (
                            <div key={"one-news-page-comment-" + i}>
                                <div>
                                    <img
                                        alt="Изображение пользователя"
                                        src={comment.image}
                                    />
                                    <p>{comment.name}</p>
                                </div>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                        {news.comments.length == 0 ? (
                            <p
                                style={{
                                    textAlign: "center",
                                    marginTop: "50px",
                                }}
                            >
                                Пока нет комментариев
                            </p>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="addComment">
                    <h2>Комментарии</h2>
                    <textarea
                        placeholder="Напишите комментарий"
                        id="one-news-comment-textarea"
                    ></textarea>
                    <button onClick={() => addComment()}>Отправить</button>
                </div>
            </div>
        </div>
    );
    function getNews() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/news/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setNews(response.data);
            });
    }
    function addComment() {
        if (sessionStorage.getItem("token") == null) return;
        const body = {
            content: document
                .getElementById("one-news-comment-textarea")
                .value.trim(),
        };
        if (body.content == "") {
            return;
        }
        axios
            .post(
                window.location.origin + "/api/news/" + id + "/comment",
                body,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                news.comments.push(response.data);
                setNews({ ...news });
                document.getElementById("one-news-comment-textarea").value = "";
            });
    }
}
