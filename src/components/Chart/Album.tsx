import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {IAlbum} from "./store/chartAlbums";
import AlbumImage from "./AlbumImage";

interface AlbumProps {
    album: IAlbum,
    openAlbum: any
}

const Album = observer(({album, openAlbum}: AlbumProps) => {
    let {id, name, artistName, imageUrl, releaseDate, trackCount} = album

    return (
        <div className="albums-item">
            <AlbumImage src={imageUrl.size170}/>
            <div className="name" onClick={() => openAlbum(album)}>{name}</div>
            <div className="artist">{artistName}</div>
            <div className="date">{releaseDate.substring(0,4)}</div>
        </div>
    );
})

export default Album;
