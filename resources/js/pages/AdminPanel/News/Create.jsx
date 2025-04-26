import React from "react";

export default function Create() {
    return (
        <div className="CreateNews">
            <h1>Создание новости</h1>
            <div className="inputs">
                <div>
                    <label>Название новости</label>
                    <input type="text" />
                    <label>Описание</label>
                    <textarea placeholder="Добавьте описание"></textarea>
                </div>
                <div>
                    <label>Новость</label>
                    <textarea placeholder="Добавьте текст для новости"></textarea>
                </div>
            </div>
            <div className="file">
                <button
                    onClick={() =>
                        document.getElementById("news-file-input").click()
                    }
                >
                    Выбрать файл
                </button>
                <label>Название картинки</label>
                <input
                    type="file"
                    accept="image/*"
                    id="news-file-input"
                    onChange={(e) => {
                        document.querySelector(
                            ".CreateNews .file label"
                        ).textContent = e.target.files[0].name;
                    }}
                />
            </div>
            <div className="buttons">
                <button>Отмена</button>
                <button>Сохранить</button>
            </div>
        </div>
    );
}
