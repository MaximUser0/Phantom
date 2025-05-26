import React from "react";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function Teams() {
    const [paginationInfo, setPaginationInfo] = React.useState({});
    const [active, setActive] = React.useState(0);
    const [teams, setTeams] = React.useState([{description: "", created_at: ""}]);
    const navigate = useNavigate();
    React.useEffect(() => {
        getTeams();
    }, [active]);
    return (
        <div className="AdminTeams">
            <div className="list">
                {teams.map((value, i) => (
                    <div key={"admin-teams-page-user-" + i}>
                        <img alt="Изображение команды" src={value.image} />
                        <div>
                            <h3>{value.title}</h3>
                            <p>Дата создания: {value.created_at.slice(8, 10) +
                                    "." +
                                    value.created_at.slice(5, 7)
                                     +
                                    "." +
                                    value.created_at.slice(0, 4)}</p>
                            <p>Участники: {value.participants}</p>
                        </div>
                        <div className="description">
                            <h3>Описание</h3>
                            <p>{value.description.slice(0, 160)}</p>
                        </div>
                        <div className="buttons">
                            <button
                                className="green"
                                onClick={() => navigate("../team/" + value.id)}
                            >
                                Просмотреть
                            </button>
                            <button
                                className="red"
                                onClick={() => deleteTeam(value.id, i)}
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
    function getTeams() {
        axios
            .get(window.location.origin + "/api/teams?page=" + (active + 1), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setTeams(response.data.data);
                setPaginationInfo({
                    last_page: response.data.last_page,
                    current_page: response.data.current_page,
                });
            });
    }
    function deleteTeam(id, i) {
        if (
            !confirm("Вы хотите удалить команду? Это действие нельзя отменить.")
        )
            return;
        axios
            .delete(window.location.origin + "/api/team/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then(() => {
                teams.splice(i, 1);
                setTeams([...teams]);
                getTeams();
            });
    }
}
