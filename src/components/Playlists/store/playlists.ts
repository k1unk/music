import {makeAutoObservable} from 'mobx';
import * as mobx from "mobx";
import {ITrack} from "../../Chart/store/chartTracks";

export interface IPlaylist {
    id: string,
    name: string,
    trackList: ITrack[]
}

class playlists {
    playlists: IPlaylist[] = [{
        id: 'playlist_1',
        name: 'Playlist 1',
        trackList: []
    }, {
        id: 'playlist_2',
        name: 'Playlist 2',
        trackList: []
    }]

    constructor() {
        makeAutoObservable(this)
    }

    setPlaylists = (playlists: IPlaylist[]) => {
        this.playlists = playlists
    }

    addTrack = (playlistId: string, track: ITrack) => {
        for (let i = 0; i < this.playlists.length; i++) {
            if (playlistId === this.playlists[i].id) {
                this.playlists[i].trackList = [...this.playlists[i].trackList, track]
                localStorage.setItem("playlists", JSON.stringify(this.playlists))
                break
            }
        }
    }
    removeTrack = (playlistId: string, trackId: string) => {
        for (let i = 0; i < this.playlists.length; i++) {
            if (playlistId === this.playlists[i].id) {
                this.playlists[i].trackList = this.playlists[i].trackList.filter(t => {
                    return trackId !== t.id
                })
                localStorage.setItem("playlists", JSON.stringify(this.playlists))
                break
            }
        }
    }
    getLocalStorage = () => {
        let playlists = localStorage.getItem("playlists")
        if (playlists) this.setPlaylists(JSON.parse(playlists))
    }
}

export default new playlists()

let log = (e: any) => {
    console.log(mobx.toJS(e))
}
