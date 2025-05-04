import React from "react";
import { useSelector } from "react-redux";

export default function FirstStep({ setStep, setFavoriteGenres }) {
    const [error, setError] = React.useState(false);
    const user = useSelector((state) => state.auth.user);
    const [selected, setSelected] = React.useState(
        user.name != null
            ? user.favorite_genres.split("&")
            : null
    );

    const genres = [
        "Экшн",
        "Стратегия",
        "RPG",
        "Шутер",
        "Казуальные",
        "Аркады",
        "Платформеры",
        "Файтинги",
    ];
    React.useEffect(() => {}, [user]);

    return (
        <>
            <div className="FirstStep">
                <h1>Пройдите опрос</h1>
                <h2>
                    <span>Любимые</span> жанры игр
                </h2>
                <div className="block">
                    {genres.map((value, i) => (
                        <div key={"survey-page-genre-" + i} genreindex={i}>
                            <input
                                type="checkbox"
                                defaultChecked={
                                    selected != null
                                        ? selected.includes(value)
                                            ? "checked"
                                            : false
                                        : false
                                }
                            />
                            <label>{value}</label>
                        </div>
                    ))}
                </div>

                <button onClick={() => favoriteGenres()}>
                    Следующий вопрос
                </button>
                <p>
                    <span>1 шаг</span> из 3
                </p>
            </div>
            {error ? (
                <p className="error-message">Выберите хотя бы один жанр</p>
            ) : (
                ""
            )}
        </>
    );
    function favoriteGenres() {
        const block = document.querySelector(".FirstStep .block").childNodes;
        let selectedGenres = "";
        block.forEach((div) => {
            if (div.children[0].checked) {
                selectedGenres +=
                    (selectedGenres != "" ? "&" : "") +
                    genres[div.getAttribute("genreindex")];
            }
        });
        if (selectedGenres == "") {
            setError(true);
            return;
        }
        console.log(selectedGenres);
        setFavoriteGenres(selectedGenres);
        setStep(1);
    }
}
