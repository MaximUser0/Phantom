import React from "react";
import Pagination from "../../components/Pagination";

export default function Comments() {
    const [comments, setComments] = React.useState([
        {
            name: "fantom_skitsa",
            created_at: "30 марта 2025",
            text: "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            category: "Новости",
            title: "Название новости"
        },
        {
            name: "fantom_skitsa",
            created_at: "30 марта 2025",
            text: "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            category: "Новости",
            title: "Название новости"
        },
        {
            name: "fantom_skitsa",
            created_at: "30 марта 2025",
            text: "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            category: "Новости",
            title: "Название новости"
        },
        {
            name: "fantom_skitsa",
            created_at: "30 марта 2025",
            text: "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            category: "Новости",
            title: "Название новости"
        },
        {
            name: "fantom_skitsa",
            created_at: "30 марта 2025",
            text: "Это очень крутая новость, советую ее всем прочесть, она касается всех самых крутых игр последнего десятилетия...",
            category: "Новости",
            title: "Название новости"
        },
    ]);
    return (
        <div className="AdminComments">
            <div className="list">
                {comments.map((value, i) => (
                    <div key={"admin-comments-page-comment-" + i}>
                        <div>
                            <div>
                                <h3>{value.name}</h3>
                                <p>{value.created_at}</p>
                            </div>
                            <p>{value.text}</p>
                            <div className="category">
                                <h3>{value.category}:</h3>
                                <h3>{value.title}</h3>
                            </div>
                        </div>
                        <div className="buttons">
                            <button className="green">Просмотреть</button>
                            <button className="red">Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination />
        </div>
    );
}
