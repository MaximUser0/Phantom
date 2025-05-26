import React from "react";
import image from "../../assets/img/forum_image.png";
import { useSelector } from "react-redux";

export default function Forum() {
    const [forum, setForum] = React.useState({
        description: "",
        images: "1&3",
        created_at: "",
        messages: [],
    });
    const [users, setUsers] = React.useState([]);
    const info = useSelector((state) => state.auth.user);
    const id = location.pathname.split("/")[2];
    React.useEffect(() => {
        getForum();
    }, []);
    return (
        <div className="Forum">
            <div className="content">
                <h1>{forum.title}</h1>
                <div>
                    <div className="image">
                        <img
                            alt="Изображение создателя форума"
                            src={forum.image}
                        />
                        <p>
                            {forum.created_at.slice(8, 10) +
                                "." +
                                forum.created_at.slice(5, 7) +
                                "." +
                                forum.created_at.slice(0, 4)}
                        </p>
                        <h2 className="mobile-only">{forum.name}</h2>
                    </div>
                    <div className="info">
                        <div>
                            <h2 className="desktop-only">{forum.name}</h2>
                            {forum.description.split("<br/>").map((text, i) => (
                                <p key={"forum-page-text-" + i}>{text}</p>
                            ))}
                            <div>
                                {forum.images.split("&").map((src, i) => (
                                    <img
                                        alt="Изображение на форуме"
                                        key={"forum-page-attached-image-" + i}
                                        src={src}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comments">
                <div className="list">
                    <div>
                        {forum.messages.map((comment, i) => (
                            <div key={"forum-page-comment-" + i}>
                                <div>
                                    <img
                                        alt="Изображение пользователя"
                                        src={
                                            users.length > 0 &&
                                            comment.id != info.id
                                                ? users.find(
                                                      (user) =>
                                                          user.id == comment.id
                                                  ).image
                                                : comment.id == info.id
                                                ? info.image
                                                : "../img/Example2.svg"
                                        }
                                    />
                                    <p className="date">{comment.created_at}</p>
                                    <h3 className="mobile-only">
                                        {users.length > 0 &&
                                        comment.id != info.id
                                            ? users.find(
                                                  (user) =>
                                                      user.id == comment.id
                                              ).name
                                            : comment.id == info.id
                                            ? info.name
                                            : ""}
                                    </h3>
                                </div>
                                <div>
                                    <h3>
                                        {users.length > 0 &&
                                        comment.id != info.id
                                            ? users.find(
                                                  (user) =>
                                                      user.id == comment.id
                                              ).name
                                            : comment.id == info.id
                                            ? info.name
                                            : ""}
                                    </h3>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="addComment">
                    <h2>
                        Обсуждение <span>{forum.messages.length}</span>
                    </h2>
                    <textarea
                        placeholder="Напишите свой ответ"
                        id="forum-message-textarea"
                    ></textarea>
                    <button onClick={() => sentMessage()}>Отправить</button>
                    <img alt="Игровой арт" src={image} />
                </div>
            </div>
        </div>
    );
    function getForum() {
        if (sessionStorage.getItem("token") == null) return;
        axios
            .get(window.location.origin + "/api/forum/" + id, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                let data = response.data;
                data.messages = JSON.parse(response.data.messages);
                getUsers(data.messages);
                setForum(data);
            });
    }
    function getUsers(messages) {
        if (sessionStorage.getItem("token") == null) return;
        const users_id = messages
            .map((elem) => elem.id)
            .filter((item, i, ar) => ar.indexOf(item) === i);
        const body = {
            users: JSON.stringify(users_id),
        };
        axios
            .post(window.location.origin + "/api/user/by-array", body, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setUsers(response.data);
            });
    }
    function sentMessage() {
        if (sessionStorage.getItem("token") == null) return;
        const body = {
            content: document
                .getElementById("forum-message-textarea")
                .value.trim(),
        };
        if (body.content == "") {
            return;
        }
        axios
            .post(
                window.location.origin + "/api/forum/" + id + "/message",
                body,
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
                forum.messages.push(response.data);
                setForum({ ...forum });
                document.getElementById("forum-message-textarea").value = "";
            });
    }
}
