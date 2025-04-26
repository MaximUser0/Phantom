import React from "react";
import image5 from "../../assets/img/home_image5.png";
import game from "../../assets/img/game1.png";
import game1 from "../../assets/img/game2.png";
import game2 from "../../assets/img/game3.png";
import game3 from "../../assets/img/game4.png";
import game4 from "../../assets/img/game5.png";
import game5 from "../../assets/img/game6.png";
import game6 from "../../assets/img/game7.png";
import game7 from "../../assets/img/game8.png";
import game8 from "../../assets/img/game9.png";

export default function GameBlock() {
    const games = [
        game,
        game1,
        game2,
        game3,
        game4,
        game5,
        game6,
        game7,
        game8,
    ];
    return (
        <div className="GamesBlock">
            <div>
                <h2>
                    Обширная игровая <span>Библиотека</span>
                </h2>
                <div>
                    {games.map((value, i) => (
                        <img alt="Игра" src={value} key={"home-game-" + i} />
                    ))}
                </div>
            </div>
            <div className="right">
                <img alt="Игровой арт" src={image5} />
                <p>
                    Погрузитесь в мир бесконечных возможностей с нашей обширной
                    игровой библиотекой! Мы собрали для вас разнообразные игры
                    различных жанров, от классических до новейших релизов, чтобы
                    каждый геймер мог найти что-то по своему вкусу. Наша
                    платформа позволяет легко и быстро находить единомышленников
                    для совместных приключений, будь то увлекательные
                    многопользовательские сражения или кооперативные квесты.
                </p>
            </div>
        </div>
    );
}
