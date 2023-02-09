import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";

import favourite from "./store/favourite";
import Track from "../Chart/Track";
import player from "../Header/store/player";
import AlbumWithTracks from "../Chart/AlbumWithTracks";
import SearchInput from "../UI/SearchInput";
import chartAlbums from "../Chart/store/chartAlbums";

const Favourite: React.FC = observer(() => {

    useEffect(() => {
        favourite.getLocalStorage()
        chartAlbums.setOpenedAlbum(null)
        chartAlbums.setOpenedAlbumTrackList(null)
        favourite.setSearchValue('')
    }, [])

    let [searchValue, setSearchValue] = useState('')
    let search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            favourite.setSearchValue(searchValue)
        }
    }
    return (
        <div className="favourite-page">
            <div className="favourite-tracks">
                <div className="title">Favourite tracks</div>
                <SearchInput searchValue={searchValue} onChange={setSearchValue} onKeyDown={search}/>
                <div className="favourite-tracklist">
                    {favourite.getFavouriteTracks.map(track => {
                        return <Track
                            key={track.id}
                            track={track}
                            onPlayClicked={() => player.play(favourite.favouriteTracks, track)}
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

export default Favourite;
