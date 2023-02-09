import React, {ChangeEvent, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import playlists, {IPlaylist} from "./store/playlists";
import Track from "../Chart/Track";

const Playlists: React.FC = observer(() => {
    const {id} = useParams();

    let playlist: IPlaylist | undefined = playlists.playlists.find(e => {
        return e.id === `playlist_${id}`
    })

    return (
        <div className='playlist-page'>
            {playlist
                ? <div className="playlist-page-content">
                    <div className="title">{playlist.name}</div>
                    {playlist.trackList.map(e => {
                        return <Track key={e.id} track={e} onPlayClicked={() => {
                        }}/>
                    })
                    }
                </div>
                : <div className="error">ERROR</div>
            }
        </div>
    );
})

export default Playlists;
