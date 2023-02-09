import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {HashRouter, Route, Routes, useNavigate} from "react-router-dom";

import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import ChartTracksPage from "../Chart/ChartTracksPage";
import ChartAlbumsPage from "../Chart/ChartAlbumsPage";
import Favourite from "../Favourite/Favourite";
import Recent from "../Favourite/Recent";
import Playlists from "../Playlists/Playlists";

import favourite from "../Favourite/store/favourite";
import recent from "../Favourite/store/recent";
import playlists from "../Playlists/store/playlists";

import './_styles.scss';
import player from "../Header/store/player";
import menu from "../Menu/store/menu";


const Redirect = observer(() => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/tracks");
        menu.setPageSelectedId('menu_tracks')
    }, [])
    return <></>
})

const App = observer(() => {
    useEffect(() => {
        favourite.getLocalStorage()
        recent.getLocalStorage()
        playlists.getLocalStorage()
        player.getLocalStorage()
    }, [])

    return (
        <HashRouter basename='/'>
            <div className="app">
                <Menu/>
                <div className='content'>
                    <Header/>
                    <Routes>
                        <Route path='/playlists/:id' element={<Playlists/>}/>
                        <Route path='/albums' element={<ChartAlbumsPage/>}/>
                        <Route path='/tracks' element={<ChartTracksPage/>}/>
                        <Route path='/favourite' element={<Favourite/>}/>
                        <Route path='/recent' element={<Recent/>}/>
                        <Route path='*' element={<Redirect/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
})

export default App;
