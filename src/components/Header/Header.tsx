import React from 'react';
import {observer} from "mobx-react-lite";

import Player from "./Player";
import player from "./store/player";
const Header: React.FC = observer(() => {

    return (
        <div className="content-header">
            <div className="player-wrapper">
                {player.trackIsPlaying && <Player/>}
            </div>
        </div>
    );
})

export default Header;
