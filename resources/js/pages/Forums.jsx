import React from "react";
import icon from "../assets/img/forum_icon.svg";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function Forum() {
    const navigate = useNavigate();
    const [forums, setForums] = React.useState([]);
    const [paginationInfo, setPaginationInfo] = React.useState({});
    const [active, setActive] = React.useState(0);
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
        <div className="Forums">
            <h1>Форумы</h1>
            <div className="list">
                {forums.map((value, i) => (
                    <div
                        key={"forum-page-forum-" + i}
                        onClick={() => navigate("../forum/1")}
                    >
                        <img alt="Иконка форума" src={icon} />
                        <div className="info">
                            <h2>{value.title}</h2>
                            <p>{value.description}</p>
                            <p>Участники: {value.participants_number}</p>
                        </div>
                        <div className="messages">
                            <h3>{numberOfMessages(value.messages)}</h3>
                            <p>Сообщений</p>
                        </div>
                        <div className="owner">
                            <img
                                alt="Иконка создателя форума"
                                src={value.image}
                            />
                            <p>{value.name}</p>
                            <p className="date">
                                {value.created_at.slice(8, 10) +
                                    " " +
                                    months[
                                        Number(value.created_at.slice(5, 7))
                                    ] +
                                    " " +
                                    value.created_at.slice(0, 4)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination info={paginationInfo} active={active} setActive={setActive}/>
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
}
