import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Track from "../Chart/Track";
import player from "../Header/store/player";
import recent from "./store/recent";
import AlbumWithTracks from "../Chart/AlbumWithTracks";
import SearchInput from "../UI/SearchInput";
import chartAlbums from "../Chart/store/chartAlbums";

const Recent: React.FC = observer(() => {
    useEffect(() => {
        recent.getLocalStorage()
        chartAlbums.setOpenedAlbum(null)
        chartAlbums.setOpenedAlbumTrackList(null)
        recent.setSearchValue('')
        recent.setRecentTracksForThisPage(recent.recentTracks)
    }, [])

    let [searchValue, setSearchValue] = useState('')
    let search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            recent.setSearchValue(searchValue)
        }
    }
    return (
        <div className="recent-page">
            <div className="recent-tracks">
                <div className="title">Recent listened tracks</div>
                <SearchInput searchValue={searchValue} onChange={setSearchValue} onKeyDown={search}/>
                <div className="recent-tracklist">
                    {recent.getRecentTracksForThisPage.map(track => {
                        return <Track
                            key={track.id}
                            track={track}
                            onPlayClicked={() => player.play(recent.recentTracks, track)}
                        />
                    })}
                </div>
            </div>

            <div className="album-with-tracks-item-wrapper">
                <AlbumWithTracks/>
            </div>
        </div>
    );
})

export default Recent;
