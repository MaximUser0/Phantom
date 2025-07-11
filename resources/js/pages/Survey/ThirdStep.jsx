import React from "react";
import { useNavigate } from "react-router-dom";
import woman from "../../assets/img/woman_icon.svg";
import man from "../../assets/img/man_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

export default function ThirdStep({ favoriteThinks }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [error, setError] = React.useState({ input: 0, message: "" });
    const [selectGender, setSelectGender] = React.useState(
        user.name != null ? user.gender : 0
    );
    return (
        <>
            <div className="ThirdStep">
                <h1>
                    Личные <span>данные</span>
                </h1>
                <div className="data">
                    <label>Имя пользователя</label>
                    <input
                        type="text"
                        placeholder="Введите ваше имя пользователя"
                        id="survey-name"
                        className={error.input == 1 ? "error" : ""}
                        defaultValue={
                            sessionStorage.getItem("token") != null
                                ? user.name
                                : null
                        }
                    />
                    <label>Описание</label>
                    <textarea
                        type="text"
                        placeholder="Введите ваше описание"
                        id="survey-description"
                        className={error.input == 2 ? "error" : ""}
                        defaultValue={
                            sessionStorage.getItem("token") != null
                                ? user.description
                                : ""
                        }
                    ></textarea>
                    <label>Дата рождения</label>
                    <input
                        type="date"
                        min="1910-01-01"
                        max="2023-01-01"
                        id="survey-date"
                        className={error.input == 2 ? "error" : ""}
                        defaultValue={
                            sessionStorage.getItem("token") != null
                                ? user.date_of_birth
                                : null
                        }
                    />
                    <label>Выберите ваш пол</label>
                    <div>
                        <div
                            className={selectGender == 0 ? "select" : ""}
                            onClick={() => setSelectGender(0)}
                        >
                            <img alt="Женский пол" src={woman} />
                            <p>Женский</p>
                        </div>
                        <div
                            className={selectGender == 1 ? "select" : ""}
                            onClick={() => setSelectGender(1)}
                        >
                            <img alt="Мужской пол" src={man} />
                            <p>Мужской</p>
                        </div>
                    </div>
                    <p>
                        Благодарим вас за регистрацию на{" "}
                        <span>нашем сайте!</span>
                    </p>
                </div>

                <button onClick={() => sendSurvey()}>
                    Завершить регистрацию
                </button>
                <p>
                    <span>3 шаг</span> из 3
                </p>
            </div>
            {error.input != 0 ? (
                <p className="error-message">{error.message}</p>
            ) : (
                ""
            )}
        </>
    );
    function sendSurvey() {
        const body = {
            name: document.getElementById("survey-name").value.trim(),
            date_of_birth: document.getElementById("survey-date").value,
            description: document.getElementById("survey-description").value.trim(),
            gender: selectGender,
            favorite_genres: favoriteThinks.favoriteGenres,
            favorite_games: favoriteThinks.favoriteGames,
        };
        let error_check =
            body.date_of_birth == ""
                ? { input: 2, message: "Введите дату рождения" }
                : body.name == ""
                ? { input: 1, message: "Введите имя" }
                : !/^[а-яА-Яa-zA-Z0-9_]+$/.test(body.name)
                ? {
                      input: 1,
                      message:
                          "Имя должно состоять из букв, цифр и подчеркиваний, без пробелов",
                  }
                : { input: 0, message: "" };
        setError(error_check);
        if (error_check.input > 0) return;

        axios
            .post(window.location.origin + "/api/survey", body, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                dispatch(setUser(response.data));
                navigate("../profile");
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
}
