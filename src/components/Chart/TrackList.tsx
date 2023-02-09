import React, {FC} from "react";
import {observer} from "mobx-react-lite";
import {ITrack} from "./store/chartTracks";
import Track from "./Track";
import player from "../Header/store/player";

const uuid = require('uuid');

interface TrackListProps {
    trackList: ITrack[]
}

const TrackList: FC<TrackListProps> = observer(({trackList}) => {
    return (
        <ul className="track-list">
            {trackList.map((track: ITrack) =>{
                return  <Track
                    track={track}
                    key={uuid.v4()}
                    onPlayClicked={() => player.play(trackList, track)}
                />
            })
            }

        </ul>
    );
})

export default TrackList;
