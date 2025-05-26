import React from "react";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Forums() {
    const navigate = useNavigate();
    const [paginationInfo, setPaginationInfo] = React.useState({});
    const [active, setActive] = React.useState(0);
    const [forums, setForums] = React.useState([]);
    React.useEffect(() => {
        getForums();
    }, [active]);
    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];

    return (
        <div className="AdminForums">
            <div className="list">
                {forums.map((value, i) => (
                    <div key={"admin-forums-page-forum-" + i}>
                        <img
                            alt="Изображение форума"
                            src={value.images.split("&")[0]}
                        />
                        <div className="description">
                            <h3
                                onClick={() => navigate("../forum/" + value.id)}
                            >
                                {value.title}
                            </h3>
                            <p>
                                {value.description.slice(0, 235) +
                                    (value.description.length > 235
                                        ? "..."
                                        : "")}
                            </p>
                        </div>
                        <div className="messages-number">
                            <p>{numberOfMessages(value.messages)}</p>
                            <p>Сообщений</p>
                        </div>
                        <div className="owner-info">
                            <div>
                                <img
                                    alt="Изображение пользователя"
                                    src={value.image}
                                />
                                <div>
                                    <h3>{value.name}</h3>
                                    <p>
                                        {value.created_at.slice(8, 10) +
                                            " " +
                                            months[
                                                Number(
                                                    value.created_at.slice(5, 7)
                                                ) - 1
                                            ] +
                                            " " +
                                            value.created_at.slice(0, 4)}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => deleteForum(value.id, i)}>
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                info={paginationInfo}
                active={active}
                setActive={setActive}
            />
            ;
        </div>
    );
    function getForums() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/forum?page=" + (active + 1), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setForums(response.data.data);
                setPaginationInfo({
                    last_page: response.data.last_page,
                    current_page: response.data.current_page,
                });
            });
    }
    function numberOfMessages(json) {
        const comments = JSON.parse(json);
        return comments.length;
    }
    function deleteForum(id, i) {
        if (!confirm("Удалить форум?")) return;
        axios
            .delete(window.location.origin + "/api/forum/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(() => {
                forums.splice(i, 1);
                setForums([...forums]);
                getForums();
            });
    }
}
