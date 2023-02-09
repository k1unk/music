import {makeAutoObservable} from 'mobx';
import * as mobx from "mobx";
import playlists from "../../Playlists/store/playlists";

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


class menu {
    pageNames: IMenuItem[] = [{
        id: 'menu_tracks',
        name: "Tracks",
        link: '/tracks',
        section: Section.Menu
    }, {
        id: 'menu_albums',
        name: "Albums",
        link: '/albums',
        section: Section.Menu
    }, {
        id: 'menu_recent',
        name: "Recent",
        link: '/recent',
        section: Section.MyMusic
    }, {
        id: 'menu_favourite',
        name: "Favourite",
        link: '/favourite',
        section: Section.MyMusic
    }, {
        id: 'menu_playlist_1',
        name: "Playlist 1",
        link: '/playlists/1',
        section: Section.Playlists
    }, {
        id: 'menu_playlist_2',
        name: "Playlist 2",
        link: '/playlists/2',
        section: Section.Playlists
    },]

    pageSelectedId: string = 'menu_tracks'
    newPlaylistName: string = ''
    lastPlaylistId: number = 2

    constructor() {
        makeAutoObservable(this)
    }

    setPageNames = (pageNames: IMenuItem[]) => {
        this.pageNames = pageNames
    }
    setPageSelectedId = (pageSelectedId: string) => {
        this.pageSelectedId = pageSelectedId
    }

    setNewPlaylistName = (newPlaylistName: string) => {
        this.newPlaylistName = newPlaylistName
    }
    setLastPlaylistId = (lastPlaylistId: number) => {
        this.lastPlaylistId = lastPlaylistId
    }
    changeStateByUrl = (itemId: string) => {
        this.setPageSelectedId(itemId)
    }
    addPlaylist = () => {
        this.setLastPlaylistId(this.lastPlaylistId + 1)
        this.setPageNames([...this.pageNames, {
            id: `menu_playlist_${this.lastPlaylistId}`,
            name: this.newPlaylistName,
            link: `/playlists/${this.lastPlaylistId}`,
            section: Section.Playlists
        }])

        playlists.setPlaylists([...playlists.playlists, {
            id: `playlist_${this.lastPlaylistId}`,
            name: this.newPlaylistName,
            trackList: []
        }])

        this.newPlaylistName = ''
    }
}

export default new menu()

let log = (e: any) => {
    console.log(mobx.toJS(e))
}
