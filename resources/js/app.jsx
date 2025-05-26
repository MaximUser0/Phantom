import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import News from "./pages/News";
import OneNews from "./pages/OneNews";
import Forums from "./pages/Forums";
import Forum from "./pages/Forum";
import ForumCreate from "./pages/Forum/Create";
import Profile from "./pages/Profile";
import SingUp from "./pages/SingUp";
import Login from "./pages/Login";
import Survey from "./pages/Survey";
import Team from "./pages/Team";
import TeamCreate from "./pages/Teams/Create";
import Teams from "./pages/Teams";
import Games from "./pages/Games";
import Game from "./pages/Game";
import Chat from "./pages/Chat";
import MyTeams from "./pages/MyTeams";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
    return (
        <div className="root">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<OneNews />} />
                <Route path="/team" element={<Teams />} />
                <Route path="/team-create" element={<TeamCreate update={false}/>} />
                <Route path="/team-create/:id" element={<TeamCreate update={true}/>} />
                <Route path="/team/:id" element={<Team />} />
                <Route path="/my-team" element={<MyTeams />} />

                <Route path="/game" element={<Games />} />
                <Route path="/game/:id" element={<Game />} />
                <Route path="/forum" element={<Forums />} />
                <Route path="/forum/:id" element={<Forum />} />
                <Route path="/forum-create" element={<ForumCreate />} />
                <Route path="/chat/:id" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sing-up" element={<SingUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/survey" element={<Survey />} />

                <Route path="/admin-panel/:page" element={<AdminPanel/>} />
                <Route path="/admin-panel/:page/:id" element={<AdminPanel/>} />
            </Routes>
            <Footer />
        </div>
    );
}
