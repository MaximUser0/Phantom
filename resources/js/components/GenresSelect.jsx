import React from "react";
import arrow from "../assets/img/arrow.svg";

export default function GenresSelect({ genres, setGenres }) {
    const [showGenres, setShowGenres] = React.useState(false);
    return (
        <div className="GenreSelect">
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
                                    genres[i].checked = !genres[i].checked;
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
    );

    function getGenresForP() {
        const text = genres
            .filter((elem) => elem.checked)
            .map((elem) => elem.title)
            .toString();
        return text != "" ? text : "Не выбрано";
    }
}
