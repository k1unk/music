import React from "react";
import {observer} from "mobx-react-lite";
import chartAlbums, {IAlbum} from "./store/chartAlbums";
import AlbumImage from "./AlbumImage";
import TrackList from "./TrackList";

const AlbumWithTracks = observer(() => {
    return (
        <div className="album-with-tracks">
            {
                chartAlbums.openedAlbum && chartAlbums.openedAlbumTrackList &&
                <div className="album-with-tracks-item">
                    <div className="header">
                        <AlbumImage src={chartAlbums.openedAlbum.imageUrl.size170}/>
                        <div className="artist-and-name">
                            <div className="name">{chartAlbums.openedAlbum.name}</div>
                            <div className="artist">{chartAlbums.openedAlbum.artistName}</div>
                        </div>
                    </div>
                    <TrackList trackList={chartAlbums.openedAlbumTrackList}/>
                </div>
            }
        </div>
    );
})

export default AlbumWithTracks;
