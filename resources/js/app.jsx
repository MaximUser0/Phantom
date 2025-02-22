import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import News from "./pages/News";
import OneNews from "./pages/OneNews";
import Forums from "./pages/Forums";
import Forum from "./pages/Forum";
import Profile from "./pages/Profile";
import SingUp from "./pages/SingUp";
import Login from "./pages/Login";
import Survay from "./pages/Survey";
import AdminPanel from "./pages/AdminPanel";
import Team from "./pages/Team";
import Teams from "./pages/Teams";
import Games from "./pages/Games";
import Game from "./pages/Game";
import Chat from "./pages/Chat";

export default function App() {
    //const token = useSelector((state) => state.auth.token);

    return (
        <div className="root">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<OneNews />} />
                <Route path="/team" element={<Teams />} />
                <Route path="/team/:id" element={<Team />} />
                <Route path="/game" element={<Games />} />
                <Route path="/game/:id" element={<Game />} />
                <Route path="/forums" element={<Forums />} />
                <Route path="/forum/:id" element={<Forum />} />
                <Route path="/chat/:id" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sing-up" element={<SingUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/survey" element={<Survay />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
            </Routes>
        </div>
    );
}
