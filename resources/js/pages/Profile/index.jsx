import React from "react";
import gradient from "../../assets/img/back_gradient.svg";
import image from "../../assets/img/profile_image.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Buttons from "./Buttons";

export default function Profile() {
    const user = useSelector((state) => state.auth.user);
    const [statistics, setStatistics] = React.useState({
        teams: 0,
        comments: 0,
        forums: 0,
    });
    const navigate = useNavigate();
    const genderList = ["Жен.", "Муж."];

    React.useEffect(() => {
        getStatistics();
    }, []);
    return (
        <div className="Profile">
            <div className="buttons">
                <div>
                    <img
                        alt="Изображение пользователя"
                        src={
                            user.image != null
                                ? user.image
                                : "../img/Example2.svg"
                        }
                    />
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
                <Buttons />
                <img
                    className="gradient"
                    alt="Фоновый градиент"
                    src={gradient}
                />
            </div>
            <div className="info">
                <div className="name">
                    <h2>{user.name}</h2>
                    <p>Был в сети: {getTime()}</p>
                </div>
                <p className="desktop-only">{user.description}</p>
                <div className="user">
                    <p>
                        Дата рождения:{" "}
                        {user.date_of_birth.slice(8, 10) +
                            "." +
                            user.date_of_birth.slice(5, 7) +
                            "." +
                            user.date_of_birth.slice(0, 4)}
                    </p>
                    <p>Пол: {genderList[user.gender]}</p>
                </div>
                <div className="games">
                    <h3>Любимые жанры:</h3>
                    <h3>Любимые игры:</h3>
                    <p>{favoriteThinks(user.favorite_genres)}</p>
                    <p>{favoriteThinks(user.favorite_games)}</p>
                </div>
                <div className="summary desktop-only">
                    <div onClick={() => navigate("../my-team")}>
                        <p>Команды</p>
                        <p>{statistics.teams}</p>
                    </div>
                    <div>
                        <p>Комментарии</p>
                        <p>{statistics.comments}</p>
                    </div>
                    <div>
                        <p>Форумы</p>
                        <p>{statistics.forums}</p>
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
                    <p>{statistics.teams}</p>
                </div>
                <div>
                    <p>Комментарии</p>
                    <p>{statistics.comments}</p>
                </div>
                <div>
                    <p>Форумы</p>
                    <p>{statistics.forums}</p>
                </div>
            </div>
            <img className="back_image" alt="Фоновый изображение" src={image} />
        </div>
    );
    function getTime() {
        const date = new Date();
        const month = date.getMonth() + 1;
        return (
            (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
            "." +
            (month > 9 ? month : "0" + month) +
            "." +
            date.getFullYear() +
            " в " +
            date.getHours() +
            ":" +
            date.getMinutes()
        );
    }
    function favoriteThinks(text) {
        const list = text.split("&");
        return list.map((value, i) => (i != 0 ? ", " : "") + value);
    }
    function getStatistics() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/user/info", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setStatistics(response.data);
            });
    }
}
