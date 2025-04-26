import React from "react";
import example from "../../../../public/img/example.jpg";
import gradient from "../../assets/img/back_gradient.svg";
import image from "../../assets/img/profile_image.png";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    return (
        <div className="Profile">
            <div className="buttons">
                <div>
                    <img alt="Изображение пользователя" src={example} />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="66"
                        height="49"
                        viewBox="0 0 66 49"
                        fill="none"
                        className="right-top"
                    >
                        <path
                            d="M0 0.128906H66V48.1289V47.802C66 44.486 64.3562 41.3856 61.6114 39.5248L6.04124 1.85171C4.38522 0.729032 2.43052 0.128906 0.429824 0.128906H0Z"
                            fill="#000623"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="66"
                        height="49"
                        viewBox="0 0 66 49"
                        fill="none"
                        className="left-bottom"
                    >
                        <path
                            d="M66 48L0 48L4.19629e-06 -5.7699e-06L4.16772e-06 0.326888C3.87782e-06 3.64293 1.64383 6.74331 4.38858 8.60408L59.9588 46.2772C61.6148 47.3999 63.5695 48 65.5702 48L66 48Z"
                            fill="#12245c"
                        />
                    </svg>
                </div>
                <button className="desktop-only">Удалить аккаунт</button>
                <button className="desktop-only">Выбрать фото</button>
                <button className="light-button desktop-only">
                    Редактировать
                </button>
                <img
                    className="gradient"
                    alt="Фоновый градиент"
                    src={gradient}
                />
            </div>
            <div className="info">
                <div className="name">
                    <h2>fantom_skitsa</h2>
                    <p>Был в сети: 13.01.2025 в 11:25</p>
                </div>
                <p className="desktop-only">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sit amet tellus sit amet risus vulputate euismod.
                    Nunc molestie urna sit amet enim euismod, non convallis
                    felis tempor. Nam a aliquam massa, in consequat felis. Cras
                    sollicitudin elementum mi, id sollicitudin est. Nulla
                    malesuada cursus augue, non facilisis felis.
                </p>
                <div className="user">
                    <p>Дата рождения: 04.09.2005</p>
                    <p>Пол: Муж.</p>
                </div>
                <div className="games">
                    <h3>Любимые жанры:</h3>
                    <h3>Любимые игры:</h3>
                    <p>Экшн, RPG, Шутеры, Файтинги</p>
                    <p>DOTA 2, Valorant, PUBG, WarThunder</p>
                </div>
                <div className="summary desktop-only">
                    <div onClick={() => navigate("../my-team")}>
                        <p>Команды</p>
                        <p>2</p>
                    </div>
                    <div>
                        <p>Комментарии</p>
                        <p>4</p>
                    </div>
                    <div>
                        <p>Форумы</p>
                        <p>6</p>
                    </div>
                </div>
            </div>
            <p className="mobile-only">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sit amet tellus sit amet risus vulputate euismod. Nunc molestie
                urna sit amet enim euismod, non convallis felis tempor. Nam a
                aliquam massa, in consequat felis. Cras sollicitudin elementum
                mi, id sollicitudin est. Nulla malesuada cursus augue, non
                facilisis felis.
            </p>
            <div className="mobile-only summary">
                <div onClick={() => navigate("../my-team")}>
                    <p>Команды</p>
                    <p>2</p>
                </div>
                <div>
                    <p>Комментарии</p>
                    <p>4</p>
                </div>
                <div>
                    <p>Форумы</p>
                    <p>6</p>
                </div>
            </div>
            <img className="back_image" alt="Фоновый изображение" src={image} />
        </div>
    );
}
