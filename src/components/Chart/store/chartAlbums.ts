import {autorun, makeAutoObservable} from 'mobx';
import * as mobx from "mobx";
import {ITrack} from "./chartTracks";
import {Period, chartUtils} from "./chartUtils";

export interface IAlbum {
    id: string,
    name: string,
    artistName: string,
    releaseDate: string,
    trackCount: number,
    imageUrl: {
        size70: string,
        size170: string,
        size600: string,
    },
}

class chartAlbums {
    albumsList: IAlbum[] = []
    page: number = 1
    selectedPeriod: Period = Period.TopToday
    openedAlbum: IAlbum | null = null
    openedAlbumTrackList: ITrack[] | null = null
    searchValue: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    reset = () => {
        this.setAlbumsList([])
        this.setPage(1)
        this.setSelectedPeriod(Period.New)
        this.setOpenedAlbum(null)
        this.setOpenedAlbumTrackList(null)
        this.setSearchValue('')
    }
    setAlbumsList = (albumsList: IAlbum[]) => {
        this.albumsList = albumsList
    }
    setPage = (page: number) => {
        this.page = page
    }
    setSelectedPeriod = (selectedPeriod: Period) => {
        this.selectedPeriod = selectedPeriod
    }
    setOpenedAlbum = (openedAlbum: IAlbum | null) => {
        this.openedAlbum = openedAlbum
    }
    setOpenedAlbumTrackList = (openedAlbumTrackList: ITrack[] | null) => {
        this.openedAlbumTrackList = openedAlbumTrackList
    }
    setSearchValue = (searchValue: string) => {
        this.searchValue = searchValue
    }
    getAlbums = async (period: Period) => {
        let [topAlbums, images] = await chartUtils.getTopAlbums(period, this.page)

        let newAlbumList: IAlbum[] = topAlbums.map((album: any) => {
            return {
                id: album.id,
                name: album.name,
                artistName: album.artistName,
                imageUrl: {
                    size70: chartUtils.getImage(images, 70, album.id),
                    size170: chartUtils.getImage(images, 170, album.id),
                    size600: chartUtils.getImage(images, 600, album.id),
                },
                releaseDate: album.released,
                trackCount: album.trackCount
            }
        })

        return newAlbumList
    }
    getTopAlbums = async (period: Period) => {
        this.setAlbumsList([])
        this.setPage(1)

        let newAlbumList = await this.getAlbums(period)
        log(newAlbumList)
        this.setAlbumsList(newAlbumList)
    }
    getMoreAlbums = async (period: Period) => {
        this.setPage(this.page + 1)

        let newAlbumList = await this.getAlbums(period)

        log(newAlbumList)
        this.setAlbumsList([...this.albumsList, ...newAlbumList])
    }

    openAlbum = async (album: IAlbum) => {
        this.setOpenedAlbumTrackList(null)
        this.setOpenedAlbum(null)
        this.setOpenedAlbum(album)

        let tracksRes = await chartUtils.getAlbumTracks(album.id)
        let albumTrackList: ITrack[] = tracksRes.map((track: any) => {
            return {
                id: track.id,
                name: track.name,
                artistId: track.artistId,
                artistName: track.artistName,
                albumId: track.albumId,
                imageUrl: album.imageUrl,
                audioUrl: track.previewURL,
                duration: track.playbackSeconds
            }
        })

        this.setOpenedAlbumTrackList(albumTrackList)
    }


    openAlbumById = async (albumId: string) => {
        let [albumResponse, images] = await chartUtils.getAlbumById(albumId)
        let album:IAlbum = {
            id: albumResponse.id,
            name: albumResponse.name,
            artistName: albumResponse.artistName,
            releaseDate: albumResponse.released,
            trackCount: albumResponse.trackCount,
            imageUrl: {
                size70: chartUtils.getImage(images, 70, albumId),
                size170: chartUtils.getImage(images, 170, albumId),
                size600: chartUtils.getImage(images, 600, albumId),
            },
        }

        this.openAlbum(album)
    }

    search = async () => {
        this.setAlbumsList([])
        this.setPage(1)

        this.setSelectedPeriod(Period.Search)
        let [searchedAlbums, images] =await chartUtils.searchAlbums(this.searchValue)

        let newAlbumList: IAlbum[] = searchedAlbums.map((album: any) => {
            return {
                id: album.id,
                name: album.name,
                artistName: album.artistName,
                imageUrl: {
                    size70: chartUtils.getImage(images, 70, album.id),
                    size170: chartUtils.getImage(images, 170, album.id),
                    size600: chartUtils.getImage(images, 600, album.id),
                },
                releaseDate: album.released,
                trackCount: album.trackCount
            }
        })

        this.setAlbumsList(newAlbumList)
    }
}

export default new chartAlbums()

let log = (e: any) => {
    console.log(mobx.toJS(e))
}
