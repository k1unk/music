import React, {FC, useEffect, useState} from 'react';
import menu, {IMenuItem} from "./store/menu";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {ReactComponent as FavouriteIcon} from "components/Menu/assets/favourite-icon.svg";
import {ReactComponent as RecentIcon} from "components/Menu/assets/recent-icon.svg";
import {ReactComponent as AlbumIcon} from "components/Menu/assets/album-icon.svg";
import {ReactComponent as TrackIcon} from "components/Menu/assets/track-icon.svg";
import {ReactComponent as PlaylistIcon} from "components/Menu/assets/playlist-icon.svg";

interface MenuItemProps {
    item: IMenuItem
}

let MenuItem: FC<MenuItemProps> = observer(({item}) => {
    let select = () => {
        menu.setPageSelectedId(item.id)
    }

    let [itemClassName, setItemClassName] = useState('')

    let getIcon=()=>{
        if (item.id==='menu_albums') return <AlbumIcon/>
        if (item.id==='menu_tracks') return <TrackIcon/>
        if (item.id==='menu_recent') return <RecentIcon/>
        if (item.id==='menu_favourite') return <FavouriteIcon/>
        return <PlaylistIcon/>
    }
    useEffect(() => {
        if (menu.pageSelectedId === item.id)
            setItemClassName('menu-item menu-item_selected')
        else
            setItemClassName('menu-item')
    }, [menu.pageSelectedId])

    return (
        <li className={itemClassName}>
            {getIcon()}
            <Link
                to={item.link}
                onClick={select}
            >
                {item.name}
            </Link>
        </li>
    );
})


export default MenuItem;
