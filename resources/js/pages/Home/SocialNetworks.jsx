import React from "react";
import WhatsApp from "../../assets/img/WhatsApp.svg";
import GitHub from "../../assets/img/GitHub.svg";
import Telegram from "../../assets/img/Telegram.svg";
import VK from "../../assets/img/VK.svg";

export default function SocialNetworks() {
    return (
        <div className="SocialNetworks">
            <img alt="WhatsApp" src={WhatsApp} />
            <img alt="GitHub" src={GitHub} />
            <img alt="Telegram" src={Telegram} />
            <img alt="VK" src={VK} />
        </div>
    );
}
