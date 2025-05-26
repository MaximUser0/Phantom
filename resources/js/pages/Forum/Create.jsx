import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/img/create_forum_image.png";

export default function Create() {
    const navigate = useNavigate();
    const [error, setError] = React.useState(0);
    return (
        <form className="CreateForum" onChange={() => setError(0)}>
            <h1>Создание форума</h1>
            <div className="inputs">
                <div>
                    <label>Название форума</label>
                    <input
                        type="text"
                        className={error == 1 ? "error" : ""}
                        id="forum-create-title"
                    />
                    {error == 1 ? (
                        <p className="error-message">Введите название форума</p>
                    ) : (
                        ""
                    )}
                    <label>Описание</label>
                    <textarea
                        placeholder="Добавьте описание"
                        className={error == 2 ? "error" : ""}
                        id="forum-create-description"
                    ></textarea>
                    {error == 2 ? (
                        <p className="error-message">Введите описание форума</p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="file">
                <div className="images">
                    <button
                        onClick={() =>
                            document.getElementById("forum-files-input").click()
                        }
                        className={error == 3 ? "error" : ""}
                        type="button"
                    >
                        Выбрать файлы
                    </button>
                    <label className="label">Название картинки</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="forum-files-input"
                        multiple
                        onChange={(e) => {
                            const keys = Object.keys(e.target.files);
                            const file_names = String(
                                keys.map(
                                    (value) =>
                                        e.target.files[value].name.slice(
                                            0,
                                            18
                                        ) + "..."
                                )
                            ).replaceAll(",", " ");
                            document.querySelector(
                                ".CreateForum .file .images .label"
                            ).textContent = file_names;
                        }}
                    />
                </div>
            </div>
            {error == 3 ? (
                <p className="error-message">
                    Добавьте минимум одно фото для форума
                </p>
            ) : (
                ""
            )}
            <div className="buttons">
                <button type="button" onClick={() => navigate("../forums")}>
                    Отмена
                </button>
                <button type="button" onClick={() => create()}>
                    Сохранить
                </button>
            </div>
            <img alt="Фоновое изображение" src={image} className="back-image" />
        </form>
    );
    function create() {
        const body = {
            title: document.getElementById("forum-create-title").value.trim(),
            description: document
                .getElementById("forum-create-description")
                .value.trim(),
        };
        let error_check =
            body.title == ""
                ? 1
                : body.description == ""
                ? 2
                : document.getElementById("forum-files-input").files.length ==
                      0 && id == undefined
                ? 3
                : 0;
        setError(error_check);
        if (error_check != 0) return;
        const data = new FormData();
        if (document.getElementById("forum-files-input").files.length != 0) {
            Object.values(
                document.getElementById("forum-files-input").files
            ).forEach((file) => {
                console.log(file);
                data.append("images[]", file);
            });
        }
        data.append("title", body.title);
        data.append("description", body.description);

        axios
            .post(window.location.origin + "/api/forum", data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                navigate("../forum/" + response.data.id);
            });
    }
}
