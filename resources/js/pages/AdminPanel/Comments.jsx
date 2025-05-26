import React from "react";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function Comments() {
    const [paginationInfo, setPaginationInfo] = React.useState({});
    const [active, setActive] = React.useState(0);
    const [comments, setComments] = React.useState([]);
    const navigate = useNavigate();
    React.useEffect(() => {
        getComments();
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
        <div className="AdminComments">
            <div className="list">
                {comments.map((value, i) => (
                    <div key={"admin-comments-page-comment-" + i}>
                        <div>
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
                            <p>{value.content}</p>
                            <div className="category">
                                <h3>
                                    {value.type == "news" ? "Новость" : "Форум"}
                                    :
                                </h3>
                                <h3>{value.title}</h3>
                            </div>
                        </div>
                        <div className="buttons">
                            <button
                                className="green"
                                onClick={() =>
                                    navigate(
                                        "../" + value.type + "/" + value.link_id
                                    )
                                }
                            >
                                Просмотреть
                            </button>
                            <button
                                className="red"
                                onClick={() => deleteComment(value.id, i)}
                            >
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
        </div>
    );
    function getComments() {
        axios
            .get(window.location.origin + "/api/comment?page=" + (active + 1), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setComments(response.data.data);
                setPaginationInfo({
                    last_page: response.data.last_page,
                    current_page: response.data.current_page,
                });
            });
    }
    function deleteComment(id, i) {
        axios
            .delete(window.location.origin + "/api/comment/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(() => {
                comments.splice(i, 1);
                setComments([...comments]);
                getComments();
            });
    }
}
