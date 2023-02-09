import * as mobx from 'mobx';
import {makeAutoObservable} from 'mobx';
import {chartUtils, Period} from "./chartUtils";

export interface ITrack {
    id: string,
    name: string,
    artistId: string,
    artistName: string,
    albumId: string,
    imageUrl: {
        size70: string,
        size170: string,
        size600: string,
    },
    audioUrl: string,
    duration: number
}


class chartTracks {
    trackList: ITrack[] = []
    page: number = 1
    selectedPeriod: Period = Period.TopToday
    searchValue: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    reset = () => {
        this.setTrackList([])
        this.setPage(1)
        this.setSelectedPeriod(Period.TopToday)
        this.setSearchValue('')
    }
    setTrackList = (tracksList: ITrack[]) => {
        this.trackList = tracksList
    }
    setPage = (page: number) => {
        this.page = page
    }
    setSelectedPeriod = (selectedPeriod: Period) => {
        this.selectedPeriod = selectedPeriod
    }
    setSearchValue = (searchValue: string) => {
        this.searchValue = searchValue
    }
    getTracks = async (period: Period) => {
        let [topTracks, images] = await chartUtils.getTopTracks(period, this.page)

        let newTrackList: ITrack[] = []
        topTracks.map((track: any) => {
            let newTrack: ITrack = {
                id: track.id,
                name: track.name,
                artistId: track.artistId,
                artistName: track.artistName,
                albumId: track.albumId,
                imageUrl: {
                    size70: chartUtils.getImage(images, 70, track.albumId),
                    size170: chartUtils.getImage(images, 170, track.albumId),
                    size600: chartUtils.getImage(images, 600, track.albumId),
                },
                audioUrl: track.previewURL,
                duration: track.playbackSeconds,
            }
            newTrackList.push(newTrack)
        })

        return newTrackList
    }
    getTopTracks = async (period: Period) => {
        this.setTrackList([])
        this.setPage(1)

        let newTrackList = await this.getTracks(period)

        this.setTrackList(newTrackList)
    }
    getMoreTracks = async (period: Period) => {
        this.setPage(this.page + 1)

        let newTrackList = await this.getTracks(period)

        this.setTrackList([...this.trackList, ...newTrackList])
    }

    search = async () => {
        this.setTrackList([])
        this.setPage(1)

        this.setSelectedPeriod(Period.Search)
        let [searchedTracks, images] =await chartUtils.searchTracks(this.searchValue)

        let newTrackList: ITrack[] = []
        searchedTracks.map((track: any) => {
            let newTrack: ITrack = {
                id: track.id,
                name: track.name,
                artistId: track.artistId,
                artistName: track.artistName,
                albumId: track.albumId,
                imageUrl: {
                    size70: chartUtils.getImage(images, 70, track.albumId),
                    size170: chartUtils.getImage(images, 170, track.albumId),
                    size600: chartUtils.getImage(images, 600, track.albumId),
                },
                audioUrl: track.previewURL,
                duration: track.playbackSeconds,
            }
            newTrackList.push(newTrack)
        })

        this.setTrackList(newTrackList)
    }
}

export default new chartTracks()

let log = (e: any) => {
    console.log(mobx.toJS(e))
}
