import {makeAutoObservable} from 'mobx';
import * as mobx from "mobx";
import {ITrack} from "../../Chart/store/chartTracks";
import {Howl} from "howler";
import recent from "../../Favourite/store/recent";

export interface IPlayerTrack extends ITrack {
    durationNow: number
}

class player {
    playerTrackList: IPlayerTrack[] = []
    trackIndex: number = 0
    trackIsPlaying: ITrack | null = null
    sound: Howl | null = null
    isPlaying: boolean = false
    durationNow: number = 0
    volumeNow: number = 0.5
    timer: NodeJS.Timer = setInterval(() => {
    })

    constructor() {
        makeAutoObservable(this)

        clearInterval(this.timer)
    }

    setPlayerTrackList = (playerTrackList: IPlayerTrack[]) => {
        this.playerTrackList = playerTrackList
    }

    setTrackIndex = (trackIndex: number) => {
        this.trackIndex = trackIndex
    }
    setIsPlaying = (isPlaying: boolean) => {
        this.isPlaying = isPlaying
    }
    setTrackIsPlaying = (trackIsPlaying: ITrack | null) => {
        this.trackIsPlaying = trackIsPlaying
    }
    setSound = (sound: Howl | null) => {
        this.sound = sound
    }
    setDurationNow = (durationNow: number) => {
        this.durationNow = durationNow
    }
    setVolumeNow = (volumeNow: number) => {
        this.volumeNow = volumeNow
    }
    setTimer = (timer: NodeJS.Timer) => {
        this.timer = timer
    }

    resume = () => {
        console.log("resume");
        recent.addTrackToRecentTracks(this.trackIsPlaying!!)
        this.setIsPlaying(true)
        this.sound?.play();
        this.volume()
        let loadingTimer = setInterval(() => {
            if (this.sound?.state() === 'loaded') {
                this.setTimer(setInterval(() => {
                    this.setDurationNow(this.durationNow + 1)
                }, 1000))
                clearInterval(loadingTimer)
            }
        }, 250)

    }

    play = (trackList: ITrack[], track: ITrack) => {
        if (this.trackIsPlaying?.id === track.id) {
            this.resume()
            return
        }

        this.setDurationNow(0)
        if (this.isPlaying) this.pause()

        let playersTrackList: IPlayerTrack[] = trackList.map((e, index) => {
            if (e.id.toLowerCase() === track.id.toLowerCase()) this.setTrackIndex(index)
            return {...e, durationNow: 0}
        })
        this.setPlayerTrackList(playersTrackList)

        let src = track.audioUrl
        this.setSound(new Howl({src, html5: true}))

        this.setTrackIsPlaying(track)
        this.resume()
    }
    pause = () => {
        this.setIsPlaying(false)
        this.sound?.pause();
        clearInterval(this.timer)
    }
    prev = () => {
        if (this.trackIndex > 0) this.setTrackIndex(this.trackIndex - 1)

        let track = this.playerTrackList[this.trackIndex]

        this.setDurationNow(0)
        this.pause()

        let src = track.audioUrl
        this.setSound(new Howl({src, html5: true}))

        this.setTrackIsPlaying(track)
        this.resume()
    }
    next = () => {
        if (this.trackIndex < this.playerTrackList.length - 1)
            this.setTrackIndex(this.trackIndex + 1)

        let track = this.playerTrackList[this.trackIndex]

        this.setDurationNow(0)
        this.pause()

        let src = track.audioUrl
        this.setSound(new Howl({src, html5: true}))

        this.setTrackIsPlaying(track)
        this.resume()
    }

    seek = () => {
        this.sound?.seek(this.durationNow)
    }
    volume = () => {
        this.sound?.volume(this.volumeNow)
        localStorage.setItem("volume", JSON.stringify(this.volumeNow))
    }
    getLocalStorage = () => {
        let volume = localStorage.getItem("volume")
        if (volume) this.setVolumeNow(JSON.parse(volume))
    }

}

export default new player()

let log = (e: any) => {
    console.log(mobx.toJS(e))
}
