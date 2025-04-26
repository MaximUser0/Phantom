import React from "react";
import logo from "../assets/img//logo.svg";
import WhatsApp from "../assets/img/WhatsApp.svg";
import GitHub from "../assets/img/GitHub.svg";
import Telegram from "../assets/img/Telegram.svg";
import VK from "../assets/img/VK.svg";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();
    return (
        <footer
            className={
                location.pathname != "/"
                    ? location.pathname == "/login" ||
                      location.pathname == "/sing-up" ||
                      location.pathname == "/survey"
                        ? "block-hidden"
                        : "mobile-only"
                    : ""
            }
        >
            <div>
                <div className="logo">
                    <img alt="Логотип" src={logo} />
                    <p>
                        Присоединяйтесь к сообществу геймеров, делитесь своими
                        игровыми предпочтениями и находите тиммейтов для
                        захватывающих совместных игр. С нами каждый игровой
                        вечер станет незабываемым!
                    </p>
                </div>
                <div className="mobile-only">
                    <p>Условия и положения</p>
                    <p>Политика конфиденциальности</p>
                </div>
                <div className="news">
                    <p>Новости</p>
                    <p>Форум</p>
                    <p>Команды</p>
                    <p>Профиль</p>
                    <p>Игры</p>
                </div>

                <div className="SocialNetworks">
                    <img alt="WhatsApp" src={WhatsApp} />
                    <img alt="GitHub" src={GitHub} />
                    <img alt="Telegram" src={Telegram} />
                    <img alt="VK" src={VK} />
                </div>
            </div>
            <hr />
            <p>Copyright All Rights Reserved 2025 © </p>
        </footer>
    );
}
