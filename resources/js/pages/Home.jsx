import React from "react";
import image from "../assets/img/phantom_text.svg";
import text from "../assets/img/phantom_text_small.svg";
import image1 from "../assets/img/home_image.svg";
import image2 from "../assets/img/home_image2.png";
import image3 from "../assets/img/home_image3.png";
import image4 from "../assets/img/home_image4.png";
import image5 from "../assets/img/home_image5.png";
import image6 from "../assets/img/home_image6.png";
import image7 from "../assets/img/home_image7.png";
import image8 from "../assets/img/home_image8.png";
import game from "../assets/img/game1.png";
import game1 from "../assets/img/game2.png";
import game2 from "../assets/img/game3.png";
import game3 from "../assets/img/game4.png";
import game4 from "../assets/img/game5.png";
import game5 from "../assets/img/game6.png";
import game6 from "../assets/img/game7.png";
import game7 from "../assets/img/game8.png";
import game8 from "../assets/img/game9.png";
import logo from "../assets/img//logo.svg";
import shadow from "../assets/img/shadow.svg";
import arrow from "../assets/img/arrow_font.svg";
import WhatsApp from "../assets/img/WhatsApp.svg";
import GitHub from "../assets/img/GitHub.svg";
import Telegram from "../assets/img/Telegram.svg";
import VK from "../assets/img/VK.svg";

export default function Home() {
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
        <div className="Home">
            <div className="FindTeam">
                <img alt="Фоновое изображение" src={image} />
                <p>
                    ваш идеальный форум для поиска тиммейтов в любимые игры! Мы
                    объединяем геймеров со всего мира, чтобы вы могли легко
                    находить единомышленников для совместных приключений,
                    стратегий и побед.
                </p>
                <div>
                    <button>Найти команду</button>
                    <button>
                        <img alt="Перейти" src={arrow} />
                    </button>
                </div>
                <div className="big-image">
                    <img alt="Фоновое изображение" src={image1} />
                    <img alt="Фоновое изображение" src={shadow} />
                </div>
            </div>
            <div className="SocialNetworks">
                <img alt="WhatsApp" src={WhatsApp} />
                <img alt="GitHub" src={GitHub} />
                <img alt="Telegram" src={Telegram} />
                <img alt="VK" src={VK} />
            </div>
            <div className="Block2">
                <div className="left">
                    <h3>
                        <span>Персонализированный</span> подбор игроков
                    </h3>
                    <p>
                        Phantom.net представляет поиск напарников для игр. Мы
                        изучаем ваш стиль игры, уникальные скиллы и способности,
                        чтобы подобрать игроков соответствующего уровня.
                    </p>
                    <h3>
                        <span>Оставайтесь на связи</span> с вашими тиммейтами
                    </h3>
                    <p>
                        Phantom.net – уникальная соц сеть для геймеров.
                        Общайтесь с тиммейтами, создавайте посты и участвуйте в
                        групповых обсуждениях.
                    </p>
                    <h3>
                        Свежие <span>игровые новости</span>
                    </h3>
                    <p>Будьте в курсе всех событий игрового мира.</p>
                </div>
                <div className="right">
                    <h2>Найти тиммейта</h2>
                    <h3>
                        Для <span>успешной</span> игры
                    </h3>
                </div>
            </div>
            <div className="WhyBlock">
                <h2>
                    Почему Phantom<span>.net</span>
                </h2>
                <div>
                    <div>
                        <h3>Удобный поиск</h3>
                        <p>
                            Легко находите игроков по играм, уровням навыков и
                            предпочтениям. Укажите, в какие игры вы хотите
                            играть, и находите подходящих тиммейтов за считанные
                            минуты.
                        </p>
                    </div>
                    <div>
                        <h3 className="blue">
                            Интерактив
                            <br />
                            ный чат
                        </h3>
                        <p>
                            Общайтесь с потенциальными партнёрами в реальном
                            времени! Наш встроенный чат позволяет обсуждать
                            стратегии, делиться опытом и просто заводить новые
                            знакомства.
                        </p>
                    </div>
                    <div>
                        <h3 className="blue">Безопасность и комфорт</h3>
                        <p>
                            Мы заботимся о вашем комфорте и безопасности.
                            Модераторы следят за порядком, а система отзывов
                            поможет вам выбирать надежных партнёров.
                        </p>
                    </div>
                    <div>
                        <h3>События и турниры</h3>
                        <p>
                            Участвуйте в организованных событиях и турнирах, где
                            вы сможете проверить свои навыки и встретить новых
                            друзей!
                        </p>
                    </div>
                    <button>Регистрация</button>
                </div>

                <img className="back" alt="Фон" src={image2} />
                <img className="astronaut" alt="Космонавт" src={image3} />
            </div>
            <div className="UserCountBlock">
                <h2>
                    Больше, чем поиск <span>напарников</span> для игр
                </h2>
                <img alt="Игровой арт" src={image4} />
                <hr />
                <p>
                    Более 100<span>К</span> пользователей
                </p>
            </div>
            <div className="TakeTheSurveyBlock">
                <p>
                    Пройдя наш опрос, ты сможешь создать уникальный профиль,
                    который поможет другим пользователям узнать о тебе больше.
                </p>
                <div>
                    <img alt="Логотип" src={logo} />
                    <h3>
                        Пройди <span>опрос</span>, чтобы другие смогли найти{" "}
                        <span>именно тебя</span>!
                    </h3>
                </div>
            </div>
            <div className="GamesBlock">
                <div>
                    <h2>
                        Обширная игровая <span>Библиотека</span>
                    </h2>
                    <div>
                        {games.map((value, i) => (
                            <img
                                alt="Игра"
                                src={value}
                                key={"home-game-" + i}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <img alt="Игровой арт" src={image5} />
                    <p>
                        Погрузитесь в мир бесконечных возможностей с нашей
                        обширной игровой библиотекой! Мы собрали для вас
                        разнообразные игры различных жанров, от классических до
                        новейших релизов, чтобы каждый геймер мог найти что-то
                        по своему вкусу. Наша платформа позволяет легко и быстро
                        находить единомышленников для совместных приключений,
                        будь то увлекательные многопользовательские сражения или
                        кооперативные квесты.
                    </p>
                </div>
            </div>
            <div className="ChatBlock">
                <div>
                    <h2>
                        Командный чат для <span>игры</span>
                    </h2>
                    <p>
                        Наш командный чат — это идеальное место для общения и
                        координации действий с вашими будущими тиммейтами. Здесь
                        вы сможете не только обсудить стратегии и тактики игр,
                        но и познакомиться с игроками, разделяющими ваши
                        интересы и цели. Наша платформа предоставляет удобный
                        интерфейс для общения в реальном времени, где каждый
                        участник может задавать вопросы, делиться опытом и
                        находить единомышленников.
                    </p>
                </div>
                <img alt="Чат" src={image6} />
            </div>
            <div className="JoinToCommunityBlock">
                <img className="game-over" alt="Game over" src={image8} />
                <img className="art" alt="Игровой арт" src={image7} />
                <div>
                    <p>
                        Станьте частью игрового сообщества с{" "}
                        <img alt="Чат" src={text} />
                    </p>
                </div>
                <button>Регистрация</button>
            </div>
        </div>
    );
}
