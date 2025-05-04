import React from "react";
import logo from "../../assets/img/logo.svg";
import image1 from "../../assets/img/create_team_image.png";
import image2 from "../../assets/img/create_team_image2.png";
import image_mobile from "../../assets/img/create_team_image.svg";
import arrow from "../../assets/img/arrow.svg";
import { useNavigate } from "react-router-dom";

export default function Create({ update }) {
    const navigate = useNavigate();
    const [showGenres, setShowGenres] = React.useState(false);
    const [team, setTeam] = React.useState({ genres: "" });
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
        if (update) {
            getTeam();
        }
    }, []);
    return (
        <div className="CreateTeam">
            <form
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        create();
                    }
                }}
                onChange={() => setError(0)}
            >
                <h1>Создание команды</h1>
                <label>Название команды</label>
                <input
                    id="team-create-title"
                    className={error == 1 ? "error" : ""}
                    defaultValue={update ? team.title : ""}
                />
                {error == 1 ? (
                    <p className="error-message">Введите название команды</p>
                ) : (
                    ""
                )}
                <label>Описание</label>
                <input
                    id="team-create-description"
                    className={error == 2 ? "error" : ""}
                    defaultValue={update ? team.description : ""}
                />
                {error == 2 ? (
                    <p className="error-message">Введите описание команды</p>
                ) : (
                    ""
                )}
                <label>Жанры</label>
                <div className="genre">
                    <div className="select">
                        <div id="team-genre-select">
                            <p>{getGenresForP()}</p>
                            <img
                                alt="Выбрать жанр"
                                src={arrow}
                                onClick={() => setShowGenres(!showGenres)}
                            />
                            <div
                                style={{
                                    display: showGenres ? "flex" : "none",
                                }}
                            >
                                {genres.map((genre, i) => (
                                    <div key={"team-create-genres-select-" + i}>
                                        <input
                                            type="checkbox"
                                            id={"team-create-checkbox-" + i}
                                            checked={genre.checked}
                                            onChange={() => {
                                                genres[i].checked =
                                                    !genres[i].checked;
                                                setGenres([...genres]);
                                                setError(0);
                                            }}
                                        />
                                        <label>{genre.title}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="file">
                        <button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("team-file-input")
                                    .click()
                            }
                        >
                            Выбрать файл
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            id="team-file-input"
                            onChange={(e) => {
                                document.querySelector(
                                    ".CreateTeam .file label"
                                ).textContent = e.target.files[0].name;
                            }}
                        />
                        <label></label>
                    </div>
                </div>
                {error == 3 || error == 4 ? (
                    <p className="error-message">
                        {error == 3
                            ? "Выберите жанры игр"
                            : "Добавьте изображение команды"}
                    </p>
                ) : (
                    ""
                )}
                <div className="buttons">
                    <button
                        type="button"
                        onClick={() =>
                            update
                                ? navigate(
                                      "../team/" +
                                          location.pathname.split("/")[2]
                                  )
                                : navigate("../team")
                        }
                    >
                        Отмена
                    </button>
                    <button type="button" onClick={() => create()}>
                        Сохранить
                    </button>
                </div>
            </form>
            <img
                className="logo"
                alt="Логотип"
                src={logo}
                onClick={() => navigate("../")}
            />
            <img
                className="back-image1"
                alt="Фоновое изображение"
                src={image1}
            />
            <img
                className="back-image2"
                alt="Фоновое изображение"
                src={image2}
            />
            <img
                className="mobile-only"
                alt="Фоновое изображение"
                src={image_mobile}
            />
        </div>
    );
    function getGenresForP() {
        const text = genres
            .filter((elem) => elem.checked)
            .map((elem) => elem.title)
            .toString();
        return text != "" ? text : "Не выбрано";
    }
    function create() {
        const body = {
            title: document.getElementById("team-create-title").value.trim(),
            description: document
                .getElementById("team-create-description")
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
                : document.getElementById("team-file-input").files.length == 0
                ? 4
                : 0;
        setError(error_check);
        if (error_check != 0) return;
        const data = new FormData();
        data.append(
            "image",
            document.getElementById("team-file-input").files[0]
        );
        data.append("title", body.title);
        data.append("description", body.description);
        data.append("genres", body.genres);

        axios
            .post(
                window.location.origin +
                    "/api/team" +
                    (update ? "/" + location.pathname.split("/")[2] : ""),
                data,
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
                navigate("../team/" + response.data.id);
            });
    }
    function getTeam() {
        const id = location.pathname.split("/")[2];
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/team/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setTeam(response.data);
                const selectedGenres = response.data.genres.split("&");
                setGenres(
                    [
                        "Экшн",
                        "Стратегия",
                        "RPG",
                        "Шутер",
                        "Казуальные",
                        "Аркады",
                        "Платформеры",
                        "Файтинги",
                    ].map((elem) =>
                        selectedGenres.includes(elem)
                            ? { title: elem, checked: true }
                            : { title: elem, checked: false }
                    )
                );
            });
    }
}
