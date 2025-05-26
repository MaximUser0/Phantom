import React from "react";
import icon from "../assets/img/forum_icon.svg";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function Games() {
    const navigate = useNavigate();
    const [games, setGames] = React.useState([]);
    const [paginationInfo, setPaginationInfo] = React.useState({});
    const [active, setActive] = React.useState(0);
    React.useEffect(() => {
        getGames();
    }, [active]);

    return (
        <div className="Games">
            <h1>Игры</h1>
            <div className="list">
                {games.map((value, i) => (
                    <div
                        key={"games-page-game-" + i}
                        onClick={() => navigate("../game/" + value.id)}
                    >
                        <img alt="Изображение игры" src={value.image} />
                        <div className="info">
                            <h2>{value.title}</h2>
                            <p>{value.description}</p>
                            <a className="desktop-only">Подробнее...</a>
                        </div>
                        <a className="mobile-only">Подробнее...</a>
                        <div className="genre">
                            <div>
                                <p>Жанр:</p>
                                {value.genres.split("&").slice(0, 3).map((text, i) => (
                                    <p key={"games-genre-" + i}>{text}</p>
                                ))}
                            </div>
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
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/game?page=" + (active + 1), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setGames(response.data.data);
                setPaginationInfo({
                    last_page: response.data.last_page,
                    current_page: response.data.current_page,
                });
            });
    }
}
