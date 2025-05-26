import React from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const navigate = useNavigate();
    const id = location.pathname.split("/")[3];
    const [news, setNews] = React.useState({});
    const [error, setError] = React.useState(0);
    React.useEffect(() => {
        if (id != undefined) {
            getNews();
        }
    }, []);
    return (
        <form className="CreateNews" onChange={() => setError(0)}>
            <h1>Создание новости</h1>
            <div className="inputs">
                <div>
                    <label>Название новости</label>
                    <input
                        type="text"
                        id="news-create-title"
                        className={error == 1 ? "error" : ""}
                        defaultValue={id != undefined ? news.title : null}
                    />
                    {error == 1 ? (
                        <p className="error-message">
                            Введите название новости
                        </p>
                    ) : (
                        ""
                    )}
                    <label>Описание</label>
                    <textarea
                        placeholder="Добавьте описание"
                        id="news-create-description"
                        className={error == 2 ? "error" : ""}
                        defaultValue={id != undefined ? news.description : null}
                    ></textarea>
                </div>
                <div>
                    <label>Новость</label>
                    <textarea
                        placeholder="Добавьте текст для новости"
                        id="news-create-content"
                        className={error == 3 ? "error" : ""}
                        defaultValue={id != undefined ? news.content : null}
                    ></textarea>
                </div>
            </div>
            {error == 2 || error == 3 ? (
                <p className="error-message">
                    {error == 2
                        ? "Введите описание новости"
                        : "Введите текст для новости"}
                </p>
            ) : (
                ""
            )}
            <div className="file">
                <button
                    onClick={() =>
                        document.getElementById("news-file-input").click()
                    }
                    className={error == 4 ? "error" : ""}
                    type="button"
                >
                    Выбрать файл
                </button>
                <label>Название картинки</label>
                {error == 4 ? (
                    <p className="error-message">
                        Добавьте изображение для новости
                    </p>
                ) : (
                    ""
                )}
                <input
                    type="file"
                    accept="image/*"
                    id="news-file-input"
                    onChange={(e) => {
                        document.querySelector(
                            ".CreateNews .file label"
                        ).textContent = e.target.files[0].name;
                    }}
                />
            </div>
            <div className="buttons">
                <button
                    type="button"
                    onClick={() => navigate("../admin-panel/news")}
                >
                    Отмена
                </button>
                <button type="button" onClick={() => create()}>
                    Сохранить
                </button>
            </div>
        </form>
    );
    function create() {
        const body = {
            title: document.getElementById("news-create-title").value.trim(),
            description: document
                .getElementById("news-create-description")
                .value.trim(),
            content: document
                .getElementById("news-create-content")
                .value.trim(),
        };
        let error_check =
            body.title == ""
                ? 1
                : body.description == ""
                ? 2
                : body.content == ""
                ? 3
                : document.getElementById("news-file-input").files.length ==
                      0 && id == undefined
                ? 4
                : 0;
        setError(error_check);
        if (error_check != 0) return;
        const data = new FormData();
        if (document.getElementById("news-file-input").files.length != 0) {
            data.append(
                "image",
                document.getElementById("news-file-input").files[0]
            );
        }
        data.append("title", body.title);
        data.append("description", body.description);
        data.append("content", body.content);

        axios
            .post(
                window.location.origin +
                    "/api/news" +
                    (id != undefined ? "/" + id : ""),
                data,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then(() => {
                navigate("../admin-panel/news");
            });
    }
    function getNews() {
        axios
            .get(window.location.origin + "/api/news/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setNews(response.data);
            });
    }
}
