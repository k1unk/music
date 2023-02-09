import {makeAutoObservable} from 'mobx';
import * as mobx from "mobx";
import {ITrack} from "../../Chart/store/chartTracks";

class recent {
    recentTracksForThisPage: ITrack[] = []
    recentTracks: ITrack[] = []

    searchValue: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    setRecentTracks = (recentTracks: ITrack[]) => {
        this.recentTracks = recentTracks
        localStorage.setItem("recent", JSON.stringify(this.recentTracks))
    }
    setRecentTracksForThisPage = (recentTracksForThisPage: ITrack[]) => {
        this.recentTracksForThisPage = recentTracksForThisPage
    }
    setSearchValue = (searchValue: string) => {
        this.searchValue = searchValue
    }

    addTrackToRecentTracks = (track: ITrack) => {
        let length = this.recentTracks.length
        let newList: ITrack[] = []
        for (let i = 0; i < length; i++) {
            if (track.id != this.recentTracks[i].id) {
                newList.push(this.recentTracks[i])
            }
        }
        this.setRecentTracks([track, ...newList])
    }
    removeTrackFromRecentTracks = (track: ITrack) => {
        let newList = this.recentTracks.filter(item => {
            return item.id !== track.id
        })
        this.setRecentTracks(newList)
    }

    isInRecent = (trackId: string): boolean => {
        let result = false
        this.recentTracks.map(e => {
            if (e.id === trackId) result = true
        })
        return result;
    }

    getLocalStorage = () => {
        let tracks = localStorage.getItem("recent")
        if (tracks) this.setRecentTracks(JSON.parse(tracks))
    }

    get getRecentTracksForThisPage() {
        return this.recentTracksForThisPage.filter(e=>{
            return e.name.toLowerCase().startsWith(this.searchValue.toLowerCase())
        })
    }
}

export default new recent()

let log = (e: any) => {
    console.log(mobx.toJS(e))
}
