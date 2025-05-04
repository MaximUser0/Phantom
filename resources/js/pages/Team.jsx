import React from "react";
import image from "../assets/img/team_image.png";
import image2 from "../assets/img/team_image2.png";
import { useNavigate } from "react-router-dom";

export default function Team() {
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];
    const [team, setTeam] = React.useState({
        genres: "",
        participants: [],
    });
    React.useEffect(() => {
        getTeam();
    }, []);

    return (
        <div className="Team">
            <h2 className="mobile-only">{team.title}</h2>
            <div className="buttons">
                <div>
                    <img
                        alt="Изображение пользователя"
                        src={
                            team.image != null
                                ? team.image
                                : "../img/Example2.svg"
                        }
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="66"
                        height="49"
                        viewBox="0 0 66 49"
                        fill="none"
                        className="right-top"
                    >
                        <path
                            d="M0 0.128906H66V48.1289V47.802C66 44.486 64.3562 41.3856 61.6114 39.5248L6.04124 1.85171C4.38522 0.729032 2.43052 0.128906 0.429824 0.128906H0Z"
                            fill="#020221"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="66"
                        height="49"
                        viewBox="0 0 66 49"
                        fill="none"
                        className="left-bottom"
                    >
                        <path
                            d="M66 48L0 48L4.19629e-06 -5.7699e-06L4.16772e-06 0.326888C3.87782e-06 3.64293 1.64383 6.74331 4.38858 8.60408L59.9588 46.2772C61.6148 47.3999 63.5695 48 65.5702 48L66 48Z"
                            fill="#0d093a"
                        />
                    </svg>
                </div>
                <button className="desktop-only" onClick={() => deleteTeam()}>
                    Удалить команду
                </button>
                <button
                    className="desktop-only"
                    onClick={() => {
                        if (team.is_owner) {
                            document
                                .getElementById("team-input-for-image")
                                .click();
                        }
                    }}
                >
                    Выбрать файл
                </button>
                <button
                    className="light-button desktop-only"
                    onClick={() => {
                        if (team.is_owner) {
                            navigate("../team-create/" + id);
                        }
                    }}
                >
                    Редактировать
                </button>
                <div className="gradient"></div>
            </div>
            <div className="info">
                <h2 className="desktop-only">{team.title}</h2>
                <p>{team.description}</p>
                <div className="mobile-only">
                    <button onClick={() => deleteTeam()}>
                        Удалить команду
                    </button>
                    <button
                        onClick={() => {
                            if (team.is_owner) {
                                document
                                    .getElementById("team-input-for-image")
                                    .click();
                            }
                        }}
                    >
                        Выбрать файл
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        id="team-input-for-image"
                        onChange={(e) => changeImage(e.target.files[0])}
                    />
                    <button
                        className="light-button"
                        onClick={() => {
                            if (team.is_owner) {
                                navigate("../team-create/"+ id);
                            }
                        }}
                    >
                        Редактировать
                    </button>
                </div>
                <h3>Категории игр команды</h3>
                <div className="categories">
                    {team.genres.split("&").map((genre, i) => (
                        <p key={"team-page-category-" + i}>{genre}</p>
                    ))}
                </div>
                <h3>Участники</h3>
                <div className="owner">
                    <img
                        alt="Изображение пользователя"
                        src={team.owner_image}
                    />
                    <p>{team.name}</p>
                    <p className="creator">Создатель</p>
                </div>
                <div className="participants">
                    {team.participants.map((participant, i) => (
                        <div key={"team-page-participant-" + i}>
                            <div
                                onClick={() => {
                                    const elem = document.getElementById(
                                        "team-page-participant-div-" + i
                                    );
                                    if (window.screen.width > 1080) {
                                        deleteParticipant(participant.id, i);
                                        return;
                                    }
                                    if (elem.classList.contains("clicked")) {
                                        deleteParticipant(participant.id, i);
                                        return;
                                    }
                                    elem.classList.add("clicked");
                                }}
                                id={"team-page-participant-div-" + i}
                            >
                                <img
                                    alt="Изображение пользователя"
                                    src={participant.image}
                                />
                            </div>
                            <p>{participant.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="links">
                <div className="chat">
                    <h2>Чат команды</h2>
                    <button onClick={() => navigate("../chat/" + team.chat_id)}>
                        Перейти в чат
                    </button>
                </div>
                <div className="find">
                    <h2>Найти команду</h2>
                    <button onClick={() => navigate("../team")}>Искать</button>
                </div>
            </div>
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
    function getTeam() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/team/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setTeam(response.data);
            });
    }
    function changeImage(file) {
        if (!team.is_owner) {
            return;
        }
        const body = new FormData();
        body.append("image", file);
        body.append("team_id", id);
        axios
            .post(window.location.origin + "/api/team/image", body, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                team.image = response.data;
                setTeam({ ...team });
            })
            .catch(() => {
                alert("Максимальный размер изображения 4МБ");
            });
    }
    function deleteTeam() {
        if (!team.is_owner) {
            return;
        }
        if (
            !confirm("Вы хотите удалить команду? Это действие нельзя отменить.")
        )
            return;
        axios
            .delete(window.location.origin + "/api/team/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                navigate("../team");
            })
            .catch(() => {
                alert("Не удалось удалить команду");
            });
    }
    function deleteParticipant(index, i) {
        if (!team.is_owner) {
            return;
        }
        if (!confirm("Удалить участника?")) {
            if (window.screen.width <= 1080) {
                document
                    .getElementById("team-page-participant-div-" + i)
                    .classList.remove("clicked");
            }
            return;
        }
        axios
            .delete(window.location.origin + "/api/team/participant/" + index, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(() => {
                team.participants.splice(i, 1);
                setTeam({ ...team });
            })
            .catch(() => {
                alert("Не удалось удалить участника");
            });
    }
}
