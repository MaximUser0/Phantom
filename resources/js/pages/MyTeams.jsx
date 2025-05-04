import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MyTeams() {
    const navigate = useNavigate();
    const [myTeams, setMyTeams] = React.useState([]);
    const [requests, setRequests] = React.useState([]);
    const [invitations, setInvitations] = React.useState([]);
    React.useEffect(() => {
        getMyTeams();
        getRequests(setRequests, "request");
        getRequests(setInvitations, "request/my");
    }, []);
    return (
        <div className="MyTeams">
            <div>
                <h2>Мои</h2>
                {myTeams.map((value, i) => (
                    <div key={"my-team-page-team-" + i}>
                        <img alt="Изображение команды" src={value.image} />
                        <div>
                            <h3>{value.title}</h3>
                            <p>Участники: {value.participants}</p>
                            <p>{value.description}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => outFrom(value.participant_id, i)}
                            >
                                Покинуть
                            </button>
                            <button
                                onClick={() => navigate("../team/" + value.id)}
                            >
                                Просмотреть
                            </button>
                        </div>
                    </div>
                ))}
                {myTeams.length == 0 ? (
                    <p>Вы не состоите ни в одной команде</p>
                ) : (
                    ""
                )}
                <Link to="../team-create">Создать команду</Link>
            </div>

            <div>
                <h2>Заявки</h2>
                {requests.map((value, i) => (
                    <div key={"my-team-page-request-" + i}>
                        <img alt="Изображение пользователя" src={value.image} />
                        <div>
                            <h3>{value.name}</h3>
                            <p>Команда: {value.title}</p>
                            <p>{value.description}</p>
                        </div>
                        <div>
                            <button
                                className="green"
                                onClick={() => respondToRequest(true, i, value.id)}
                            >
                                Принять
                            </button>
                            <button
                                className="red"
                                onClick={() => respondToRequest(false, i, value.id)}
                            >
                                Отклонить
                            </button>
                        </div>
                    </div>
                ))}
                {requests.length == 0 ? (
                    <p>На вступление в ваши команды нет заявок</p>
                ) : (
                    ""
                )}
            </div>
            <div className="Invitations">
                <h2>В ожидании</h2>
                {invitations.map((value, i) => (
                    <div key={"my-team-page-invitation-" + i}>
                        <img alt="Изображение команды" src={value.image} />
                        <div>
                            <h3>{value.title}</h3>
                            <p>Участники: {value.participants}</p>
                            <p>{value.description}</p>
                        </div>
                        <div className="status">
                            <label>Статус: </label>
                            <p>
                                {value.status == 0 ? "в ожидании" : "отклонено"}
                            </p>
                        </div>
                    </div>
                ))}
                {invitations.length == 0 ? <p>Нет неодобренных заявок</p> : ""}
            </div>
        </div>
    );
    function getMyTeams() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/team/my", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setMyTeams(response.data);
            });
    }
    function getRequests(setFunction, link) {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/" + link, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setFunction(response.data);
            });
    }
    function respondToRequest(accept, index, id) {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .post(
                window.location.origin + "/api/request/accept/" + id,
                { accept },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then(() => {
                requests.splice(index, 1);
                setRequests([...requests]);
            });
    }
    function outFrom(id, index) {
        if (sessionStorage.getItem("token") == null) return;
        if (myTeams[index].is_owner) {
            if (
                !confirm(
                    "Вы создатель этой команды, хотите удалить " +
                        myTeams[index].title +
                        "?"
                )
            )
                return;
            axios
                .delete(
                    window.location.origin + "/api/team/" + myTeams[index].id,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then(() => {
                    myTeams.splice(index, 1);
                    setMyTeams([...myTeams]);
                });
            return;
        }
        if (!confirm("Выйти из команды " + myTeams[index].title + "?")) return;
        axios
            .delete(window.location.origin + "/api/team/out/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(() => {
                myTeams.splice(index, 1);
                setMyTeams([...myTeams]);
            });
    }
}
