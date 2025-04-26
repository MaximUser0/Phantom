import React from "react";
import image from "../../assets/img/phantom_text.svg";
import image1 from "../../assets/img/home_image.svg";
import image1_mobile from "../../assets/img/home_image_mobile.png";
import shadow_mobile from "../../assets/img/home_shadow_mobile.svg";
import shadow from "../../assets/img/shadow.svg";
import logo from "../../assets/img//logo.svg";
import arrow from "../../assets/img/arrow_font.svg";

export default function FindTeam() {
    return (
        <div className="FindTeam">
            <img
                alt="Фоновое изображение"
                src={image}
                className="desktop-only"
            />
            <img alt="Фоновое изображение" src={logo} className="mobile-only" />
            <p>
                ваш идеальный форум для поиска тиммейтов в любимые игры! Мы
                объединяем геймеров со всего мира, чтобы вы могли легко находить
                единомышленников для совместных приключений, стратегий и побед.
            </p>
            <div>
                <button>Найти команду</button>
                <button>
                    <img alt="Перейти" src={arrow} />
                </button>
            </div>
            <div className="big-image">
                <img
                    alt="Фоновое изображение"
                    src={image1}
                    className="desktop-only"
                />
                <img
                    alt="Фоновое изображение"
                    src={image1_mobile}
                    className="mobile-only"
                />
                <img
                    alt="Фоновое изображение"
                    src={shadow_mobile}
                    className="mobile-only shadow"
                />
                <img
                    alt="Фоновое изображение"
                    src={shadow}
                    className="desktop-only"
                />
            </div>
        </div>
    );
}
