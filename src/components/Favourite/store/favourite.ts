import {makeAutoObservable} from 'mobx';
import * as mobx from "mobx";
import {ITrack} from "../../Chart/store/chartTracks";


class favourite {
    favouriteTracks: ITrack[] = []
    searchValue: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    setFavouriteTracks = (favouriteTracks: ITrack[]) => {
        this.favouriteTracks = favouriteTracks
        localStorage.setItem("favourite", JSON.stringify(this.favouriteTracks))
    }

    setSearchValue = (searchValue: string) => {
        this.searchValue = searchValue
    }
    addTrackToFavouriteTracks = (track: ITrack) => {
        this.setFavouriteTracks([track, ...this.favouriteTracks])
    }
    removeTrackFromFavouriteTracks = (track: ITrack) => {
        let newList = this.favouriteTracks.filter(item => {
            return item.id !== track.id
        })
        this.setFavouriteTracks(newList)
    }

    isFavourite = (trackId: string): boolean => {
        let result = false
        this.favouriteTracks.map(e => {
            if (e.id.toLowerCase() === trackId.toLowerCase()) result = true
        })
        return result;
    }

    getLocalStorage = () => {
        let tracks = localStorage.getItem("favourite")
        if (tracks) this.setFavouriteTracks(JSON.parse(tracks))
    }
    get getFavouriteTracks() {
        return this.favouriteTracks.filter(e=>{
            return e.name.toLowerCase().startsWith(this.searchValue.toLowerCase())
        })
    }
}

export default new favourite()

let log = (e: any) => {
    console.log(mobx.toJS(e))
}
