import React from "react";
import image from "../assets/img/game_image.png";
export default function Game() {
    const [game, setGame] = React.useState({
        genres: "",
        images: "",
    });
    const [selected, setSelected] = React.useState(0);
    const id = location.pathname.split("/")[2];
    React.useEffect(() => {
        getGame();
    }, []);

    return (
        <div className="Game">
            <div className="info">
                <h1 className="mobile-only">{game.title}</h1>
                <img alt="Изображение игры" src={game.image} />
                <div>
                    <h1 className="desktop-only">{game.title}</h1>
                    <div className="genres">
                        {game.genres.split("&").map((genre, i) => (
                            <p className="genre" key={"game-genre-" + i}>
                                {genre}
                            </p>
                        ))}
                    </div>
                    <p>{game.description}</p>
                </div>
                <div className="back-shadow"></div>
            </div>
            <div className="images">
                {game.images.split("&").map((src, i) => (
                    <img
                        alt="Изображение игры"
                        key={"game-page-image-" + i}
                        src={src}
                        className={selected == i ? "selected" : ""}
                        onClick={() => setSelected(i)}
                    />
                ))}
            </div>
            <img alt="Фоновое изображение" className="back-image" src={image} />
        </div>
    );
    function getGame() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/game/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setGame(response.data);
            });
    }
}
