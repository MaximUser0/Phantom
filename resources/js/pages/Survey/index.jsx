import React from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Survey() {
    const navigate = useNavigate();
    const [step, setStep] = React.useState(0);
    const [favoriteGenres, setFavoriteGenres] = React.useState(null);
    const [favoriteGames, setFavoriteGames] = React.useState(null);
    return (
        <div className="Survey">
            {step == 0 ? (
                <FirstStep
                    setStep={setStep}
                    setFavoriteGenres={setFavoriteGenres}
                />
            ) : step == 1 ? (
                <SecondStep
                    setStep={setStep}
                    setFavoriteGames={setFavoriteGames}
                />
            ) : step == 2 ? (
                <ThirdStep favoriteThinks={{ favoriteGames, favoriteGenres }} />
            ) : (
                ""
            )}
            <img alt="Логотип" src={logo} onClick={() => navigate("../")} />
        </div>
    );
}
