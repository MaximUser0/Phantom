import React from "react";
import GenresSelect from "../../../components/GenresSelect";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const navigate = useNavigate();
    const id = location.pathname.split("/")[3];
    const [game, setGame] = React.useState({ genres: "" });
    const [error, setError] = React.useState(0);
    const [genres, setGenres] = React.useState([
        { title: "Экшн", checked: false },
        { title: "Стратегия", checked: false },
        { title: "RPG", checked: false },
        { title: "Шутер", checked: false },
        { title: "Казуальные", checked: false },
        { title: "Аркады", checked: false },
        { title: "Платформеры", checked: false },
        { title: "Файтинги", checked: false },
    ]);
    React.useEffect(() => {
        if (id != undefined) {
            getGame();
        }
    }, []);
    return (
        <form className="CreateGame" onChange={() => setError(0)}>
            <h1>Добавление игры</h1>
            <div className="inputs">
                <div>
                    <label>Название игры</label>
                    <input
                        type="text"
                        className={error == 1 ? "error" : ""}
                        id="game-create-title"
                        defaultValue={id != undefined ? game.title : null}
                    />
                    {error == 1 ? (
                        <p className="error-message">Введите название игры</p>
                    ) : (
                        ""
                    )}
                    <label>Описание</label>
                    <textarea
                        placeholder="Добавьте описание"
                        className={error == 2 ? "error" : ""}
                        id="game-create-description"
                        defaultValue={id != undefined ? game.description : null}
                    ></textarea>
                    {error == 2 ? (
                        <p className="error-message">Введите описание игры</p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="file">
                <div className="image">
                    <button
                        onClick={() =>
                            document.getElementById("game-file-input").click()
                        }
                        className={error == 4 ? "error" : ""}
                        type="button"
                    >
                        Выбрать файл
                    </button>
                    <label className="label">Название картинки</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="game-file-input"
                        onChange={(e) => {
                            document.querySelector(
                                ".CreateGame .file .image .label"
                            ).textContent = e.target.files[0].name;
                        }}
                    />
                </div>
                <div className="images">
                    <button
                        onClick={() =>
                            document.getElementById("game-files-input").click()
                        }
                        className={error == 5 ? "error" : ""}
                        type="button"
                    >
                        Выбрать файлы
                    </button>
                    <label className="label">Название картинки</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="game-files-input"
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
                                ".CreateGame .file .images .label"
                            ).textContent = file_names;
                        }}
                    />
                </div>
                <div className="genre">
                    <label className={error == 3 ? "error" : ""}>Жанры</label>
                    <GenresSelect genres={genres} setGenres={setGenres} />
                </div>
            </div>
            {error == 3 || error == 4 || error == 5 ? (
                <p className="error-message">
                    {error == 3
                        ? "Выберите жанры"
                        : error == 4
                        ? "Добавьте изображение игры"
                        : "Добавьте минимум одно фото для игры"}
                </p>
            ) : (
                ""
            )}
            <div className="buttons">
                <button type="button" onClick={() => create()}>
                    Сохранить
                </button>
                <button
                    type="button"
                    onClick={() => navigate("../admin-panel/games")}
                >
                    Отмена
                </button>
            </div>
        </form>
    );
    function create() {
        const body = {
            title: document.getElementById("game-create-title").value.trim(),
            description: document
                .getElementById("game-create-description")
                .value.trim(),
            genres: genres
                .filter((elem) => elem.checked)
                .map((elem) => elem.title)
                .toString()
                .replaceAll(",", "&"),
        };
        let error_check =
            body.title == ""
                ? 1
                : body.description == ""
                ? 2
                : body.genres == ""
                ? 3
                : document.getElementById("game-file-input").files.length ==
                      0 && id == undefined
                ? 4
                : document.getElementById("game-files-input").files.length ==
                      0 && id == undefined
                ? 5
                : 0;
        setError(error_check);
        if (error_check != 0) return;
        const data = new FormData();
        if (document.getElementById("game-file-input").files.length != 0) {
            data.append(
                "image",
                document.getElementById("game-file-input").files[0]
            );
        }
        console.log(document.getElementById("game-files-input").files)
        if (document.getElementById("game-files-input").files.length != 0) {
            Object.values(document.getElementById("game-files-input").files).forEach(file => {
                console.log(file)
                data.append("images[]", file);
            });
        }
        data.append("title", body.title);
        data.append("description", body.description);
        data.append("genres", body.genres);

        axios
            .post(
                window.location.origin +
                    "/api/game" +
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
                navigate("../admin-panel/games");
            });
    }
    function getGame() {
        axios
            .get(window.location.origin + "/api/game/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setGame(response.data);
            });
    }
}
