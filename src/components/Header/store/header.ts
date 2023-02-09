import {makeAutoObservable} from 'mobx';
import * as mobx from "mobx";

export enum Section {
    Menu = "Menu",
    MyMusic = "MyMusic",
    Playlists = "Playlists"
}

export interface IMenuItem {
    id: string,
    name: string,
    link: string,
    section: Section
}

class header {
    pageNames: IMenuItem[] = [{
        id: 'menu_home',
        name: "Home",
        link: '/',
        section: Section.Menu
    }, {
        id: 'menu_artists',
        name: "Artists",
        link: '/artists',
        section: Section.Menu
    }, {
        id: 'menu_albums',
        name: "Albums",
        link: '/albums',
        section: Section.Menu
    }, {
        id: 'menu_tracks',
        name: "Tracks",
        link: '/tracks',
        section: Section.Menu
    }, {
        id: 'menu_recent',
        name: "Recent",
        link: '/recent',
        section: Section.MyMusic
    }, {
        id: 'menu_favourites',
        name: "Favourites",
        link: '/favourites',
        section: Section.MyMusic
    }, {
        id: 'menu_local_files',
        name: "Local files",
        link: '/local',
        section: Section.MyMusic
    },{
        id: 'menu_playlist_1',
        name: "Playlist 1",
        link: '/playlists/1',
        section: Section.Playlists
    },]

    pageSelectedId: string = 'menu_home'

    constructor() {
        makeAutoObservable(this)
    }

    setPageSelectedId = (pageSelectedId: string) => {
        this.pageSelectedId = pageSelectedId
    }

    changeStateByUrl = (itemId: string) => {
        this.setPageSelectedId(itemId)
    }
}

export default new header()

let log = (e: any) => {
    console.log(mobx.toJS(e))
}
