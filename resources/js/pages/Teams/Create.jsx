import React from "react";
import logo from "../../assets/img/logo.svg";
import image1 from "../../assets/img/create_team_image.png";
import image2 from "../../assets/img/create_team_image2.png";
import image_mobile from "../../assets/img/create_team_image.svg";
import arrow from "../../assets/img/arrow.svg";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const navigate = useNavigate();
    return (
        <div className="CreateTeam">
            <div>
                <h1>Создание команды</h1>
                <label>Название команды</label>
                <input />
                <label>Описание</label>
                <input />
                <label>Жанры</label>
                <div className="genre">
                    <div className="select">
                        <select id="team-genre-select">
                            <option>Шутер</option>
                            <option>Аркада</option>
                            <option>Головоломка</option>
                        </select>
                        <img alt="Выбрать жанр" src={arrow} />
                    </div>
                    <div className="file">
                        <button
                            onClick={() =>
                                document
                                    .getElementById("team-file-input")
                                    .click()
                            }
                        >
                            Выбрать файл
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            id="team-file-input"
                            onChange={(e) => {document.querySelector(".CreateTeam .file label").textContent = e.target.files[0].name}}
                        />
                        <label></label>
                    </div>
                </div>
                <div className="buttons">
                    <button>Отмена</button>
                    <button>Сохранить</button>
                </div>
            </div>
            <img className="logo" alt="Логотип" src={logo} onClick={() => navigate('../')}/>
            <img
                className="back-image1"
                alt="Фоновое изображение"
                src={image1}
            />
            <img
                className="back-image2"
                alt="Фоновое изображение"
                src={image2}
            />
            <img
                className="mobile-only"
                alt="Фоновое изображение"
                src={image_mobile}
            />
        </div>
    );
}
