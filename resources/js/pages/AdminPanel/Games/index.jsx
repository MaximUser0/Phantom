import React from "react";
import Pagination from "../../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";

export default function Games() {
    const [paginationInfo, setPaginationInfo] = React.useState({});
    const [active, setActive] = React.useState(0);
    const navigate = useNavigate();
    const [games, setGames] = React.useState([]);
    React.useEffect(() => {
        getGames();
    }, [active]);
    return (
        <div className="AdminGames">
            <Link to={"../admin-panel/game_create"}>Создать игру +</Link>
            <div className="list">
                {games.map((value, i) => (
                    <div key={"admin-games-page-game-" + i}>
                        <img alt="Изображение игры" src={value.image} />
                        <div className="description">
                            <h3 onClick={() => navigate("../game/" + value.id)}>{value.title}</h3>
                            <p>{value.description}</p>
                        </div>
                        <div className="genre">
                            <p>Жанр:</p>
                            {value.genres
                                .split("&")
                                .slice(0, 3)
                                .map((text, i) => (
                                    <p key={"games-admin-genre-" + i}>{text}</p>
                                ))}
                        </div>
                        <div className="buttons">
                            <button
                                className="green"
                                onClick={() =>
                                    navigate(
                                        "../admin-panel/game_create/" + value.id
                                    )
                                }
                            >
                                Редактировать
                            </button>
                            <button
                                className="red"
                                onClick={() => deleteGame(value.id, i)}
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
    function getGames() {
        axios
            .get(window.location.origin + "/api/game?page=" + (active + 1), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setGames(response.data.data);
                setPaginationInfo({
                    last_page: response.data.last_page,
                    current_page: response.data.current_page,
                });
            });
    }
    function deleteGame(id, i) {
        if (!confirm("Вы хотите удалить новость?")) return;
        axios
            .delete(window.location.origin + "/api/game/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(() => {
                games.splice(i, 1);
                setGames([...games]);
                getGames();
            });
    }
}
