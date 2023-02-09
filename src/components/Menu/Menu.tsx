import React, {ChangeEvent, useEffect} from 'react';
import menu, {Section} from "./store/menu";
import {observer} from "mobx-react-lite";
import MenuBlock from "./MenuBlock";
import ToggleButton from "./ToggleButton";
import app, {Theme} from "../App/store/app";

const Menu: React.FC = observer(() => {
    useEffect(() => {
        let url = new URL(window.location.href).pathname
        let urlIsCorrect = false
        menu.pageNames.map(item => {
            if (item.link === url) {
                menu.setPageSelectedId(item.id)
                urlIsCorrect = true
            }
        })
        if (!urlIsCorrect) menu.setPageSelectedId('error')
    }, [])

    useEffect(() => {
        app.getDefaultTheme()
    }, [])

    let toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? app.setTheme(Theme.Dark)
            : app.setTheme(Theme.Light)
    };

    return (
        <div className='menu-sidebar'>
            <nav className="menu-content">
                <ul className="menu-blocks">
                    <MenuBlock title="Menu" section={Section.Menu}/>
                    <MenuBlock title="My music" section={Section.MyMusic}/>
                    <MenuBlock title="Playlists" section={Section.Playlists}/>
                </ul>
            </nav>
            <ToggleButton firstValue="☀️" secondValue="🌒" id="checkbox"
                          onChange={toggleTheme} checked={app.theme === Theme.Dark}/>
        </div>
    );
})

export default Menu;
