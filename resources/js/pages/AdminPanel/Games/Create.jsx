import React from "react";

export default function Create() {
    return (
        <div className="CreateGame">
            <h1>Добавление игры</h1>
            <div className="inputs">
                <div>
                    <label>Название игры</label>
                    <input type="text" />
                    <label>Описание</label>
                    <textarea placeholder="Добавьте описание"></textarea>
                </div>
            </div>
            <div className="file">
                <div>
                    <button
                        onClick={() =>
                            document.getElementById("game-file-input").click()
                        }
                    >
                        Выбрать файл
                    </button>
                    <label className="label">Название картинки</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="game-file-input"
                        onChange={(e) => {
                            document.querySelector(".CreateGame .file .label").textContent = e.target.files[0].name;
                        }}
                    />
                </div>
                <div className="genre">
                    <label>Жанры</label>
                    <select>
                        <option>Головоломка</option>
                        <option>Песочница</option>
                        <option>Экшен</option>
                    </select>
                </div>
            </div>
            <div className="buttons">
                <button>Сохранить</button>
                <button>Отмена</button>
            </div>
        </div>
    );
}
