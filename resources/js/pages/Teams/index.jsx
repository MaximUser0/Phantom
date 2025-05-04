import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Teams() {
    const [teams, setTeams] = React.useState([]);
    React.useEffect(() => {
        getTeams();
    }, []);
    const navigate = useNavigate();
    const requestResponses = ["Подать заявку", "В ожидании", "Отказано"];

    return (
        <div className="Teams">
            <h1>Команды</h1>
            <div>
                {teams.map((value, i) => (
                    <div key={"teams-page-team-" + i}>
                        <img alt="Изображение команды" src={value.image != null ? value.image : "../img/Example2.svg"} />
                        <div>
                            <h2>{value.title}</h2>
                            <p>{value.description.slice(0, 90)}</p>
                            <button
                                onClick={() =>
                                    buttonActions(
                                        value.is_participant,
                                        value.is_owner,
                                        value.is_request,
                                        i,
                                        value.id
                                    )
                                }
                            >
                                {value.is_participant || value.is_owner
                                    ? "Перейти"
                                    : requestResponses[value.is_request]}
                            </button>
                            <p>Участники: {value.participants}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    function getTeams() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/team", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setTeams(response.data);
            });
    }
    function buttonActions(is_participant, is_owner, is_request, i, id) {
        if (is_participant || is_owner) {
            navigate("../team/" + id);
            return;
        }
        if (is_request == 0 && confirm("Отправить запрос на вступление?")) {
            axios
                .post(
                    window.location.origin + "/api/request/" + id,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    teams[i].is_request = 1;
                    setTeams([...teams]);
                });
            return;
        }
    }
}
