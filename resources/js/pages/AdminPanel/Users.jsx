import React from "react";
import Pagination from "../../components/Pagination";

export default function Users() {
    const [paginationInfo, setPaginationInfo] = React.useState({});
    const [active, setActive] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        getUsers();
    }, [active]);
    return (
        <div className="Users">
            <div className="list">
                {users.map((value, i) => (
                    <div key={"admin-users-page-user-" + i}>
                        <img alt="Изображение пользователя" src={value.image} />
                        <div>
                            <h3>{value.name}</h3>
                            <p>год рождения: {value.date_of_birth}</p>
                            <p>пол: {value.gender}.</p>
                        </div>
                        <div className="common-info">
                            <p>Комментарии: {value.comments}</p>
                            <p>Команды: {value.teams}</p>
                            <p>Форумы: {value.forums}</p>
                        </div>
                        <div className="buttons">
                            <button
                                className={value.is_blocked ? "green" : "gray"}
                                onClick={() =>
                                    value.is_blocked ? blockUser(value.id, i) : ""
                                }
                            >
                                Разбанить
                            </button>
                            <button
                                className={value.is_blocked ? "gray" : "red"}
                                onClick={() =>
                                    !value.is_blocked ? blockUser(value.id, i) : ""
                                }
                            >
                                Забанить
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
    function getUsers() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/users?page=" + (active + 1), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setUsers(response.data.data);
                setPaginationInfo({
                    last_page: response.data.last_page,
                    current_page: response.data.current_page,
                });
            });
    }
    function blockUser(id, i) {
        axios
            .get(window.location.origin + "/api/user/block/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                users[i].is_blocked = response.data.is_blocked;
                setUsers([...users]);
            });
    }
}
