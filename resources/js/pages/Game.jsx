import React from "react";
import image from "../assets/img/game_image.png";
export default function Game() {
    const [game, setGame] = React.useState({
        title: "DOTA2",
        description: `Яркий представитель одного из последних жанров компьютерных игр под названием Multiplayer Online Battle Arena (MOBA, МОБА). Этот жанр родился, взяв из нескольких других всего по чуть-чуть. И получилось так, что отыгрывая одну игру длиной в 40 минут в среднем, можно пережить в ускоренном режиме все развитие персонажей, характерное для ММОРПГ , поучаствовать в динамичных боях, решающихся за секунды и составить целую стратегию действий своей команды (элемент из стратегий).
Несмотря на то, что фактическим началом жанра является карта Aeon of Strife игры StarCraft, основателем можно считать кастомную карту Warcraft III DotA. Она была первым представителем жанра, и все игры, создававшиеся на ее основе изначально назывались "dota-подобными". 
В 2009 году вышла одна из первых независимых игр в этом жанре - League Of Legends. Именно ее разработчики распространяли сам термин MOBA в своем стремлении избавиться от ассоциаций с DotA.`,
        genre: "Стратегии",
        image: "../img/example.jpg",
        images: [
            "../img/Example2.svg",
            "../img/example.jpg",
            "../img/example.jpg",
            "../img/example.jpg",
            "../img/example.png",
            "../img/example.jpg",
            "../img/example.jpg",
            "../img/example.png",
            "../img/example.jpg",
        ],
    });
    const [selected, setSelected] = React.useState(0);
    return (
        <div className="Game">
            <div className="info">
                <h1 className="mobile-only">{game.title}</h1>
                <img alt="Изображение игры" src={game.image} />
                <div>
                    <h1 className="desktop-only">{game.title}</h1>
                    <p className="genre">{game.genre}</p>
                    <p>{game.description}</p>
                </div>
                <div className="back-shadow"></div>
            </div>
            <div className="images">
                {game.images.map((src, i) => (
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
}
