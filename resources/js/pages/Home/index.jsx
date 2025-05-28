import React from "react";
import text from "../../assets/img/phantom_text_small.svg";
import image2 from "../../assets/img/home_image2.png";
import image2_mobile from "../../assets/img/home_image2_mobile.png";
import image3 from "../../assets/img/home_image3.png";
import image4 from "../../assets/img/home_image4.png";
import image6 from "../../assets/img/home_image6.png";
import image7 from "../../assets/img/home_image7.png";
import image8 from "../../assets/img/home_image8.png";
import image_block2_mobile from "../../../../public/img/home_image2_mobile.png";
import logo from "../../assets/img//logo.svg";
import { useNavigate } from "react-router-dom";
import GameBlock from "./GameBlock";
import SocialNetworks from "./SocialNetworks";
import FindTeam from "./FindTeam";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="Home">
            <FindTeam />
            <SocialNetworks />
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
                <img
                    alt="Фоновое изображение"
                    src={image_block2_mobile}
                    className="mobile-image"
                />
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
                    <button
                        onClick={() => {
                            sessionStorage.getItem("token") != null
                                ? navigate("/profile")
                                : navigate("/sing-up");
                        }}
                    >
                        Регистрация
                    </button>
                </div>

                <img className="back" alt="Фон" src={image2} />
                <img className="back-mobile" alt="Фон" src={image2_mobile} />
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
            <GameBlock />
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
                <button
                    onClick={() => {
                        navigate("../login");
                    }}
                >
                    Регистрация
                </button>
            </div>
        </div>
    );
}
