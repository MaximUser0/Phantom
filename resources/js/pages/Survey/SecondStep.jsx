import React from "react";

export default function SecondStep({ setStep, setFavoriteGames }) {
    const [error, setError] = React.useState(false);
    const games = [
        "DOTA2",
        "Call of duty",
        "AmongUs",
        "CS:GO2",
        "Warface",
        "Minecraft",
        "League of Legends",
        "Mobile Legends",
        "ApexLegends",
        "Valorant",
        "Blade and Soul",
        "GTA",
        "Аватария",
        "LostArk",
        "WarThunder",
        "Fortnite",
        "Rust",
        "World of Tanks",
        "OWERWATCH",
        "Black Desert",
        "Battlefield",
        "PUBG",
        "Mortal Combat",
        "HearthStone",
    ];
    return (
        <>
            <div className="SecondStep">
                <h1>Пройдите опрос</h1>
                <h2>
                    Выберите игры, <span>которые вам нравятся</span>
                </h2>
                <div className="block">
                    {games.map((value, i) => (
                        <div key={"survey-page-game-" + i} gameIndex={i}>
                            <input type="checkbox" />
                            <label>{value}</label>
                        </div>
                    ))}
                </div>

                <button onClick={() => favoriteGame()}>Следующий вопрос</button>
                <p>
                    <span>2 шаг</span> из 3
                </p>
            </div>
            {error ? (
                <p className="error-message">Выберите хотя бы одну игру</p>
            ) : (
                ""
            )}
        </>
    );
    function favoriteGame() {
        const block = document.querySelector(".SecondStep .block").childNodes;
        let selectedGames = "";
        block.forEach((div) => {
            if (div.children[0].checked) {
                selectedGames +=
                    (selectedGames != "" ? "&" : "") +
                    games[div.getAttribute("gameIndex")];
            }
        });
        if (selectedGames == "") {
            setError(true);
            return;
        }
        console.log(selectedGames);
        setFavoriteGames(selectedGames);
        setStep(2);
    }
}
