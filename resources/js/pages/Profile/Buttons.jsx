import React from "react";
import { setUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Buttons() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <button className="desktop-only" onClick={() => deleteAccount()}>
                Удалить аккаунт
            </button>
            <button
                className="desktop-only"
                onClick={() =>
                    document.getElementById("profile-input-for-image").click()
                }
            >
                Выбрать фото
            </button>
            <input
                type="file"
                accept="image/*"
                id="profile-input-for-image"
                onChange={(e) => changeImage(e.target.files[0])}
            />
            <button
                className="light-button desktop-only"
                onClick={() => navigate("../survey")}
            >
                Редактировать
            </button>
        </>
    );

    function changeImage(file) {
        const body = new FormData();
        body.append("image", file);
        axios
            .post(window.location.origin + "/api/user/image", body, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                dispatch(setUser(response.data));
            })
            .catch((error) => {
                alert("Максимальный размер изображения 4МБ");
            });
    }
    function deleteAccount() {
        if (
            !confirm("Вы хотите удалить аккаунт? Это действие нельзя отменить.")
        )
            return;
        axios
            .delete(window.location.origin + "/api/user", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                dispatch(setUser(response.data));
                sessionStorage.removeItem("token");
                navigate("../");
            })
            .catch(() => {
                alert("Не удалось удалить аккаунт");
            });
    }
}
