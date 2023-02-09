import React, {useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {ReactComponent as NextIcon} from "components/Header/assets/next.svg";
import {ReactComponent as PrevIcon} from "components/Header/assets/prev.svg";
import {ReactComponent as PauseIcon} from "components/Header/assets/pause.svg";
import {ReactComponent as PlayIcon} from "components/Header/assets/play.svg";
import {ReactComponent as FavouriteIcon} from "components/Header/assets/favourite.svg";
import {ReactComponent as ArrowDownIcon} from "components/Header/assets/arrow-down-icon.svg";
import {ReactComponent as VolumePlusIcon} from "components/Header/assets/volume-plus-icon.svg";
import {ReactComponent as VolumeMinusIcon} from "components/Header/assets/volume-minus-icon.svg";
import AlbumImage from "../Chart/AlbumImage";
import player from "./store/player";
import {useClickOutside} from "./useClickOutside";
import Track from "../Chart/Track";
import chartTracks, {ITrack} from "../Chart/store/chartTracks";
import favourite from "../Favourite/store/favourite";

let convertSecondsToMinutes = (secondsInput: number) => {
    let minutes = Math.floor(secondsInput / 60)
    let seconds = secondsInput - minutes * 60
    let secondsString = seconds > 9 ? seconds : "0" + seconds
    return `${minutes}:${secondsString}`
}

const Player: React.FC = observer(() => {
    let [isPlaylistVisible, setIsPlaylistVisible] = useState<boolean>(false)
    const refIsPlaylistVisible = useRef<any>(null)
    useClickOutside(refIsPlaylistVisible, () => {
        setIsPlaylistVisible(false)
    })

    return (
        <div className="audio-player"
             style={{
                 borderBottomLeftRadius: isPlaylistVisible ? 0 : '18px',
                 borderBottomRightRadius: isPlaylistVisible ? 0 : '18px'
             }}
        >
            <div className="main-panel">
                <div className="player-top">
                    <div className="player-top-left">
                        <AlbumImage src={player.trackIsPlaying!!.imageUrl.size70}/>
                        <div className="track-and-artist">
                            <div className="track">{player.trackIsPlaying?.name}</div>
                            <div className="artist">{player.trackIsPlaying?.artistName}</div>
                        </div>
                    </div>
                    <div className="player-top-center">
                        <PrevIcon className="icon prev" onClick={() => player.prev()}/>
                        {player.isPlaying
                            ? <PauseIcon className="icon pause" onClick={() => player.pause()}/>
                            : <PlayIcon className="icon play" onClick={() => player.resume()}/>
                        }
                        <NextIcon className="icon next" onClick={() => player.next()}/>
                    </div>
                    <div className="player-top-right">
                        <div className="volume">
                            <VolumeMinusIcon/>
                            <input
                                className="volume-progress"
                                type="range"
                                value={player.volumeNow}
                                step="0.01"
                                min="0"
                                max="1"
                                onChange={(e) => player.setVolumeNow(Number(e.target.value))}
                                onMouseUp={() => player.volume()}
                            />
                            <VolumePlusIcon/>
                        </div>
                        <div className="favourite">
                            {favourite.isFavourite(player.trackIsPlaying!!.id)
                                ? <FavouriteIcon
                                    className='favourite-true'
                                    onClick={() => favourite.removeTrackFromFavouriteTracks(player.trackIsPlaying!!)}
                                />
                                : <FavouriteIcon
                                    className='favourite-false'
                                    onClick={() => favourite.addTrackToFavouriteTracks(player.trackIsPlaying!!)}
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className="player-bottom">
                    <div className="timer">
                        <div className="timer-now">{convertSecondsToMinutes(player.durationNow)}</div>
                        <input
                            className="timer-progress"
                            type="range"
                            value={player.durationNow}
                            step="1"
                            min="0"
                            max={player.trackIsPlaying!!.duration}
                            onChange={(e) => player.setDurationNow(Number(e.target.value))}
                            onMouseUp={() => player.seek()}
                        />
                        <div className="timer-all">{convertSecondsToMinutes(player.trackIsPlaying!!.duration)}</div>
                    </div>

                    <div className="show-playlist">
                        <ArrowDownIcon onClick={() => {
                            setIsPlaylistVisible(true)
                        }}/>
                    </div>
                </div>
            </div>
            {
                isPlaylistVisible &&
                <div className="playlist" ref={refIsPlaylistVisible as any}>
                    {player.playerTrackList.map((track: ITrack) => {
                        return <Track track={track} onPlayClicked={() => player.play(player.playerTrackList, track)}/>
                    })}
                </div>
            }
        </div>
    );
})

export default Player;
