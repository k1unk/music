import React, {MouseEventHandler, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import tracks, {ITrack} from "./store/chartTracks";
import {ReactComponent as FavouriteIcon} from "components/Chart/assets/favourite.svg";
import {ReactComponent as MoreIcon} from "components/Chart/assets/more-icon.svg";
import {ReactComponent as AddIcon} from "components/Chart/assets/add-icon.svg";
import {ReactComponent as RemoveIcon} from "components/Chart/assets/remove-icon.svg";
import favourite from "../Favourite/store/favourite";
import AlbumImage from "./AlbumImage";
import {ReactComponent as PlayIcon} from "components/Chart/assets/play.svg";
import {ReactComponent as PauseIcon} from "components/Chart/assets/pause.svg";
import player from "../Header/store/player";
import {useClickOutside} from "../Header/useClickOutside";
import playlists from "../Playlists/store/playlists";
import chartAlbums from "./store/chartAlbums";

let convertSecondsToMinutes = (secondsInput: number) => {
    let minutes = Math.floor(secondsInput / 60)
    let seconds = secondsInput - minutes * 60
    let secondsString = seconds > 9 ? seconds : "0" + seconds
    return `${minutes}:${secondsString}`
}

interface TrackProps {
    track: ITrack,
    onPlayClicked: MouseEventHandler<SVGSVGElement>
}

const Track = observer(({track, onPlayClicked}: TrackProps) => {
    let {id, name, artistId, artistName, albumId, audioUrl, imageUrl, duration} = track

    let [playlistsToAddAreVisible, setPlaylistsToAddAreVisible] = useState<boolean>(false)
    const refPlaylistsToAddAreVisible = useRef<any>(null)
    useClickOutside(refPlaylistsToAddAreVisible, () => {
        setPlaylistsToAddAreVisible(false)
    })

    return (
        <li className="tracks-item">
            <div className="tracks-item-left">
                <div className="play">
                    {player.isPlaying && player.trackIsPlaying?.id.toLowerCase() === track.id.toLowerCase()
                        ? <PauseIcon onClick={() => player.pause()}/>
                        : <PlayIcon onClick={onPlayClicked}/>
                    }
                </div>
                <div onClick={() => chartAlbums.openAlbumById(albumId)}>
                    <AlbumImage src={imageUrl.size70}/>
                </div>
                <div className="name-and-artist">
                    <p className="name">{name}</p>
                    <div className="artist">{artistName}</div>
                </div>
            </div>

            <div className="tracks-item-right">
                <div className="duration">{convertSecondsToMinutes(duration)}</div>
                <div className="favourite">
                    {favourite.isFavourite(track.id)
                        ? <FavouriteIcon
                            className='favourite-true'
                            onClick={() => favourite.removeTrackFromFavouriteTracks(track)}
                        />
                        : <FavouriteIcon
                            className='favourite-false'
                            onClick={() => favourite.addTrackToFavouriteTracks(track)}
                        />
                    }
                </div>
                <div className="add-to-playlist">
                    <MoreIcon onClick={() => setPlaylistsToAddAreVisible(true)}/>
                    {
                        playlistsToAddAreVisible &&
                        <div ref={refPlaylistsToAddAreVisible as any} className="add-to-playlist__list">
                            {
                                playlists.playlists.map(e => {
                                    return <div className="list-wrapper">
                                        <div className="add-to-playlist__item">
                                            <div className="is-added">
                                                {
                                                    e.trackList.find(t => {
                                                        return t.id === track.id
                                                    })
                                                        ? <div
                                                            className='is-added__playlist-name'
                                                            onClick={() => playlists.removeTrack(e.id, track.id)}>
                                                            <RemoveIcon/>
                                                        </div>
                                                        : <div
                                                            className='is-added__playlist-name'
                                                            onClick={() => playlists.addTrack(e.id, track)}>
                                                            <AddIcon/>
                                                        </div>
                                                }
                                            </div>
                                            <div className="name">{e.name}</div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </li>
    );
})

export default Track;
