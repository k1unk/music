import React, {FC, useRef, useState} from 'react';
import MenuItem from './MenuItem';
import menu, {Section} from "./store/menu";
import {observer} from "mobx-react-lite";
import {useClickOutside} from "../Header/useClickOutside";
import {ReactComponent as AddIcon} from "components/Menu/assets/add-icon.svg";
import {ReactComponent as PlaylistIcon} from "components/Menu/assets/playlist-icon.svg";

interface MenuBlockProps {
    title: string,
    section: Section
}

const MenuBlock: FC<MenuBlockProps> = observer(({title, section}) => {
    let [playlistIsCreating, setPlaylistIsCreating] = useState(false)
    const refPlaylistIsCreating = useRef<any>(null)
    useClickOutside(refPlaylistIsCreating, () => {
        setPlaylistIsCreating(false)
    })

    let addPlaylist = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            menu.addPlaylist()
        }
    }

    let [addIconIsVisible, setAddIconIsVisible] = useState(false)
    return (
        <li className="menu-block">
            {section === Section.Playlists
                ? <h3
                    className="menu-block__title menu-block__title_direction-horizontal"
                    onMouseEnter={() => setAddIconIsVisible(true)}
                    onMouseLeave={() => setAddIconIsVisible(false)}
                >
                    <p>{title}</p>
                    {
                        addIconIsVisible &&
                        <div className="add-icon" onClick={() => setPlaylistIsCreating(true)}>
                            <AddIcon/>
                        </div>
                    }
                </h3>
                : <h3 className="menu-block__title">
                    <p>{title}</p>
                </h3>
            }
            <ul className="block-list">
                {menu.pageNames.map(item => {
                    return item.section === section
                        ? <MenuItem key={item.id} item={item}/>
                        : null
                })}
            </ul>
            {
                playlistIsCreating &&
                <div className="creating-playlist">
                    <PlaylistIcon/>
                    <input
                        type=" text"
                        ref={refPlaylistIsCreating as any}
                        value={menu.newPlaylistName}
                        onChange={(e) => menu.setNewPlaylistName(e.target.value)}
                        onKeyDown={addPlaylist}
                    />
                </div>

            }
        </li>
    );
})

export default MenuBlock;
